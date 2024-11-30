import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import InputGroupMerged from "./InputGroupMerged";
import ImageUpload from "./ImageUpload";

const AddNewNews = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: null,
    shortDescription: "",
    keywords: "",
    googleDescription: "",
    googleTitle: "",
    blogDescription: "",
    TumbImageAddress: null, // To store the uploaded image (Base64 or file object)
  });

  // Update shared form data
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit form data to the API
  const handleSubmit = async () => {
    try {
      // Pre-validation: Ensure required fields are not empty
      if (
        !formData.title ||
        !formData.googleTitle ||
        !formData.googleDescription ||
        !formData.shortDescription ||
        !formData.blogDescription ||
        !formData.keywords ||
        !formData.TumbImageAddress ||
        !formData.category?.value
      ) {
        console.error("All required fields must be filled.");
        alert("Please fill in all required fields before submitting.");
        return;
      }

      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("Title", formData.title);
      formDataToSend.append("GoogleTitle", formData.googleTitle);
      formDataToSend.append("GoogleDescribe", formData.googleDescription);
      formDataToSend.append("MiniDescribe", formData.shortDescription);
      formDataToSend.append("Describe", formData.blogDescription);
      formDataToSend.append("Keyword", formData.keywords);
      formDataToSend.append("IsSlider", formData.isSlider || false); // Boolean
      formDataToSend.append("NewsCategoryId", formData.category?.value); // Integer
      if (formData.TumbImageAddress instanceof File) {
        formDataToSend.append("Image", formData.TumbImageAddress); // File
      } else if (typeof formData.TumbImageAddress === "string") {
        formDataToSend.append("Image", formData.TumbImageAddress); // Base64
      }

      // Log FormData for debugging
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`);
      }

      // Retrieve token from localStorage
      const token = localStorage.getItem("token");

      // Send the request
      const response = await fetch(
        "https://classapi.sepehracademy.ir/api/News/CreateNews",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
          },
          body: formDataToSend, // FormData
        }
      );
      //axios use................................................................................
      // Handle response
      if (response.ok) {
        const responseData = await response.json();
        console.log("Form submitted successfully:", responseData);
        alert("News successfully added!");
      } else {
        const errorData = await response.json();
        console.error("Submission failed:", errorData);
        alert("Submission failed: " + JSON.stringify(errorData.ErrorMessage));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Row>
        <Col className="d-flex align-items-center p-0">
          <div>اضافه کردن دوره</div>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <InputGroupMerged
            formData={formData} // Pass shared state
            handleInputChange={handleInputChange} // Handle updates
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <ImageUpload
            stepper={{
              next: () => console.log("Proceeding to next step..."), // Dummy stepper function
            }}
            setFinalData={(updatedData) => {
              setFormData((prev) => ({
                ...prev,
                ...updatedData,
              }));
            }}
            formData={formData} // Pass shared state
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" className="d-flex justify-content-end mt-3">
          <Button color="primary" onClick={handleSubmit}>
            ثبت
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default AddNewNews;
