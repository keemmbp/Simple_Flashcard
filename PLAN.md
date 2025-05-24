# Project: Flashcard Web Application

**Goal:** Create a web application for flashcards that allows users to view predefined cards, add their own cards, and have a pleasant user interface. The application will be hosted on GitHub Pages.

**Tech Stack:**

1.  **Frontend (Client-Side):**
    *   **Structure & Content:** HTML5
    *   **Styling:**
        *   Base: CSS3
        *   UI Framework: **Semantic UI** (for components, layout, responsiveness, and theming)
    *   **Interactivity & Logic:** JavaScript (ES6+)
        *   Will utilize Semantic UI's JavaScript modules for interactive components.
    *   **Data Handling:**
        *   Initial/Default Flashcards: `data.json` file
        *   User-Added/Modified Flashcards: Browser Local Storage

2.  **Version Control & Hosting:**
    *   Version Control: Git
    *   Hosting: GitHub Pages

3.  **Development Environment:**
    *   Code Editor: VS Code (or preferred)
    *   Browser: Modern browser with developer tools
    *   Tooling: Live Server extension (VS Code)

**Key Features to Implement:**

*   Display flashcards (question/answer).
*   Ability to "flip" a card.
*   Navigation (next/previous card).
*   Form to add new flashcards (question and answer), toggleable.
*   Save new flashcards to Local Storage.
*   Load flashcards from Local Storage on startup.
*   Load initial set of flashcards from `data.json`.
*   Responsive design suitable for various screen sizes (leveraging Semantic UI).
*   Ability to delete cards.
*   Grouped "Card Management Actions" (Add New Card toggle, Delete Current Card) for improved UX.

**Visual Plan:**

```mermaid
graph LR
    subgraph "User's Browser (Client-Side Application)"
        direction LR
        HTML["HTML5 (Structure: Cards, Forms, Buttons - Semantic Classes)"]
        CSS["CSS3 (Custom Styles/Overrides)"]
        SemanticUI["Semantic UI (UI Components, Layout, Responsiveness, Theming)"]
        JavaScript["JavaScript (ES6+) (App Logic, DOM, Local Storage, Semantic UI JS Modules)"]
        
        subgraph "Data Sources"
            direction TB
            LocalStorage["Browser Local Storage (User-created cards)"]
            DataJSON["data.json (Initial/Default cards)"]
        end

        UserInterface["User Interface (Flashcards, Controls - Styled by Semantic UI)"]

        HTML -- Defines --> UserInterface
        CSS -- Styles/Overrides --> UserInterface
        SemanticUI -- Provides Components & Styles --> UserInterface
        JavaScript -- Controls & Updates --> UserInterface
        JavaScript -- Interacts with --> SemanticUI # For dynamic components
        JavaScript -- Reads/Writes --> LocalStorage
        JavaScript -- Reads --> DataJSON
    end

    subgraph "Development & Deployment Workflow"
        direction TB
        Developer["Developer (You!)"]
        VSCode["VS Code + Live Server"]
        Git["Git (Version Control)"]
        GitHubRepo["GitHub Repository"]
        GitHubPages["GitHub Pages (Static Hosting)"]

        Developer -- Uses --> VSCode
        Developer -- Uses --> Git
        VSCode -- Edits Files --> HTML
        VSCode -- Edits Files --> CSS
        VSCode -- Edits Files --> JavaScript
        VSCode -- Edits Files --> DataJSON
        Git -- Commits & Pushes --> GitHubRepo
        GitHubRepo -- Deploys to --> GitHubPages
    end

    GitHubPages -- Serves Static Files to --> UserInterface
```

---

## UI/UX Enhancements (Mobile-First Focus)

**Goal:** Refine the user interface and experience with a primary focus on mobile usability, ensuring a clean, minimalist theme with good contrast and readability, centered card text, a collapsible "Add New Card" form, stable layout, and clear separation of interaction vs. management controls.

**Overall Mobile-First Considerations:**
*   **Layout**: Utilize Semantic UI's responsive grid and responsive visibility classes for optimal layout on small screens.
*   **Tap Targets**: Ensure all interactive elements (buttons, form inputs) are adequately sized and spaced for easy tapping.
*   **Performance**: Maintain efficient CSS and JS.

