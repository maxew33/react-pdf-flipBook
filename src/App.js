import React from "react";

import SinglePagePDFViewer from "./components/pdf/single-page";
import AllPagesPDFViewer from "./components/pdf/all-pages";
import Book from "./components/pdf/book";

/* This is required only if the project file is located 
inside the app. Otherwise you can use the external link of the pdf file*/
import samplePDF from "./sample.pdf";

import "./styles.css";

export default function App() {
  return (
    <div className="App">

      <h4>pdf book</h4>
      <Book pdf={samplePDF} />

      <h4>Single Page</h4>
      <SinglePagePDFViewer pdf={samplePDF} />

      <h4>All Pages</h4>
      <div className="all-page-container">
        <AllPagesPDFViewer pdf={samplePDF} />
      </div>
    </div>
  );
}