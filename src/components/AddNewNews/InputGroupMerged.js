import React from "react";
import { InputGroup, Input, InputGroupText } from "reactstrap";
import Select from "react-select";
import { useState, useEffect } from "react";
import { AllNewsGroup } from "../../@core/services/API/AllNewsGroup/AllNewsGroup";
const InputGroupMerged = ({ formData, handleInputChange }) => {
  const [options, setOptions] = useState([]);

  const fetchOptions = async () => {
    try {
      const response = await AllNewsGroup();

      const formattedOptions = response.map((item) => ({
        value: item.id,
        label: item.categoryName,
      }));

      setOptions(formattedOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <React.Fragment>
      <InputGroup className="input-group-merge mb-2">
        <Input
          placeholder="عنوان را وارد کنید"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </InputGroup>

      <Select
        className="mb-2"
        options={options} // Replace with dynamic options if applicable
        value={formData.category}
        onChange={(selectedOption) =>
          handleInputChange("category", selectedOption)
        }
        isClearable={false}
        placeholder="دسته‌بندی را انتخاب کنید"
      />

      <InputGroup className="input-group-merge mb-2">
        <InputGroupText>توضیح کوتاه</InputGroupText>
        <Input
          placeholder=""
          value={formData.shortDescription}
          onChange={(e) =>
            handleInputChange("shortDescription", e.target.value)
          }
        />
      </InputGroup>
      <InputGroup className="input-group-merge mb-2">
        <Input
          placeholder="کلمات کلیدی "
          value={formData.keywords}
          onChange={(e) => handleInputChange("keywords", e.target.value)}
        />
      </InputGroup>
      <InputGroup className="input-group-merge mb-2">
        <InputGroupText>Description Google</InputGroupText>
        <Input
          value={formData.googleDescription}
          onChange={(e) =>
            handleInputChange("googleDescription", e.target.value)
          }
        />
      </InputGroup>
      <InputGroup className="input-group-merge mb-2">
        <InputGroupText>در اینجا Title Google</InputGroupText>
        <Input
          placeholder="وارد کنید"
          value={formData.googleTitle}
          onChange={(e) => handleInputChange("googleTitle", e.target.value)}
        />
      </InputGroup>
      <InputGroup className="input-group-merge">
        <InputGroupText>
          در اینجا توضیحات بلاگ خود را وارد میکنید
        </InputGroupText>
        <Input
          type="textarea"
          value={formData.blogDescription}
          onChange={(e) => handleInputChange("blogDescription", e.target.value)}
        />
      </InputGroup>
    </React.Fragment>
  );
};

export default InputGroupMerged;
