function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace('T', ' ').split('.')[0];
}

// Detect current page (from <title> or file name)
function getPageLabel() {
  const title = document.title.trim();
  if (title) return title;
  const path = window.location.pathname.split('/').pop();
  return path || 'Unnamed Page';
}

// Log formatter
function logEvent(type, target, extra = '') {
  const page = getPageLabel();
  const tag = target?.tagName?.toLowerCase?.() || 'unknown';
  let details = '';

  switch (tag) {
    case 'a':
      details = `link ("${target.textContent.trim() || target.href}")`;
      break;
    case 'button':
      details = `button ("${target.textContent.trim()}")`;
      break;
    case 'img':
      details = `image (${target.src})`;
      break;
    case 'input':
      details = `input (${target.type || 'text'})`;
      break;
    case 'select':
      details = `dropdown`;
      break;
    case 'textarea':
      details = `text area`;
      break;
    case 'video':
      details = `video`;
      break;
    case 'audio':
      details = `audio`;
      break;
    case 'b':
    case 'strong':
      details = `bold text`;
      break;
    case 'div':
      details = target.className ? `div (.${target.className})` : `div`;
      break;
    default:
      details = tag;
  }

  if (extra) details += ` ${extra}`;
  console.log(`[${getTimestamp()}] | ${type.toUpperCase()} | ${page} | ${details}`);
}

// 1️⃣ Page load (view event)
window.addEventListener('load', () => {
  logEvent('view', document.body, '(page fully loaded)');
});

// 2️⃣ Clicks
document.addEventListener('click', e => {
  logEvent('click', e.target);
});

// 3️⃣ Inputs (typing, focus, blur)
document.addEventListener('input', e => {
  logEvent('input', e.target);
});
document.addEventListener('focusin', e => {
  logEvent('focus', e.target);
});
document.addEventListener('focusout', e => {
  logEvent('blur', e.target);
});

// 4️⃣ Mouse hover / move (optional light version)
document.addEventListener('mouseover', e => {
  logEvent('hover', e.target);
}, { once: false });

// 5️⃣ Scroll or visibility changes
document.addEventListener('scroll', () => {
  logEvent('scroll', document.body);
}, { passive: true });

// 6️⃣ Window tab visibility (page viewed / hidden)
document.addEventListener('visibilitychange', () => {
  const state = document.visibilityState === 'visible' ? 'visible' : 'hidden';
  logEvent('view', document.body, `(page ${state})`);
});
