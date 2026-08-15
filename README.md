# workflow-automatizing-and-scraping-scripts
A collection of JavaScript/Tampermonkey tools created to eliminate operational bottlenecks, automate complex DOM interactions, and optimize workflows across various platforms.

# Installation & Setup

To use these automation scripts, you will need a userscript manager like Tampermonkey.

1. **Install Tampermonkey**: Available for Chrome, Firefox, and Edge.
2. **Add a New Script**: Click the Tampermonkey icon in your browser and select "Create a new script".
3. **Copy & Paste**: Paste the code from `script1.js` or `script2.js` into the editor.
4. **Save**: Press `Ctrl+S` (or File > Save). The script will now run automatically on the specified product management domains.

---

## Smart Keyword Cycler & Dynamic Clipboard

This script is designed to eliminate repetitive typing and constant tab-switching by transforming any text field into a multi-state search and paste tool.

- **Dual-Control Automation:**
    - **Left-Click:** Cycles through an unlimited list of predefined keywords (e.g., `"word 1"` → `"word 2"` → `"word 3"`).
    - **Middle-Click:** Directly injects your current clipboard content into the field without affecting the keyword cycle.
	- **Persistent Cycle Memory:** Unlike standard scripts, this one remembers your position in the keyword cycle even after refreshing the page or navigating to a different URL. It uses local storage to ensure your workflow is never interrupted by page reloads.
- **High-Velocity Workflow:** Optimized for tasks that require alternating between a set of recurring variables and a unique, external reference. It eliminates the typing fatigue by keeping all necessary data at your fingertips.

**Note:** The middle-click implementation includes a `preventDefault` trigger to disable the browser's auto-scroll icon, ensuring a clean and focused experience.
---

## Prestashop Helper

A script designed to speed up product listings in Prestashop (Tested on v1.7.8.11 for a spanish website).

<details>
<summary><b>Click to see all Features</b></summary>

#### Product Title Optimization
- **Smart Capitalization:** Automatically applies Title Case to every word.
- **Gender & Demographics Translation:** Detects and moves gender keywords to the end for consistency.
- **"Pack" Reordering:** Moves "Pack of" phrases to the end of the title.
- **Contextual Expansion:** Adds "de Fútbol" automatically if "Equipación" is detected.
- **Grammar Correction:** Automatically adds missing accents (fútbol, pádel).
- **Abbreviation Expansion:** Expands shorthand like "AOP" to "Allover Prints".
- **Synonym Cleanup:** Replaces terms with preferred synonyms (e.g., "Zapatos" -> "Zapatillas").
- **Whitespace Scrubbing:** Removes unnecessary double spaces.

#### Combinations Tab
- **Size Error Detection:** Turns the tab **red** if a size > 2 digits is detected.

#### Automation & UI Enhancements
- **Dynamic Attribute Creation:** Creates the "Color" characteristic if missing.
- **Quick-Pick Color Buttons:** Injects buttons for Color and Color Scheme.
- **Smart Auto-Categorization:** Automatically selects the category based on title analysis.

#### Category Field Logic
- **Improved Menu Trigger:** Opens the menu on click (no more manual typing/deleting).
- **Persistent Childs' Logic:** Remembers selections for children’s items.

#### Reference & Brand Handling
- **Instant Google Search:** Click the Reference field to search for the product.
- **Brand Correction:** Fixes brands like "Adidas Sportswear" to "Adidas".
- **Sticky Brand Label:** Keeps the brand visible at the top for easy drag-and-drop.

#### Media Management
- **Hotkeys:** Press `Delete` to remove the selected image.
- **Auto-Confirm Deletion:** Bypasses confirmation modals automatically.

</details>

### Key Highlights
- **Automatic Categorization:** Uses title analysis and gender/demography detection to select the correct category without manual searching.
- **Title Formatting:** Fixes capitalization, replaces synonyms, moves "Pack" descriptions to the end, and corrects common typos.
- **UI Shortcuts:** Injects quick-access buttons for colors and brands so you don't have to type them manually.
- **Error Flagging:** Highlights the combinations tab in red if a suspicious size (more than 2 digits) is detected.

---

### How it works

- **Reactive UI:** The script waits for elements to appear before acting, preventing errors on slow-loading pages.
- **User Simulation:** Instead of just forcing text into boxes, it simulates real typing. This ensures Prestashop's background logic triggers and manages data correctly.
- **Easy Customization:** You can easily tweak the `blackList`, `synonyms`, or `itemTitleInParts` arrays at the top of the code to fit different stores.
  
<img alt="demo" src="./gifs/Prestashop.gif" height="280" />
---

