// ==UserScript==
// @name         Clipboard and Word Cycler (Google Exluded)
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Left-click cycles keywords (remembers state after reload), Middle-click pastes clipboard.
// @author       Ricardo M (amaillo) & IA
// @match        *://*/*
// @exclude      *://*.google.*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // List of keywords
    const cycleValues = ['Superintendent', 'Principal', 'Music', 'Arts', 'Math', 'Spanish'];

    async function handleMouseDown(event) {
        const target = event.target;

        const isTextInput = (target.tagName === 'INPUT' &&
                             ['text', 'password', 'email', 'search', 'tel', 'url', 'number'].includes(target.type)) ||
                            (target.tagName === 'TEXTAREA');

        if (!isTextInput) return;

        // MIDDLE CLICK: Paste clipboard (Direct action, no state change)
        if (event.button === 1) {
            event.preventDefault();
            try {
                const text = await navigator.clipboard.readText();
                target.value = text;
                target.select();
            } catch (err) {
                console.error('Clipboard paste failed:', err);
            }
            return;
        }

        // LEFT CLICK: Cycle with persistence
        if (event.button === 0) {
            // 1. We retrieve the last state from localStorage (or 0 if it's the first time)
            let state = parseInt(localStorage.getItem('wordCyclerState')) || 0;

            // 2. Apply the value
            target.value = cycleValues[state % cycleValues.length];
            target.select();

            // 3. Increment and SAVE the state so it survives the page reload
            localStorage.setItem('wordCyclerState', (state + 1) % cycleValues.length);
        }
    }

    document.addEventListener('mousedown', handleMouseDown, true);
})();