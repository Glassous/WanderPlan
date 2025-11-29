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

    【强制要求】请严格按照以下格式和顺序生成JSON内容，确保流式输出效果：
    1. 必须使用简体中文回答。
    2. 必须逐段生成JSON内容，确保流式输出效果。
    3. 必须先生成基本信息（tripTitle、summary、visualTheme），再生成days数组，最后生成activities。
    4. 必须确保每次输出的JSON片段都能被部分解析。
    5. 每一项活动必须提供准确的纬度和经度坐标。
    6. 响应必须是符合所提供结构的有效JSON字符串。
    7. 行程安排要合理，考虑路程时间。
    8. visualTheme 字段必须严格从列表 ['urban','beach','rainforest','desert','lake','grassland','canyon','snow','island','glacier','ancient_town','historic','port','countryside','tropical'] 中选择一个。
    9. 必须生成${data.duration}天的行程，不多不少。
    10. 必须确保JSON格式完全正确，没有语法错误。

    【JSON结构示例】：
    {
      "tripTitle": "前往${data.destination}的${data.duration}天行程",
      "summary": "这是一次精彩的${data.duration}天行程...",
      "visualTheme": "urban",
      "days": [
        {
          "day": 1,
          "theme": "城市探索",
          "activities": [
            {
              "time": "09:00",
              "activityName": "参观景点",
              "description": "详细描述...",
              "locationName": "景点名称",
              "coordinates": {
                "latitude": 39.9042,
                "longitude": 116.4074
              }
            }
          ]
        }
      ]
    }

    【输出要求】：
    - 必须严格按照上述示例格式输出。
    - 必须确保days数组包含${data.duration}个元素。
    - 必须确保每个day对象都有day、theme和activities字段。
    - 必须确保每个activity对象都有time、activityName、description、locationName和coordinates字段。
    - 必须确保coordinates对象包含latitude和longitude字段。
    - 必须确保visualTheme字段从指定列表中选择。
    - 必须确保JSON格式完全正确，没有语法错误。
    - 必须逐段生成内容，确保流式输出效果。
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
                
                // 提取tripTitle - 支持包含转义字符的字符串
                const tripTitleMatch = fullContent.match(/"tripTitle"\s*:\s*"((?:[^"\\]|\\.)*)"/);
                if (tripTitleMatch) {
                  partialItinerary.tripTitle = tripTitleMatch[1].replace(/\\"/g, '"');
                }
                
                // 提取summary - 支持包含转义字符的字符串
                const summaryMatch = fullContent.match(/"summary"\s*:\s*"((?:[^"\\]|\\.)*)"/);
                if (summaryMatch) {
                  partialItinerary.summary = summaryMatch[1].replace(/\\"/g, '"');
                }
                
                // 提取visualTheme - 支持包含转义字符的字符串
                const visualThemeMatch = fullContent.match(/"visualTheme"\s*:\s*"((?:[^"\\]|\\.)*)"/);
                if (visualThemeMatch) {
                  partialItinerary.visualTheme = visualThemeMatch[1] as any;
                }
                
                // 提取days数组的内容
                const daysMatch = fullContent.match(/"days"\s*:\s*\[([\s\S]*?)(?=\]|$)/);
                if (daysMatch) {
                  try {
                    const daysContent = daysMatch[1];
                    let daysArray = [];
                    
                    // 匹配所有完整的day对象，支持更复杂的结构
                    const dayRegex = /\{\s*"day"\s*:\s*\d+\s*(?:,\s*"theme"\s*:\s*"[^"]*")?\s*(?:,\s*"activities"\s*:\s*\[.*?\])?\s*\}(?=\s*,|\s*$|\s*\])/g;
                    let dayMatch;
                    
                    while ((dayMatch = dayRegex.exec(daysContent)) !== null) {
                      try {
                        const dayObj = JSON.parse(dayMatch[0]);
                        // 确保day对象有必要的字段
                        if (dayObj.day && dayObj.activities) {
                          daysArray.push(dayObj);
                        } else if (dayObj.day) {
                          // 确保activities数组存在
                          daysArray.push({
                            ...dayObj,
                            activities: []
                          });
                        }
                      } catch (e) {
                        // 忽略无法解析的day对象
                      }
                    }
                    
                    if (daysArray.length > 0) {
                      partialItinerary.days = daysArray;
                    }
                  } catch (e) {
                    // 忽略days解析错误
                  }
                }
                
                // 确保至少返回一些有用的数据
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
    
    // 确保days数组存在且不为空
    if (!result.days || !Array.isArray(result.days) || result.days.length === 0) {
      throw new Error("Invalid itinerary: days array is missing or empty");
    }
    
    // 确保每个day对象都有必要的字段
    const validDays = result.days.filter(day => 
      day && typeof day === 'object' && 
      day.day !== undefined && 
      day.activities && Array.isArray(day.activities)
    );
    
    if (validDays.length === 0) {
      throw new Error("Invalid itinerary: no valid days found");
    }
    
    const finalItinerary = {
      ...result,
      days: validDays,
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
