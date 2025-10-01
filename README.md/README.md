# Emotional Detector (local)

## Requirements
- Node.js (v14+)
- Chrome (or any browser)

## Run backend
1. Open terminal:
   cd emotional-detector/backend
   npm install
   npm start

   Backend will run on http://localhost:3000

## Run frontend (Option A: open file directly)
- Open `emotional-detector/frontend/index.html` in Chrome.
- Make sure API URL in the UI is `http://localhost:3000/detect`.

## Run frontend (Option B: serve by backend)
- Copy frontend folder into backend's parent or configure express.static (see commented lines in index.js).
- Or use a simple static server like `npx serve frontend` and open the given URL.

## Test
- Type something like "I am so happy and excited!" or "I'm feeling lonely and sad."
- Click Detect Emotion — results will show.

