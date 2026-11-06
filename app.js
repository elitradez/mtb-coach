import { validateVideoFile, buildClipReadiness, demoAnalysis } from './src/mvp.js';

const $ = (selector) => document.querySelector(selector);
const upload = $('#clip');
const drop = $('#drop');
const preview = $('#preview');
const previewVideo = $('#preview-video');
const uploadCopy = $('#upload-copy');
const analyze = $('#analyze');
const error = $('#clip-error');
const result = $('#result');
const checks = [...document.querySelectorAll('[data-protocol]')];
let objectUrl;

function track(event, properties = {}) {
  const events = JSON.parse(localStorage.getItem('mtb-coach-events') || '[]');
  events.push({ event, properties, at: new Date().toISOString() });
  localStorage.setItem('mtb-coach-events', JSON.stringify(events.slice(-100)));
}

function readiness() {
  const protocol = Object.fromEntries(checks.map((input) => [input.dataset.protocol, input.checked]));
  const state = buildClipReadiness(protocol);
  $('#readiness').textContent = `${state.completed}/${state.total} filming checks complete`;
  analyze.disabled = !upload.files[0] || !state.ready;
  return state;
}

function handleFile(file) {
  const validation = validateVideoFile(file);
  error.textContent = validation.ok ? '' : validation.message;
  if (!validation.ok) {
    upload.value = '';
    preview.hidden = true;
    readiness();
    return;
  }
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrl = URL.createObjectURL(file);
  previewVideo.src = objectUrl;
  preview.hidden = false;
  uploadCopy.innerHTML = `<strong>${file.name}</strong><span>${(file.size / 1_000_000).toFixed(1)} MB · stays on this device in the preview</span>`;
  track('clip_selected', { type: file.type, sizeMb: Math.round(file.size / 1_000_000) });
  readiness();
}

upload.addEventListener('change', () => upload.files[0] && handleFile(upload.files[0]));
checks.forEach((input) => input.addEventListener('change', readiness));

drop.addEventListener('dragover', (event) => {
  event.preventDefault();
  drop.classList.add('dragging');
});
drop.addEventListener('dragleave', () => drop.classList.remove('dragging'));
drop.addEventListener('drop', (event) => {
  event.preventDefault();
  drop.classList.remove('dragging');
  const file = event.dataTransfer.files[0];
  if (!file) return;
  const transfer = new DataTransfer();
  transfer.items.add(file);
  upload.files = transfer.files;
  handleFile(file);
});

analyze.addEventListener('click', () => {
  if (!readiness().ready || !upload.files[0]) return;
  $('#fixture-label').textContent = demoAnalysis.label;
  $('#primary-issue').textContent = demoAnalysis.primaryIssue;
  $('#evidence').textContent = demoAnalysis.evidence;
  $('#drill').textContent = demoAnalysis.drill;
  result.hidden = false;
  result.scrollIntoView({ behavior: 'smooth', block: 'center' });
  track('analysis_preview_viewed', { skill: 'bunny-hop' });
});

for (const link of document.querySelectorAll('[data-scroll]')) {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
}

$('#waitlist-form').addEventListener('submit', () => {
  track('waitlist_submitted', { level: $('#level').value, skill: $('#skill').value });
});

readiness();
