import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateWaitlistEmail,
  validateVideoFile,
  buildClipReadiness,
  buildFallbackMailto,
  demoAnalysis,
} from '../src/mvp.js';

test('accepts a normal waitlist email', () => {
  assert.equal(validateWaitlistEmail(' rider@example.com '), true);
});

test('rejects malformed waitlist emails', () => {
  for (const email of ['', 'rider', 'rider@', '@example.com', 'rider@example']) {
    assert.equal(validateWaitlistEmail(email), false, email);
  }
});

test('accepts a supported phone video under 250 MB', () => {
  assert.deepEqual(validateVideoFile({ type: 'video/mp4', size: 42_000_000 }), { ok: true });
});

test('rejects unsupported and oversized uploads with useful messages', () => {
  assert.equal(validateVideoFile({ type: 'image/jpeg', size: 2_000 }).ok, false);
  assert.match(validateVideoFile({ type: 'video/mp4', size: 251_000_000 }).message, /250 MB/);
});

test('requires the complete side-on filming protocol', () => {
  assert.deepEqual(buildClipReadiness({ sideOn: true, fullRider: true, stable: true, daylight: true }), {
    ready: true,
    completed: 4,
    total: 4,
  });
  assert.equal(buildClipReadiness({ sideOn: true, fullRider: false, stable: true, daylight: true }).ready, false);
});

test('builds an encoded email fallback when the waitlist service is unavailable', () => {
  const url = buildFallbackMailto({ email: 'rider@example.com', level: 'Intermediate', skill: 'Rear wheel lift' });
  assert.match(url, /^mailto:eli-launchcreative@agentmail\.to\?/);
  assert.match(url, /rider%40example\.com/);
  assert.match(url, /Rear%20wheel%20lift/);
});

test('demo analysis is explicitly labeled as a preview fixture', () => {
  assert.equal(demoAnalysis.isFixture, true);
  assert.match(demoAnalysis.label, /preview/i);
  assert.ok(demoAnalysis.primaryIssue);
  assert.ok(demoAnalysis.drill);
});
