import axios from "axios";

const API_BASE_URL = "https://ailibi.click/api/v1"; // 실제 백엔드 주소로 변경

// 시나리오 생성 함수
export const createScenario = async (data: unknown) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/scenarios`, data); // 변경된 엔드포인트
      return response.data;
    } catch (error) {
      console.error("시나리오 생성 중 오류 발생:", error);
      throw error;
    }
  };

// 시나리오 조회 함수
export const fetchScenario = async (scenarioId: string): Promise<{ id: string; title: string; description: string }> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/scenarios/${scenarioId}`);
    return response.data;
  } catch (error) {
    console.error("시나리오 조회 중 오류 발생:", error);
    throw error;
  }
};

// 시나리오 업데이트 함수 노트페이지지
export const updateScenario = async (scenarioId: string, data: unknown) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/scenarios/${scenarioId}`, data);
      return response.data;
    } catch (error) {
      console.error("시나리오 업데이트 중 오류 발생:", error);
      throw error;
    }
  };

  // 용의자 정보 가져오기
export const fetchSuspect = async (suspectId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/suspects/${suspectId}`);
    return response.data;
  } catch (error) {
    console.error("용의자 정보를 가져오는 중 오류 발생:", error);
    throw error;
  }
};

// 용의자 심문 생성
export const createChat = async (suspectId: string, message: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chats?suspect_id=${suspectId}`, { message });
    return response.data;
  } catch (error) {
    console.error("심문 생성 중 오류 발생:", error);
    throw error;
  }
};
