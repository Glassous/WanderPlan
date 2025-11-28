import { Itinerary, TripFormData } from "../types";

const apiKey = (import.meta as any).env?.VITE_QWEN_API_KEY || "";
const baseUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1";
const endpoint = `${baseUrl}/chat/completions`;

export const generateItinerary = async (data: TripFormData): Promise<Itinerary> => {
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
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Request failed");
    }

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
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw error;
  }
};