**1. Center Text in Card (Mobile-Friendly):**
    *   **File**: `style.css`
    *   **Changes**:
        *   Modify `#flashcard-container` or the dynamically created `.ui.card` to ensure the `.card-face` (or `.description` div) uses CSS (e.g., flexbox) to center text content horizontally and vertically, adapting well to mobile screen sizes.

**2. Clean, Minimalist Theme (Good Contrast & Readability - Mobile Optimized):**
    *   **File**: `style.css`
    *   **Changes**:
        *   **Background & Text**: High contrast (e.g., light neutral background, dark gray text).
        *   **Typography**: Clear sans-serif fonts (default Lato is suitable). Consider slightly larger base font sizes for card content and UI elements on mobile. Ensure generous `line-height`.
        *   **Spacing (Whitespace)**: Crucial for mobile. Ample padding within cards, segments, and around buttons. Verify and adjust Semantic UI's default spacing for a less cramped mobile experience.
        *   **Buttons**: Ensure buttons are full-width (`fluid`) or stack appropriately on mobile to maximize tap area. Favor basic or primary/positive styles.
        *   **Simplicity**: Minimalist approach, reducing cognitive load. Tone down overly decorative elements if any.

**3. Collapsible "Add New Card" Form & Grouped Management Actions:**
    *   **Concept**: The "Add New Card" form toggle and the "Delete Current Card" button will be grouped together in a dedicated "Card Management Actions" section, separate from the main Prev/Flip/Next interaction controls.
    *   **File**: `index.html`
        *   A new `div` (e.g., `<div class="ui segment" id="card-management-actions" style="text-align: center;">`) will be created below the main `#controls-container`.
        *   The `div` containing the `toggle-add-form-button` (for showing/hiding the add card form) will be moved into `#card-management-actions`.
        *   The `delete-button` will also be placed within `#card-management-actions`.
    *   **File**: `style.css`
        *   The `hidden-form` class (`.hidden-form { display: none !important; }`) remains for the collapsible form.
        *   CSS rules will be added/adjusted for buttons within `#card-management-actions` to ensure they stack and are well-spaced on mobile.
    *   **File**: `script.js`
        *   Logic for `toggleAddFormButton` (toggling form visibility) remains.
        *   Logic for `deleteButton` (handling deletion) remains. DOM references will be correct as IDs are unchanged.

**4. Stabilize Layout (Prevent Button Movement):**
    *   **Objective**: Prevent interaction control buttons (`#controls-container`) from shifting when flashcard content height changes (for typical content up to ~4 lines).
    *   **Method**: Use `min-height` on the main flashcard container.
    *   **File**: `index.html`
        *   **Change**: Remove inline `style="min-height: 200px;"` from `div#flashcard-container`.
    *   **File**: `style.css`
        *   **Change**: For `#flashcard-container`, set `min-height: 260px;` (or similar, to accommodate ~4 lines of text + padding).

**Testing**:
*   Continuously test on various mobile viewports using browser developer tools throughout the implementation of these enhancements.

---

### Feature: Delete Card Functionality (Integrated into Card Management Actions)

**Goal**: Allow users to delete the currently displayed flashcard, with the control grouped with other card management actions.

**1. UI Change (`index.html`):**
    *   The `delete-button` (e.g., `<button class="ui negative button" id="delete-button">Delete Card</button>`) will be located within the new `#card-management-actions` segment, alongside the `toggle-add-form-button`.

**2. JavaScript Logic (`script.js`):**
    *   Get a reference to the `deleteButton`.
    *   Add an event listener to `deleteButton`.
    *   **On Click & Confirmation**:
        *   Check if `flashcards.length > 0`.
        *   Use `window.confirm("Are you sure you want to delete this card?")` for confirmation.
        *   If confirmed:
            *   Remove the card at `currentCardIndex` from the `flashcards` array.
            *   Call `saveFlashcardsToLocalStorage()`.
            *   Adjust `currentCardIndex` appropriately.
            *   Call `displayCard()` to refresh the view.
            *   `updateButtonStates()` (already modified) will handle enabling/disabling the `deleteButton`.

**3. Styling (`style.css`):**
    *   Ensure buttons within `#card-management-actions` (i.e., `toggle-add-form-button`'s wrapper and `delete-button`) stack correctly and have appropriate margins on mobile.