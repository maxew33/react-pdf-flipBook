import React, { useState } from "react"
import { Document, Page } from "react-pdf"

export default function SinglePage(props) {
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [pageNumber, setPageNumber] = useState(1) //setting 1 to show fisrt page

    function onDocumentLoadSuccess(e) {
        setNumberOfPages(e.numPages)
        setPageNumber(1)
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset)
    }

    function previousPage() {
        changePage(-1)
    }

    function nextPage() {
        changePage(1)
    }

    const pdf = props.pdf
    const size = props.size

    return (
        <>
            <Document
                file={pdf}
                options={{ workerSrc: "/pdf.worker.js" }}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} width={size.width} />
            </Document>
            <div className="page-selector">
                <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
                    Previous
                </button>

                <p>
                    Page {pageNumber || (numberOfPages ? 1 : "--")} of {numberOfPages || "--"}
                </p>

                <button
                    type="button"
                    disabled={pageNumber >= numberOfPages}
                    onClick={nextPage}
                >
                    Next
                </button>

            </div>
            <div>
            </div>
        </>
    )
}