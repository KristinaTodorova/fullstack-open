# Exercise

Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

# Solution

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user writes "New note" and clicks on Save.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa, payload: {"content": "New note"}
    activate server
    server-->>browser: 201 Created, {"message":"note created"}
    deactivate server