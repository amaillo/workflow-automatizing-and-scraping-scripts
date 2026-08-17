// ==UserScript==
// @name         Sequential Imagename Increaser
// @namespace    http://tampermonkey.net/
// @version      2026-04-23
// @description  Automates sequential image naming and format detection for high-volume asset collection.
// @author       Ricardo M (amaillo)
// @match        *://*/*
// @grant        none
// @noframes
// ==/UserScript==

// Cookie management to persist the EAN/Reference between tabs
function setCookie(name, value, days = 1) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Check the actual image type from the server headers
async function getImageType(url) {
    try {
        const res = await fetch(url, { method: 'HEAD' });
        const contentType = res.headers.get('Content-Type');
        return contentType && contentType.includes("image") ? contentType.replace("image/", "") : null;
    } catch (e) { return null; }
}

// Logic for incrementing the number on the clipboard (e.g., ref-1.jpg -> ref-2.jpg)
async function incrementClipboardNumber() {
    try {
        let text = await navigator.clipboard.readText();
        // Regex que busca el patrón "-[número].[extensión]" al final
        const regex = /-([0-9]+)\.([a-zA-Z0-9]+)$/;
        const match = text.match(regex);

        if (match) {
            const currentNum = parseInt(match[1]);
            const extension = match[2];
            const newText = text.replace(regex, `-${currentNum + 1}.${extension}`);
            await navigator.clipboard.writeText(newText);
            console.log(`Clipboard updated: ${newText}`);
        }
    } catch (err) {
        console.error('Failed to read/write clipboard:', err);
    }
}

// Main execution
(async function() {
	// 1. EAN Capture in Google Search
    if (window.location.href.includes("google.com/search")) {
        const searchInput = document.querySelector("textarea") || document.querySelector("input[name='q']");
        if (searchInput) {
            // Extract the first keyword (EAN/Ref) to use as the name base
            const searchTerm = searchInput.value.split(" ")[0].replace(/"/g, "");
            setCookie("lastGoogleText", searchTerm);
        }
    } else {
        // 2. Listen for ENTER key to increment file counter
        document.body.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                await incrementClipboardNumber();
            }
        });

        // 3. Visual format identifier (Useful for detecting WebP/AVIF)
        const imgType = await getImageType(window.location.href);
        if (imgType) {
            const label = document.createElement("div");
            label.innerText = `FORMATO: ${imgType.toUpperCase()}`;
            label.style = "position:fixed; top:0; left:0; background:red; color:white; padding:10px; z-index:9999; font-weight:bold; font-size:20px;";
            document.body.prepend(label);
        }
    }
})();