import { Itinerary, TripFormData } from "../types";

const apiKey = (import.meta as any).env?.VITE_QWEN_API_KEY || "";
const baseUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1";
const endpoint = `${baseUrl}/chat/completions`;

// 流式生成行程的回调类型
export type StreamCallback = (partialItinerary: Partial<Itinerary> | null, isDone: boolean) => void;

export const generateItinerary = async (data: TripFormData, streamCallback?: StreamCallback): Promise<Itinerary> => {
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const prompt = `
    请为一次去${data.destination}的旅行制定详细的行程，时长为${data.duration}天。
    旅客类型: ${data.travelers}。
    预算: ${data.budget}。
    兴趣/偏好: ${data.interests}。
    
    时间限制：
    - 第一天行程开始时间: ${data.startTime || "不限"}
    - 最后一天行程结束时间: ${data.endTime || "不限"}

    重要要求（JSON）：
    1. 使用简体中文回答。
    2. 每一项活动必须提供准确的纬度和经度坐标。
    3. 响应必须是符合所提供结构的有效JSON字符串。
    4. 行程安排要合理，考虑路程时间。
    5. visualTheme 字段必须严格从列表 ['urban','beach','rainforest','desert','lake','grassland','canyon','snow','island','glacier','ancient_town','historic','port','countryside','tropical'] 中选择一个。
    6. JSON顶层包含 tripTitle、summary、days、visualTheme 字段；days 为数组，元素包含 day、theme、activities；activities 的元素包含 time、activityName、description、locationName、coordinates（含 latitude、longitude）。
  `;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen-plus",
        messages: [
          { role: "system", content: "你是旅行规划助手。仅返回有效JSON。" },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
        response_format: { type: "json_object" },
        stream: !!streamCallback, // 只有提供了回调才启用流式
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Request failed");
    }

    // 非流式响应处理
    if (!streamCallback || !res.body) {
      const dataJson = await res.json();
      const content = dataJson?.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error("No response from AI");
      }

      const result = JSON.parse(content);
      return {
        ...result,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      } as Itinerary;
    }

    // 流式响应处理
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let fullContent = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        // 处理SSE格式的流数据
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.trim() === "") continue;
          if (line.startsWith("data: ")) {
            const dataStr = line.slice(6);
            if (dataStr === "[DONE]") {
              break;
            }

            try {
              const dataJson = JSON.parse(dataStr);
              const delta = dataJson?.choices?.[0]?.delta?.content || "";
              fullContent += delta;

              // 尝试解析部分JSON并调用回调
              try {
                const partialResult = JSON.parse(fullContent);
                streamCallback({
                  ...partialResult,
                  id: crypto.randomUUID(),
                  createdAt: Date.now(),
                } as Partial<Itinerary>, false);
              } catch (parseError) {
                // JSON不完整，尝试提取已有的字段
                const partialItinerary: Partial<Itinerary> = {};
                
                // 提取tripTitle
                const tripTitleMatch = fullContent.match(/"tripTitle"\s*:\s*"([^"]*)"/);
                if (tripTitleMatch) {
                  partialItinerary.tripTitle = tripTitleMatch[1];
                }
                
                // 提取summary
                const summaryMatch = fullContent.match(/"summary"\s*:\s*"([^"]*)"/);
                if (summaryMatch) {
                  partialItinerary.summary = summaryMatch[1];
                }
                
                // 提取visualTheme
                const visualThemeMatch = fullContent.match(/"visualTheme"\s*:\s*"([^"]*)"/);
                if (visualThemeMatch) {
                  partialItinerary.visualTheme = visualThemeMatch[1] as any;
                }
                
                // 提取days数组的开始部分
                const daysMatch = fullContent.match(/"days"\s*:\s*\[(.*)/s);
                if (daysMatch) {
                  try {
                    // 尝试解析days数组的部分内容
                    const daysContent = daysMatch[1];
                    let daysArray = [];
                    
                    // 简单的数组解析，只处理到第一个完整的day对象
                    const dayMatch = daysContent.match(/\{[^}]*\}/);
                    if (dayMatch) {
                      const dayObj = JSON.parse(dayMatch[0]);
                      daysArray = [dayObj];
                    }
                    
                    partialItinerary.days = daysArray;
                  } catch (e) {
                    // 忽略days解析错误
                  }
                }
                
                if (Object.keys(partialItinerary).length > 0) {
                  streamCallback({
                    ...partialItinerary,
                    id: crypto.randomUUID(),
                    createdAt: Date.now(),
                  }, false);
                }
              }
            } catch (e) {
              console.error("Error parsing stream chunk:", e);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    // 解析完整的JSON
    const result = JSON.parse(fullContent);
    const finalItinerary = {
      ...result,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    } as Itinerary;

    // 最后一次回调，标记完成
    streamCallback(finalItinerary, true);
    return finalItinerary;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw error;
  }
};
