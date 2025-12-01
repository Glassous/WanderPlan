import { Itinerary, TripFormData } from "../types";

const apiKey = (import.meta as any).env?.VITE_QWEN_API_KEY || "";
const baseUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1";
const endpoint = `${baseUrl}/chat/completions`;

// 流式生成行程的回调类型
export type StreamCallback = (partialItinerary: Partial<Itinerary> | null, isDone: boolean) => void;

/**
 * 尝试解析不完整的 JSON 字符串
 * 原理：维护一个括号栈，在解析失败时自动补全末尾缺失的 } ] "
 */
function tryParseJSON(jsonStr: string): any {
  if (!jsonStr) return null;
  
  try {
    // 1. 如果已经是完整的 JSON，直接解析
    return JSON.parse(jsonStr);
  } catch (e) {
    // 2. 开始修复逻辑
    let repaired = jsonStr;
    
    let inString = false;
    let escape = false;
    const stack: string[] = [];
    
    // 扫描字符串，记录未闭合的括号
    for (let i = 0; i < repaired.length; i++) {
      const char = repaired[i];
      
      if (escape) {
        escape = false;
        continue;
      }
      
      if (char === '\\') {
        escape = true;
        continue;
      }
      
      if (char === '"') {
        inString = !inString;
        continue;
      }
      
      if (!inString) {
        if (char === '{') {
          stack.push('}');
        } else if (char === '[') {
          stack.push(']');
        } else if (char === '}' || char === ']') {
          // 遇到闭合括号，从栈中移除对应的开启记录
          if (stack.length > 0 && stack[stack.length - 1] === char) {
            stack.pop();
          }
        }
      }
    }
    
    // 3. 补全未闭合的字符串
    if (inString) {
      repaired += '"';
    }
    
    // 4. 去除末尾可能导致错误的逗号 (例如: {"key": "value",)
    repaired = repaired.replace(/,\s*$/, '');
    
    // 5. 处理尾随冒号 (例如: {"key":)，补全 null 以便解析
    if (/:\s*$/.test(repaired)) {
        repaired += 'null';
    }

    // 6. 按照栈的逆序补全所有缺失的括号
    while (stack.length > 0) {
      repaired += stack.pop();
    }
    
    try {
      return JSON.parse(repaired);
    } catch (err) {
      // 如果实在修不好（比如结构太混乱），返回 null 等待下一帧数据
      return null;
    }
  }
}

// 最大重试次数
const MAX_RETRIES = 3;

export const generateItinerary = async (data: TripFormData, streamCallback?: StreamCallback, retryCount: number = 0): Promise<Itinerary> => {
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
      "tripTitle": "",
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
      
      // 确保days数组存在且不为空
      if (!result.days || !Array.isArray(result.days) || result.days.length === 0) {
        // 检查是否需要重试
        if (retryCount < MAX_RETRIES) {
          console.warn(`AI未生成有效的days数组，进行重试 ${retryCount + 1}/${MAX_RETRIES}`);
          // 递归调用，重试生成行程
          return generateItinerary(data, streamCallback, retryCount + 1);
        } else {
          // 如果达到最大重试次数，使用预生成的天数结构
          const duration = parseInt(data.duration.toString()) || 1;
          const fallbackDays = Array.from({ length: duration }, (_, i) => ({
            day: i + 1,
            theme: `第${i+1}天行程`,
            activities: []
          }));
          
          console.warn(`AI未生成有效的days数组，已达到最大重试次数(${MAX_RETRIES})，使用默认结构替代`);
          result.days = fallbackDays;
        }
      }
      
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

              // --- 关键修改：直接使用修复函数解析当前积累的所有内容 ---
              const partialResult = tryParseJSON(fullContent);
              
              if (partialResult) {
                // 如果能解析出数据，就发送给前端
                // 补充一些前端需要的 ID 字段
                const partialItinerary = {
                  ...partialResult,
                  // 只有当 partialResult 中没有这些字段时才使用默认值，防止覆盖
                  id: partialResult.id || crypto.randomUUID(),
                  createdAt: partialResult.createdAt || Date.now(),
                  // 确保 days 始终是数组，防止 null 导致前端渲染报错
                  days: Array.isArray(partialResult.days) ? partialResult.days : []
                };

                // 如果days数组存在但为空，或者days数组中的某些day对象不完整，进行修复
                if (partialItinerary.days.length === 0) {
                  const duration = parseInt(data.duration.toString()) || 1;
                  partialItinerary.days = Array.from({ length: duration }, (_, i) => ({
                    day: i + 1,
                    theme: `第${i+1}天行程`,
                    activities: []
                  }));
                } else {
                  // 确保每个day对象都有必要的字段
                  partialItinerary.days = partialItinerary.days.map((day: any, index: number) => {
                    if (!day || typeof day !== 'object') {
                      return {
                        day: index + 1,
                        theme: `第${index + 1}天行程`,
                        activities: []
                      };
                    }
                    
                    return {
                      day: day.day !== undefined ? day.day : index + 1,
                      theme: day.theme || `第${index + 1}天行程`,
                      activities: Array.isArray(day.activities) ? day.activities : []
                    };
                  });
                }

                streamCallback(partialItinerary as Partial<Itinerary>, false);
              }
              // -----------------------------------------------------

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
    const result = tryParseJSON(fullContent) || JSON.parse(fullContent);
    
    // 确保days数组存在且不为空
    if (!result.days || !Array.isArray(result.days) || result.days.length === 0) {
      // 检查是否需要重试
      if (retryCount < MAX_RETRIES) {
        console.warn(`AI未生成有效的days数组，进行重试 ${retryCount + 1}/${MAX_RETRIES}`);
        // 递归调用，重试生成行程
        return generateItinerary(data, streamCallback, retryCount + 1);
      } else {
        // 如果达到最大重试次数，使用预生成的天数结构
        const duration = parseInt(data.duration.toString()) || 1;
        const fallbackDays = Array.from({ length: duration }, (_, i) => ({
          day: i + 1,
          theme: `第${i+1}天行程`,
          activities: []
        }));
        
        console.warn(`AI未生成有效的days数组，已达到最大重试次数(${MAX_RETRIES})，使用默认结构替代`);
        result.days = fallbackDays;
      }
    }
    
    // 确保每个day对象都有必要的字段
    const validDays = result.days.map((day: any, index: number) => {
      if (!day || typeof day !== 'object') {
        return {
          day: index + 1,
          theme: `第${index + 1}天行程`,
          activities: []
        };
      }
      
      return {
        day: day.day !== undefined ? day.day : index + 1,
        theme: day.theme || `第${index + 1}天行程`,
        activities: Array.isArray(day.activities) ? day.activities : []
      };
    });
    
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