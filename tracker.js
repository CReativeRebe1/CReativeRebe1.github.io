// Helper function to format timestamp nicely
function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace('T', ' ').split('.')[0];
}

// Function to log user interactions
// Helper function to format timestamp nicely
function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace('T', ' ').split('.')[0];
}

function logEvent(type, target) {
  const tag = target.tagName.toLowerCase();
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
    case 'b':
    case 'strong':
      details = `bold text`;
      break;
    default:
      details = tag;
  }

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


// Log initial page view
window.addEventListener('load', () => {
  console.log(`[${getTimestamp()}] | view | page loaded`);
});

// Log every click on the page
document.addEventListener('click', e => {
  logEvent('click', e.target);
});
