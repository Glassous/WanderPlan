
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Itinerary, TripFormData } from "../types";

const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

const itinerarySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    tripTitle: { type: Type.STRING, description: "旅行的标题" },
    summary: { type: Type.STRING, description: "整个旅行体验的简短摘要" },
    visualTheme: {
      type: Type.STRING,
      description: "Select the most appropriate visual theme for this destination from: ['urban', 'beach', 'rainforest', 'desert', 'lake', 'grassland', 'canyon', 'snow', 'island', 'glacier', 'ancient_town', 'historic', 'port', 'countryside', 'tropical']",
      enum: ['urban', 'beach', 'rainforest', 'desert', 'lake', 'grassland', 'canyon', 'snow', 'island', 'glacier', 'ancient_town', 'historic', 'port', 'countryside', 'tropical']
    },
    days: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER },
          theme: { type: Type.STRING, description: "当天的各种主题 (例如: 历史之旅, 海滩放松)" },
          activities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING, description: "大概时间 (例如: 09:00 AM)" },
                activityName: { type: Type.STRING },
                description: { type: Type.STRING, description: "具体做什么的详细信息" },
                locationName: { type: Type.STRING },
                coordinates: {
                  type: Type.OBJECT,
                  properties: {
                    latitude: { type: Type.NUMBER, description: "纬度 (十进制)" },
                    longitude: { type: Type.NUMBER, description: "经度 (十进制)" },
                  },
                  required: ["latitude", "longitude"],
                },
              },
              required: ["time", "activityName", "description", "locationName", "coordinates"],
            },
          },
        },
        required: ["day", "theme", "activities"],
      },
    },
  },
  required: ["tripTitle", "summary", "days", "visualTheme"],
};

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

    重要要求：
    1. 请使用简体中文回答。
    2. 对于每一项活动，必须提供准确的纬度和经度坐标，以便我在地图上标出。
    3. 响应必须是符合所提供Schema的有效JSON格式。
    4. 行程安排要合理，考虑路程时间。
    5. visualTheme 字段必须严格从指定列表中选择一个最符合目的地氛围的主题。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: itinerarySchema,
        temperature: 0.4, 
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(text);
    // Add ID and timestamp locally
    return {
      ...result,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    } as Itinerary;

  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw error;
  }
};
