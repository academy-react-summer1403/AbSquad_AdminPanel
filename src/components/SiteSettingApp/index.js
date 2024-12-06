import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  ButtonToggle,
  CardHeader,
} from "reactstrap";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import AddColorPallete from "../../@core/services/API/SiteSetting/add.color.pallete.api";

const SiteSettingApp = () => {
  const [color, setColor] = useColor("#561ecb");
  const [selectedColors, setSelectedColors] = useState([]);
  const [deletedColors, setDeletedColors] = useState([]);

  useEffect(() => {
    if (deletedColors) console.log("Deleted Colors:", deletedColors);
  }, [deletedColors]);

  const handleDeleteColor = (colorToDelete) => {
    // Remove the clicked color from selectedColors
    setSelectedColors((prevColors) =>
      prevColors.filter((colorItem) => colorItem !== colorToDelete)
    );

    // Add the deleted color to the stack
    setDeletedColors((prevDeleted) => [...prevDeleted, colorToDelete]);
  };

  const handleUndo = () => {
    // Get the last deleted color
    const lastDeletedColor = deletedColors[deletedColors.length - 1];

    if (lastDeletedColor) {
      // Remove it from the deletedColors stack
      setDeletedColors((prevDeleted) => prevDeleted.slice(0, -1));

      // Re-add it to the selectedColors list
      setSelectedColors((prevColors) => [...prevColors, lastDeletedColor]);
    }
  };
  const handleAddColorPallete = async (color) => {
    await AddColorPallete(color);
  };
  return (
    <>
      <Row>
        <Col xs={6}>
          <ColorPicker color={color} onChange={(e) => setColor(e)} />
          <Button
            onClick={() => {
              setSelectedColors([...selectedColors, color.hex]);
            }}
            color="success"
          >
            اضافه کردن رنگ
          </Button>{" "}
          <Button
            onClick={() => {
              handleAddColorPallete(selectedColors);
              //   setSelectedColors([]);
            }}
            color="success"
          >
            ثبت رنگ ها
          </Button>
        </Col>
        <Col xs={6}>
          <Card>
            <CardHeader>
              {deletedColors.length > 0 && (
                <Button
                  color="info"
                  onClick={handleUndo}
                  style={{
                    backgroundColor: "#17a2b8",
                    color: "#fff",
                    borderRadius: "20px",
                    padding: "5px 15px",
                    fontSize: "14px",
                  }}
                >
                  Undo
                </Button>
              )}
            </CardHeader>
            <CardBody>
              {selectedColors &&
                selectedColors.map((it, index) => (
                  <div
                    key={index}
                    className="d-flex flex-row align-items-center mb-2"
                    style={{
                      height: "40px",
                      width: "100%",
                      padding: "5px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: it,
                        borderRadius: "10px",
                        height: "100%",
                        width: "80%",
                      }}
                    ></div>
                    <ButtonToggle
                      color="danger"
                      onClick={() => handleDeleteColor(it)}
                      style={{
                        marginLeft: "10px",
                        border: "none",
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      حذف رنگ
                    </ButtonToggle>
                  </div>
                ))}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SiteSettingApp;
