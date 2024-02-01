import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import { getUserLesson } from "../../../../../actions/userLesson/userLesson";
import "./Resources.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Resources = ({ lessonId }) => {
  const dispatch = useDispatch();
  // const [pdfHeight, setPdfHeight] = useState(0);
  const lesson = useSelector((state) => state.userLesson.lessons);



  useEffect(() => {
    if (lessonId) {
      dispatch(getUserLesson(lessonId));
    }
  }, [dispatch, lessonId]);
  // console.log("lesson", lesson);

  // const handlePdfLoadSuccess = ({ numPages }) => {
  //   const containerHeight = numPages * 300;
  //   setPdfHeight(containerHeight);
  // };
  return (
    <div className="user-resources-container">
      <div className="user-resources-subcontainer">
        {lesson?.data?.lessonFiles?.map((file, fileIndex) => (
          <div key={fileIndex} style={{ marginBottom: "20px" }}>
            <h2>{`Resource ${fileIndex + 1}`}</h2>
            {file.file_MimeType === "application/pdf" ? (
              <>
                <div 
                style={{
                  //  height: `${pdfHeight}px`,
                 overflow: "auto" }}
                >
                  <p>{file?.file_OriginalName}</p>
                  <Document
                    file={`${file?.file_Path}`}
                    options={{
                      workerSrc: pdfjs.GlobalWorkerOptions.workerSrc,
                    }}
                    // onLoadSuccess={handlePdfLoadSuccess}
                  >
                    <Page pageNumber={1} renderAnnotationLayer={false} renderTextLayer={false}  />
                  </Document>
                </div>
              </>
            ) : (
              <>
                <p>{file?.file_OriginalName}</p>
              </>
            )}
            <a
              href={`${file?.file_Path}`}
              download={file?.file_OriginalName}
            >
              <div style={{ display: "flex" }}>
                <p>Click here to download :</p>&nbsp;
                <p style={{ color: "blue" }}>{`${file?.file_OriginalName}`}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
