import React from "react";
import { Document, Page, pdfjs} from "react-pdf";
import {useEffect,useState} from 'react'

export default function DisplayImage(props) {
    const [pdfData, setPdfData] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
     const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  
    // useEffect(() => {
    //   // Convert the base64 string to a Uint8Array
    //   const rawData = atob(localStorage.getItem('image'));
    //   const uint8Array = new Uint8Array(rawData.length);
    //   for (let i = 0; i < rawData.length; i++) {
    //     uint8Array[i] = rawData.charCodeAt(i);
    //   }
  
    //   setPdfData(uint8Array);
    // }, []);
return (
    <>
    <a href={localStorage.getItem('image')} download={"page.pdf"}>ss</a>
     <Document file={localStorage.getItem('image')}>
              <Page
                renderTextLayer={false}
                renderAnnotationLayer={false}
                customTextRenderer={false}
                pageNumber={1}
              />{" "}
            </Document>
            <p>
            Page {pageNumber} of {numPages}
          </p>
          <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
            Previous
          </button>
          <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages}>
            Next
          </button>
    </>
)
}