import axios from "axios";

const transcribeAudio = async (audioFile) => {
  const formData = new FormData();
  formData.append("file", audioFile); // Append the audio file to the form data

  try {
    const response = await axios.post(
      "https://api.deepgram.com/v1/listen",
      formData,
      {
        headers: {
          Authorization: `Token da5507fc67562042e4447c1397ce7658bea72b58`, // Replace with your Deepgram API key
          "Content-Type": "multipart/form-data", // Set the content type for audio file
        },
      }
    );

    // Parse and return the transcribed text
    return response.data.results.channel.alternatives[0].transcript;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return "Error transcribing audio. Please try again.";
  }
};

export default transcribeAudio;
