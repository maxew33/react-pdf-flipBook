import React, { useState, useRef } from "react"
import { Document, Page } from "react-pdf"
import HTMLFlipBook from 'react-pageflip'
import useSound from "use-sound"

import pageFlip from "../../page-flip.mp3"

export default function Book(props) {
    const [numPages, setNumPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)

    const [play] = useSound(pageFlip)

    const ref = useRef()

    const pdf = props.pdf
    const size = props.size

    let pageHeight = size.height * .8

    let pageWidth = pageHeight * (21 / 29.7)

    const style = {
        width: 2 * pageWidth + 'px',
        height: pageHeight + 'px'
    }

    function onDocumentLoadSuccess(e) {
        setNumPages(e.numPages)
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
                        autoSize= {true}
                        maxShadowOpacity={.5}
                        mobileScrollSupport= {false}
                        ref={ref}
                        onFlip={(e) => handleFlip(e)}>
                        <div className='cover'></div>
                        {Array.from(new Array(numPages), (el, index) => (
                            <div key={index}>
                                <Page pageNumber={index + 1} width={pageWidth} />
                            </div>
                        ))}
                        <div></div>

                    </HTMLFlipBook>
                </div>
            </Document>
            <div className="page-selector">
                <button onClick={prevButtonClick}>prev</button>
                {currentPage} of {numPages}
                <button onClick={nextButtonClick}>next</button>
            </div>

        </>
    )
}
