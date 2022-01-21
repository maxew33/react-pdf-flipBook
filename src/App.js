import React from "react";

import SinglePagePDFViewer from "./components/pdf/single-page";
import AllPagesPDFViewer from "./components/pdf/all-pages";
import Book from "./components/pdf/book";

import useWindowSize from "./components/use-window-size";

/* This is required only if the project file is located 
inside the app. Otherwise you can use the external link of the pdf file*/
import samplePDF from "./CondoLiving.pdf";

import "./style.css";

export default function App() {

  const size = useWindowSize()

  let orientation = ''

  size.width > size.height ? orientation = 'paysage' : orientation = 'portrait'

  return (
    <div className="App">

{
orientation === 'paysage' ? 
      <Book pdf={samplePDF} size={size}/>
:
      <SinglePagePDFViewer pdf={samplePDF} size={size} />
  }

      {/*
      <div className="all-page-container">
        <AllPagesPDFViewer pdf={samplePDF} />
      </div> */}
      
    </div>
  );
}

/* add to package.json before build : 
  "homepage": "https://www.maxime-malfilatre.com/sandbox/alexPdfBook" */