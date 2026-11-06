const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUPPORTED_VIDEO_TYPES = new Set(['video/mp4', 'video/quicktime', 'video/webm']);
const MAX_VIDEO_BYTES = 250_000_000;

export function validateWaitlistEmail(value) {
  return typeof value === 'string' && EMAIL_PATTERN.test(value.trim());
}

export function validateVideoFile(file) {
  if (!file || !SUPPORTED_VIDEO_TYPES.has(file.type)) {
    return { ok: false, message: 'Choose an MP4, MOV, or WebM video.' };
  }
  if (file.size > MAX_VIDEO_BYTES) {
    return { ok: false, message: 'Keep the clip under 250 MB.' };
  }
  return { ok: true };
}

export function buildClipReadiness(protocol) {
  const fields = ['sideOn', 'fullRider', 'stable', 'daylight'];
  const completed = fields.filter((field) => protocol[field] === true).length;
  return { ready: completed === fields.length, completed, total: fields.length };
}

export function buildFallbackMailto({ email, level, skill }) {
  const subject = 'Join the MTB Coach founding rider beta';
  const body = `Please add me to the MTB Coach waitlist.\n\nEmail: ${email}\nRiding level: ${level}\nHardest bunny-hop issue: ${skill}`;
  return `mailto:eli-launchcreative@agentmail.to?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const demoAnalysis = Object.freeze({
  isFixture: true,
  label: 'Example analysis preview — not generated from your clip',
  primaryIssue: 'Your rear-wheel lift begins after your hips have already stopped moving upward.',
  evidence: 'At peak front-wheel height, your hips remain behind the bottom bracket instead of rising toward the bars.',
  drill: 'Practice 5 slow front-lift-to-scoop repetitions beside a curb. Focus on driving your hips up, then forward—not pulling harder with your arms.',
  confidence: 'Example only',
});
