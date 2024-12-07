import axios from "axios";

// Replace 'your_huggingface_api_key' with your actual Hugging Face API key
const API_KEY = "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";

// Function to generate text using Hugging Face GPT-2 model
const generateText = async (inputText) => {
  const API_URL = "https://api-inference.huggingface.co/models/gpt2";

  try {
    const response = await axios.post(
      API_URL,
      {
        inputs: inputText,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Return the generated text
    return response.data[0].generated_text;
  } catch (error) {
    console.error("Error generating text:", error);
    return "Error generating text. Please try again.";
  }
};

export default generateText;
