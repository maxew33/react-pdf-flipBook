import React, { useState } from "react"
import { Document, Page } from "react-pdf"
import HTMLFlipBook from 'react-pageflip'
import { v4 as uuidv4 } from "uuid";

export default function Book(props) {
    const [numPages, setNumPages] = useState(null);
    const pagesId =[]

    function onDocumentLoadSuccess(e) {
        setNumPages(e.numPages)
        for(let i = 0; i< e.numPages; i++){
            pagesId.push(uuidv4())
        }
    }

    const { pdf } = props;

    const handleFlip = (e) => {console.log(e.data)}

    return (
        <Document
            file={pdf}
            options={{ workerSrc: "/pdf.worker.js" }}
            onLoadSuccess={onDocumentLoadSuccess}
        >
            <div className="flipbook-container">
            <HTMLFlipBook 
            width={420} 
            height={594}
            showCover={true}
            onFlip={(e) => handleFlip(e)}>
                {Array.from(new Array(numPages), (el, index) => (
                    <div key={pagesId[index]} >
                        <Page pageNumber={index + 1} width={420} />
                    </div>
                ))}

            </HTMLFlipBook>
            </div>
        </Document>
    )
}
