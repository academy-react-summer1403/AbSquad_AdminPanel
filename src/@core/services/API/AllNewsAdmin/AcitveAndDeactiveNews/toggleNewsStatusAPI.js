import http from "../../../Interceptor";

export const toggleNewsStatusAPI = async (id, isActive) => {
  try {
    const data = new FormData();
    data.append("Active", !isActive); // Toggle the active status
    data.append("Id", id); // News ID

    const response = await http.put("/News/ActiveDeactiveNews", data);
    return response.data; // Return response data for further use
  } catch (error) {
    console.error("Error toggling news status:", error);
    throw error; // Rethrow error for error handling in the UI
  }
};
