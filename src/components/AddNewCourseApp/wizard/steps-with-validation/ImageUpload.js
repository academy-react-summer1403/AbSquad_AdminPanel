// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Reactstrap Imports
import {
  Form,
  Label,
  Input,
  Row,
  Col,
  Button,
  FormFeedback,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import Import from "./Import";
import { GenerateImage } from "../../../../@core/services/API/ImageGenerator/image.generate.api";
import translateText from "../../../../@core/services/API/Translation/translation.api";

const AccountDetails = ({ stepper, setFinalData }) => {
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      setFinalData({
        ...data,
        ImageAddress: data.TumbImageAddress,
        Image: data.TumbImageAddress,
      });
      stepper.next();
    }
  };

  // Text To Image
  const [imageText, setImageText] = useState("");
  const [aiImgURL, setAiImgURL] = useState("");
  const [aiOpen, setAiOpen] = useState("close");
  const [translatedText, setTranslatedText] = useState("");

  const handleTextToImage = async (text) => {
    const res = await GenerateImage(text);
    setAiImgURL(res);
  };
  const handleTranslateText = async (text) => {
    const res = await translateText(text);
    console.log("in translate e:", res);
    setTranslatedText(res);
  };
  useEffect(() => {
    if (translatedText) handleTextToImage(translatedText);
  }, [translatedText]);

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {aiOpen == "close" && (
          <Button
            onClick={() => {
              setAiOpen("open");
            }}
          >
            استفاده از AI برای ساخت عکس
          </Button>
        )}
        {aiOpen == "open" && (
          <Row>
            <Label>
              <h5>عکس مورد نظر را بسازید:</h5>
            </Label>
            <Col xs={4} className="d-flex flex-row">
              <Input
                onChange={(e) => {
                  setImageText(e.target.value);
                }}
                placeholder="دوره 1"
              />
              <Button
                onClick={() => {
                  handleTranslateText(imageText);
                }}
              >
                ساخت عکس
              </Button>
            </Col>
          </Row>
        )}
        <Row>
          <Col className="mb-1">
            <Controller
              id="username"
              name="TumbImageAddress"
              control={control}
              render={({ field: { onChange } }) => (
                <Import onChange={onChange} aiImgURL={aiImgURL} />
              )}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">بعدی</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default AccountDetails;
