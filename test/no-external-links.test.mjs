import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distributionBundle = path.join(repositoryRoot, 'dist', 'sienna-accessibility.umd.js');

test('release bundle has no pages.dev navigation links', () => {
  assert.ok(existsSync(distributionBundle), 'The release UMD bundle must be built before verification.');

  const bundle = readFileSync(distributionBundle, 'utf8');

  assert.doesNotMatch(bundle, /https:\/\/[^"']*\.pages\.dev/i);
});
