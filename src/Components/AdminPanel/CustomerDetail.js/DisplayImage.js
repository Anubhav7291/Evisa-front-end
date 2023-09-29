import React from "react";
import { Document, Page, pdfjs, Thumbnail} from "react-pdf";

export default function DisplayImage(props) {
return (
    <>
     <Document file={localStorage.getItem("image")}>
              <Page
                renderTextLayer={false}
                renderAnnotationLayer={false}
                customTextRenderer={false}
                pageNumber={1}
              />{" "}
            </Document>
    </>
)
}