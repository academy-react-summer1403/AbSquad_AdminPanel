// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import { read, utils } from "xlsx";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { DownloadCloud } from "react-feather";

// ** Custom Components
import ExtensionsHeader from "@components/extensions-header";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  Table,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/file-uploader/file-uploader.scss";
import { changeLanguage } from "i18next";

const Import = ({ onChange, initialInfo }) => {
  // ** States
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [Imgopen, setImgOpen] = useState("close");
  const [fileUrl, setFileUrl] = useState("");
  const [imgObj, setImgObj] = useState({});
  const getTableData = (arr, name) => {
    setTableData(arr);
    setName(name);
  };
  useEffect(() => {
    if (initialInfo) {
      setFileUrl(initialInfo.imageAddress);
      setImgOpen("open");
    }
  }, [initialInfo]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,

    onDrop: (result) => {
      const checkType =
        result[0].name.endsWith("png") || result[0].name.endsWith("jpg");

      if (result.length && checkType) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(result[0]);
        setImgObj(result[0]);
        fileReader.onload = () => {
          setFileUrl(fileReader.result);
          setImgOpen("open");
        };
      } else {
        toast.error("!!!");
      }
    },
  });

  /*eslint-disable */
  const headArr = tableData.length
    ? tableData.map((col, index) => {
        if (index === 0) return [...Object.keys(col)];
        else return null;
      })
    : [];
  /*eslint-enable */
  const dataArr = value.length
    ? filteredData
    : tableData.length && !value.length
    ? tableData
    : null;

  const renderTableHead = () => {
    if (headArr.length) {
      return headArr[0].map((head, index) => {
        return <th key={index}>{head}</th>;
      });
    } else {
      return null;
    }
  };
  // For Passing The Image Url For Hook Form
  useEffect(() => {
    if (!!imgObj) {
      onChange(imgObj);
    }
  }, [imgObj]);

  return (
    <Fragment>
      <Row className="import-component">
        <Col sm="12">
          <Card>
            <CardBody>
              <Row>
                <Col sm="12">
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input
                      onChange={() => {
                        onChange(imgObj);
                      }}
                      {...getInputProps()}
                    />
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      {Imgopen == "close" && <DownloadCloud size={64} />}
                      {Imgopen == "open" && (
                        <img
                          src={fileUrl ? fileUrl : "/ErrImg.jpg"}
                          className="w-25"
                        />
                      )}
                      <h5 className="display-6">
                        کلیک کنید یا عکس را اینجا بکشید
                      </h5>
                      <p className="text-secondary ">
                        عکس را اینجا بکشید یا{" "}
                        <a href="/" onClick={(e) => e.preventDefault()}>
                          روی این صفحه{" "}
                        </a>
                        کلیک کنید
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Import;
