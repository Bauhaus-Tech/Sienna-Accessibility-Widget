# Phase 10 local-assets browser receipt

- Runtime: Chromium at a 1280×720 viewport, using the fork's local UMD build.
- Command: `npm test`; the committed `test/browser-local-assets.test.mjs`
  fixture starts a loopback server and records every request.
- Fixture: a local HTTP server served the repository root and loaded
  `dist/sienna-accessibility.umd.js` from the same origin.
- Interaction: opened the toolbar, increased the sample heading's font size,
  enabled high contrast, and enabled the readable-font control.
- Requests: the only requests were the HTML fixture, the local UMD, and
  `dist/fonts/OpenDyslexic3-Regular.woff`; no third-party request occurred.
- Result: all three controls worked and the readable font loaded from the local
  distribution directory.
