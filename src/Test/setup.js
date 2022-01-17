window.addEventListener('unhandledrejection', function(ev) {
    window.__karma__.error("unhandled rejection: " + ev.reason.message);
});