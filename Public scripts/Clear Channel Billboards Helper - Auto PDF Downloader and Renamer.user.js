// ==UserScript==
// @name          Clear Channel Billboards Helper - Auto PDF Downloader and Renamer.user.js
// @namespace     http://tampermonkey.net/
// @version       0.6
// @description   Automates PDF renaming by extracting billboard IDs from document text.
// @author        Ricardo M (amaillo) & IA
// @match         https://cco.my.salesforce-sites.com/slickspdf?ids*
// @icon          data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant         none
// ==/UserScript==

// Imports the PDF.js library to enable PDF parsing directly in the browser
let pdfjsLib = await import("https://unpkg.com/pdfjs-dist@4.8.69/legacy/build/pdf.mjs")
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;


// Loads a PDF from a URL and extracts the raw text content from all pages.
function extractTextFromPdf(pdfUrl) {
    var pdf = pdfjsLib.getDocument(pdfUrl);
    return pdf.promise.then(function (pdf) {
        var totalPageCount = pdf.numPages;
        var countPromises = [];
        for (
            var currentPage = 1;
            currentPage <= totalPageCount;
            currentPage++
        ) {
            var page = pdf.getPage(currentPage);
            countPromises.push(
                page.then(function (page) {
                    var textContent = page.getTextContent();
                    return textContent.then(function (text) {
                        return text.items
                            .map(function (s) {
                                return s.str;
                            })
                            .join('');
                    });
                }),
            );
        }

        return Promise.all(countPromises).then(function (texts) {
            return texts.join('');
        });
    });
}


// Uses a Regular Expression to find and return text located between two specific string markers.
function getTextBetweenTwoWords(completeText,startWord,endWord){

    const extractedText = completeText.match(`${startWord}(.*?)${endWord}`);
    console.log(extractedText)
    return extractedText[1]
}

// Execution logic: Runs only on specific Salesforce-hosted PDF export URLs
if(window.location.href.includes("https://cco.my.salesforce-sites.com/slickspdf?ids")){

    const url = window.location.href;

    extractTextFromPdf(url).then(
        function (textFromPdf) {
            console.log(textFromPdf)
            let billboard = ""

            // Locates the specific Billboard ID based on known PDF text patterns
            billboard = getTextBetweenTwoWords(textFromPdf,"M EDT"," - ")

            // Creates a temporary link to trigger an automatic download with the billboard ID as the filename
            let link = document.createElement('a');
            link.href = url;
            link.download = `${billboard}.pdf`;
            link.dispatchEvent(new MouseEvent('click'));
        })
}