## Cosmo Editor Helper Enhanced

The spiritual successor to the Prestashop Helper, custom-built to interface with a private Python/Flask-based internal editor webapp. It transforms a minimal data-entry tool into a high-performance automation workstation.

<details>
<summary><b>Click to see all Features</b></summary>
### Intelligent Inference

- **Size-to-Department Logic:** Automatically infers if a product is for Men, Women, or Kids by analyzing the numerical range of the stock sizes.
- **Smart Brand Normalization:** Cleans and formats brand names (e.g., fixing "Quicksilver" typos or reformatting "+8000") and strips technical suffixes from references to improve search accuracy.
- **Title Scrubbing:** Automatically removes redundant gender keywords (e.g., "Men", "Wmn") and fixes case formatting while preserving specific abbreviations like "FC".

### Custom UI & Productivity UX

- **Categorized Button Arrays:** Injects a structured UI with button groups organized by body zone (Headwear, Chest, Waist, Footwear) for one-click categorization.
- **Integrated Search Frame:** Embeds a live search engine (You.com) directly into the interface, allowing for product verification without switching tabs.
- **Gamified Productivity:** Includes a "Score Counter" and a "Productivity Timer" with OS-level notifications (Windows 11) to maintain focus and track daily output.

### State Persistence (Local Storage)

- **Category Memory:** Features an "Auto-Restore" toggle and a "Category History" dropdown to reuse previous selections across different products.
- **Model History:** Maintains a searchable history of the last 5 edited models for quick reference or error correction.

### Technical Implementation

- **Native Event Interception:** Safely overrides the native .click() methods of the application's save buttons to inject custom logging and validation logic.
- **User Simulation:** Simulates precise keyboard events (Enter, ArrowUp, KeyS) to interact with the Python app's specific focus and saving requirements.
- **Reliable Selectors:** Uses robust fallback logic to find DOM elements in a simplified, non-standardized internal UI.

</details>

<img alt="demo" src="./gifs/Cosmo1.gif" height="280" />
---

## Cosmo Editor 2 Helper

The last script in the Cosmo series, developed to handle high-volume database updates within a Streamlit-based environment. It focuses on reducing cognitive load by automating data inference and UI interactions.

- **Heuristic Suggestions:** Predicts the correct department (Men, Women, Kids) by analyzing numerical size ranges.
- **Embedded Research:** Injects a live search frame (Yep/Search) to verify product details without leaving the tab.
- **Batch Automation:** Scrapes grid data to populate fields and manage image workflows automatically.

<details>
<summary><b>Click to see Technical Implementation</b></summary>

### Intelligent Data Processing
- **Range Analysis:** Uses logic to detect size patterns (e.g., sizes >39) and suggest departments, minimizing manual selection errors.
- **Data Scraper:** Real-time extraction of EANs and color maps from the grid to feed the automation engine.
- **Image Orchestrator:** Visual helper for product photo ordering with built-in logic to skip items with missing assets.

### UI & DOM Handling
- **Dynamic Interaction:** Implements `MutationObserver` and `setInterval` to interact with non-standard Streamlit popovers and dropdowns.
- **Auto-Scroll Logic:** Simulates precise scroll events to find and select options in complex, dynamically loaded menus.
- **Validation Engine:** Overrides native click events to perform integrity checks before submitting data to the Python backend.

</details>

**Note:** Both Cosmo Editor Helper scripts are specifically tailored for a closed-source internal application. Their value is to demonstrate advanced DOM manipulation, heuristic-based automation, and workflow optimization.

<img alt="demo" src="./gifs/Cosmo2.gif" height="280"/>
---

## Sequential Imagename Increaser

A productivity tool designed to automate the naming of image sequences during mass collection. It eliminates the friction of manual numbering, allowing for a fluid "search and save" rhythm.

- **Clipboard Sequencer:** Upon pressing `Enter`, the script detects a trailing number in your clipboard (e.g., `ref-1.jpg`) and increments it (`ref-2.jpg`) for the next save action.
- **Format Detection:** Injects a high-visibility overlay on direct image URLs to identify the true file extension (WebP, PNG, JPEG) at a glance.
- **Context Persistence:** Captures search terms from Google to maintain the base reference across multiple browser tabs.

### The "Pulse" Workflow
This script was the engine for a rapid-fire saving technique:
1. **Copy** the reference from a spreadsheet.
2. **Search** and open multiple image tabs.
3. **In each tab:** `Ctrl+S` -> `Ctrl+V` (Paste) -> `Enter` (Save) -> `Enter` (Increment for the next image).

**Note:** A practical "quality of life" tool. It turned a tedious renaming process into a mechanical sequence of keystrokes.

