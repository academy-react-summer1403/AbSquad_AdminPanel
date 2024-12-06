import axios from "axios";

const API_URL =
  "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2";
const API_KEY = "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"; // Replace with your actual Hugging Face API key

export const GenerateImage = async (prompt) => {
  try {
    const response = await axios.post(
      API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer", // Ensure the response comes as raw binary data
      }
    );

    // Convert ArrayBuffer response to Base64
    const base64Image = btoa(
      String.fromCharCode(...new Uint8Array(response.data))
    );

    // Return the Base64-encoded image as a Data URI
    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.error("Error during image generation:", error.message);
    throw new Error("Failed to generate image, please try again.");
  }
};
