import React from "react";
import { InputGroup, Input, InputGroupText, Label } from "reactstrap";
import Select from "react-select";
import { useState, useEffect } from "react";

const InputGroupMerged = ({ formData, handleInputChange }) => {
  return (
    <React.Fragment>
      <InputGroup className="input-group-merge mb-2">
        <InputGroupText>عنوان را وارد کنید</InputGroupText>
        <Input
          placeholder="اینجا وارد کنید"
          value={formData.Title}
          onChange={(e) => handleInputChange("Title", e.target.value)}
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
    </React.Fragment>
  );
};

export default InputGroupMerged;
