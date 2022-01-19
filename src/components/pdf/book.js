import React, { useState, useRef, useEffect, useCallback } from "react"
import { Document, Page } from "react-pdf"
import HTMLFlipBook from 'react-pageflip'
import useSound from "use-sound"
import { v4 as uuidv4 } from "uuid"

import pageFlip from "../../page-flip.mp3"

export default function Book(props) {
    const [numPages, setNumPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(0)

    const [play] = useSound(pageFlip)

    const pagesId = []
    const ref = useRef()

    const pdf = props.pdf
    const size = props.size

    let pageWidth = size.width*.4  
    
    let pageHeight = pageWidth *(29.7/21)


    const style = {
        width: 2*pageWidth + 'px',
        height: pageWidth *(29.7/21) + 'px'
    }

    function onDocumentLoadSuccess(e) {

        //when the pdf is loaded, I set the pages and create a unique id for the loop
        setNumPages(e.numPages)
        for (let i = 0; i < e.numPages; i++) {
            pagesId.push(uuidv4())
        }
    }

    const handleFlip = (e) => {
        setCurrentPage(e.data)
        play()
    }

    function nextButtonClick() {
        ref.current.pageFlip().flipNext()
    }

    const prevButtonClick = () => {
        ref.current.pageFlip().flipPrev()
    }

    return (
        <>
            <Document
                file={pdf}
                options={{ workerSrc: "/pdf.worker.js" }}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <div className="flipbook-container"
                style={style}>
                    <HTMLFlipBook
                        className="flipbook"
                        width={pageWidth}
                        height={pageHeight}
                        size="stretch"
                        maxShadowOpacity={.5}
                        ref={ref}
                        onFlip={(e) => handleFlip(e)}>
                        <div></div>
                        {Array.from(new Array(numPages), (el, index) => (
                            <div>
                                <Page key={pagesId[index]} pageNumber={index + 1} width={pageWidth} />
                            </div>
                        ))}
                        <div></div>

                    </HTMLFlipBook>
                </div>
            </Document>
            <div className="page-selector">
                <button onClick={prevButtonClick}>prev {size.width}</button>
                {currentPage} of {numPages}
                <button onClick={nextButtonClick}>next</button>
            </div>

        </>
    )
}
