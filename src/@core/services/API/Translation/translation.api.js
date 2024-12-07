import axios from "axios";

// Define the translation function
const translateText = async (text) => {
  // The API endpoint
  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text
  )}&langpair=fa|en`;

  try {
    // Send a GET request to MyMemory API
    const response = await axios.get(apiUrl);
    console.log(response.data.responseData.translatedText);

    // Return the translated text from the response
    return response.data.responseData.translatedText;
  } catch (error) {
    // Handle errors (API issues, no internet, etc.)
    throw new Error("Failed to fetch translation");
  }
};

export default translateText;
