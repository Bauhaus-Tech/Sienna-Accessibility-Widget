import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distributionDirectory = path.join(repositoryRoot, 'dist');
const localFonts = [
  'OpenDyslexic3-Regular.woff',
  'OpenDyslexic3-Regular.ttf',
];

test('release bundle resolves toolbar assets without remote font or locale URLs', () => {
  const bundlePath = path.join(distributionDirectory, 'sienna-accessibility.umd.js');

  assert.ok(existsSync(bundlePath), 'The release UMD bundle must be built before verification.');

  for (const font of localFonts) {
    assert.ok(
      existsSync(path.join(distributionDirectory, 'fonts', font)),
      `The release must include ${font}.`
    );
  }

  const bundle = readFileSync(bundlePath, 'utf8');

  assert.doesNotMatch(bundle, /https?:\/\/[^"']+\/fonts\//i);
  assert.doesNotMatch(bundle, /https?:\/\/[^"']+\/locales\//i);
});
