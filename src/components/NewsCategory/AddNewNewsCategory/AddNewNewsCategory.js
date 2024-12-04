import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import InputGroupMerged from "./InputGroupMerged";
import ImageUpload from "./ImageUpload";
import { AddNewNewsCategoryAPI } from "../../../@core/services/API/AllNewsGroup/AddNewNewsCategory/AddNewNewsCategoryAPI";
const AddNewNewsCategory = () => {
  const [formData, setFormData] = useState({
    Title: "",
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
      const formDataToSend = new FormData();
      formDataToSend.append("CategoryName", formData.Title);
      formDataToSend.append("GoogleTitle", formData.googleTitle);
      formDataToSend.append("GoogleDescribe", formData.googleDescription);
      if (formData.TumbImageAddress instanceof File) {
        formDataToSend.append("Image", formData.TumbImageAddress); // File
      } else if (typeof formData.TumbImageAddress === "string") {
        formDataToSend.append("Image", formData.TumbImageAddress); // Base64 string
      }
      const res = await AddNewNewsCategoryAPI(formDataToSend);
      // Log FormData entries
      console.log("FormData content:");
      for (let [key, value] of formDataToSend.entries()) {
        if (value instanceof File) {
          console.log(`${key}: File -`, value.name, value.size, value.type);
        } else if (typeof value === "string" && value.length > 50) {
          console.log(`${key}:`, value.substring(0, 50) + "...");
        } else {
          console.log(`${key}:`, value);
        }
      }
      const token = localStorage.getItem("token");

      // const res = await CreateNewNews(formDataToSend);
      console.log(res);

      if (res.ok) {
        const responseData = await res.json();
        console.log("Form submitted successfully:", responseData);
        alert("News successfully added!");
      } else {
        const errorData = await res.json();
        console.error("Submission failed:", errorData);
        // alert("Submission failed: " + JSON.stringify(errorData.ErrorMessage));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Row>
        <Col className="d-flex align-items-center p-0 mb-2">
          <h3>ایجاد دسته بندی جدید </h3>
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
              next: () => console.log("Proceeding to next step..."),
            }}
            setFinalData={(updatedData) => {
              setFormData((prev) => ({
                ...prev,
                ...updatedData,
              }));
            }}
            formData={formData}
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

export default AddNewNewsCategory;
