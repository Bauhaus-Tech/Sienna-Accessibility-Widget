# Sienna Accessibility Widget — Bauhaus fork

This is a public fork of the upstream Sienna Accessibility Widget 2.0.1 source.
It retains the upstream MIT licence in [LICENSE](LICENSE). The source and build
tooling in this repository are the authoritative source for its distributed
JavaScript files.

## Local asset policy

The browser bundle does not retrieve font or locale assets from a third-party
host:

- Locale JSON modules are bundled into `dist/sienna-accessibility.umd.js`.
- The readable-font control resolves its OpenDyslexic font files from
  `dist/fonts/` next to the bundle that loaded it.
- An integration that injects the bundle inline can set
  `data-asw-asset-base-url` on its script element to provide the local asset
  base URL.

The redistributed OpenDyslexic files are covered by the SIL Open Font License
1.1 in [LICENSES/OpenDyslexic-OFL-1.1.txt](LICENSES/OpenDyslexic-OFL-1.1.txt).

## Build and verify

Use a supported Node.js release, then run:

```sh
npm install
npm test
```

`npm test` builds the ESM, CommonJS, and UMD bundles and verifies that the UMD
contains no external font or locale URL and that both local font files are
present in `dist/fonts/`. To create the distributable files without running the
verification, use:

```sh
npm run build
```

The `dist/` directory is generated output and is intentionally not committed.

## Features

- Multilingual interface with bundled locale data
- Readable OpenDyslexic font
- Font-size, contrast, spacing, highlighting, animation, cursor, and reading
  controls

## Contributing

Contributions should include source changes, a reproducible build, and tests
for observable behavior. Do not add browser-time dependencies on third-party
font or locale hosts.
