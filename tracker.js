// Helper function to format timestamp nicely
function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace('T', ' ').split('.')[0];
}

// Function to log user interactions
function logEvent(type, target) {
  const tag = target.tagName.toLowerCase();
  let details = '';

  if (tag === 'input' || tag === 'select' || tag === 'textarea')
    details = target.type || tag;
  else if (tag === 'img')
    details = `image (${target.src})`;
  else if (tag === 'button')
    details = `button ("${target.textContent.trim()}")`;
  else
    details = tag;

  console.log(`[${getTimestamp()}] | ${type} | ${details}`);
}

// Log initial page view
window.addEventListener('load', () => {
  console.log(`[${getTimestamp()}] | view | page loaded`);
});

// Log every click on the page
document.addEventListener('click', e => {
  logEvent('click', e.target);
});
