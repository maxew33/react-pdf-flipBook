import React, { useState } from "react";
import { Document, Page } from "react-pdf";


export default function AllPages(props) {
  const [pages, setPages] = useState(null);

  function onDocumentLoadSuccess(e) {
      console.log(e.numPages)
    setPages(e.numPages);
  }

  const { pdf } = props;

  return (
    <Document
      file={pdf}
      options={{ workerSrc: "/pdf.worker.js" }}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {Array.from(new Array(pages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
}