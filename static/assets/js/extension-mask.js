// Extension Masking Script - Hide file extensions with domain-like extensions
// This helps bypass school filters that block file extensions

const extensionMap = {
  ".js": ".com",        // JavaScript
  ".css": ".org",       // CSS
  ".json": ".net",      // JSON
  ".html": ".io",       // HTML
  ".woff2": ".info",    // Fonts
  ".ttf": ".biz",       // Fonts
  ".png": ".tv",        // Images
  ".jpg": ".co",        // Images
  ".jpeg": ".co",       // Images
  ".gif": ".me",        // Images
  ".svg": ".app",       // SVG
  ".webp": ".tech",     // WebP images
  ".mp4": ".dev",       // Video
};

// Function to mask file extensions
function maskExtension(url) {
  for (const [realExt, maskedExt] of Object.entries(extensionMap)) {
    if (url.endsWith(realExt)) {
      return url.slice(0, -realExt.length) + maskedExt;
    }
  }
  return url;
}

// Rewrite all script src attributes
document.querySelectorAll("script[src]").forEach(script => {
  script.src = maskExtension(script.src);
});

// Rewrite all link href attributes (stylesheets, etc.)
document.querySelectorAll("link[href]").forEach(link => {
  link.href = maskExtension(link.href);
});

// Rewrite all img src attributes
document.querySelectorAll("img[src]").forEach(img => {
  img.src = maskExtension(img.src);
});

// Rewrite all source src attributes (video, audio)
document.querySelectorAll("source[src]").forEach(source => {
  source.src = maskExtension(source.src);
});

// Intercept fetch calls
const originalFetch = window.fetch;
window.fetch = function(...args) {
  if (typeof args[0] === "string") {
    args[0] = maskExtension(args[0]);
  } else if (typeof args[0] === "object" && args[0].url) {
    args[0].url = maskExtension(args[0].url);
  }
  return originalFetch.apply(this, args);
};

// Intercept XMLHttpRequest
const originalOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url, ...rest) {
  url = maskExtension(url);
  return originalOpen.apply(this, [method, url, ...rest]);
};

console.log("✅ Extension masking is active - file extensions are hidden!");