<img alt="demo" src="./gifs/Renamer.gif" height="280"/>
---

## Scholarum Search Preparer

A lead generation assistant. It extracts geographical data from Scholarum records to generate direct Google search links, bypassing manual copy-pasting.

- **Link Redirection:** Replaces original school links with customized Google search queries for contact information.
- **Query Sanitization:** Normalizes search terms (e.g., swapping "IES" for "Colegio") to ensure cleaner and more relevant search results.
- **Geographic Data Mining:** Automatically parses the DOM to extract Postal Codes, Cities, and Provinces for high-precision queries.
- **Image-to-Link Conversion:** Wraps school thumbnails in search links, expanding the clickable area for a faster workflow.
- **Visual Feedback:** Adds a purple color indicator on click to keep track of processed records.

<img alt="demo" src="./gifs/Scholarum.gif" height="280" />

---

## Niche & GreatSchools Search Linker

A lead generation assistant. It sanitizes school names on Niche.com and generates direct links to Google Search, bypassing manual copy-pasting.

- **Link Redirection:** Injects customized search queries directly into the school’s title and link elements.
- **Query Sanitization:** Removes "noise" from school and city names (e.g., "K-12", "Public Schools") to ensure cleaner search results.
- **Automatic Navigation:** Features an auto-scroll trigger for GreatSchools pages to jump straight to the contact section.
- **Visual Feedback:** Adds a purple color indicator on click to keep track of processed records.

<img alt="demo" src="./gifs/Niche.gif" height="280" />
---

## Clear Channel Billboards Helper - Auto PDF Downloader and Renamer

A specialized utility for renaming PDF exports by extracting data directly from the document's text layer. It ensures billboard assets are saved with their official ID instead of generic system-generated filenames.

- **Internal PDF Parsing:** Integrates PDF.js to scan the document content asynchronously.
- **Pattern Matching:** Uses RegEx to isolate the Billboard ID between specific markers within the raw text data.
- **Auto-Download Trigger:** Programmatically generates a download event, renaming the file to match the internal reference (e.g., BillboardID.pdf) automatically.

**Note:** This script eliminates the manual task of opening a PDF, finding the ID, and renaming the file on the computer. The entire process is now a single-click operation. You can test this script [here](https://cco.my.salesforce-sites.com/slickspdf?ids=510784).
<img alt="demo" src="./gifs/ClearChannel.gif" height="280" />

---

## Outfront Billboard Helper - Data Collector

A multi-stage automation tool designed to bridge the gap between map-based visual interfaces and document-based data. It manages state across different tabs to compile comprehensive billboard records into a single clipboard string.

- **Cardinal UI Overlay:** Injects custom directional buttons (N, S, E, W) into the map interface to capture the billboard's facing side as the user triggers the data flow.
- **Cross-Page State Management:** Uses localStorage to persist metadata (Address, Facing, Media Type) from the map view into the PDF viewer, enabling a seamless data merge.
- **Advanced Text Layer Extraction:** Implements complex Regular Expressions to parse unstructured address strings, identifying specific landmarks like nearest exits and freeway names.
- **Workflow Optimization:** Features a custom manual "Hand" selection (Left/Right) and a "Copy-to-Clipboard" trigger that formats all data specifically for spreadsheet entry.

**Note:** This is a high-level productivity tool. It transforms a process that required constant tab-switching and manual typing into a streamlined workflow where the user only needs to make two clicks (Direction and Side).
<img alt="demo" src="./gifs/OutfrontFull.gif" height="280" />
---

## Lamar Billboards Helper - Data Collector

A high-precision data extraction tool for Lamar’s billboard data platform. It bridges the gap between raw web coordinates and structured spreadsheets by integrating local geographic databases and advanced distance algorithms.

- **Geographic Data Mining:** Uses an internal database and Vincenty’s formulae to automatically calculate the nearest Zip Code, City, and County based on the billboard's Lat/Long.
- **Automated Specification Scraper:** Instantly captures Panel ID, weekly impressions, lighting status, and dimensions, normalizing technical data (like "LHR/RHR") for industry standards.
- **Spreadsheet-Ready UI:** Injects an overlay with proximity data and two specialized "Copy" buttons (Standard/Extended) that format all fields as tab-separated values.
- **Instant PDF Workflow:** Features a Spacebar hotkey that automatically renames the billboard ID for PDF exporting and triggers the print dialog in one motion.

**Note:** This script eliminates the need for manual looking for Zip and County when extracting data. It transforms a multi-step research process into a streamlined workflow where the geographic context is provided automatically.

<img alt="demo" src="./gifs/Lamar.gif" height="280" />

