const selectors = [
    'ytd-rich-grid-renderer',
    'ytd-watch-next-secondary-results-renderer',
    'ytd-mini-guide-renderer',
    '.ytp-endscreen-content',
    'ytd-reel-shelf-renderer',
    'ytd-shorts'
];


let enabled = true;


function applyFocusMode(){
    if (!enabled) {
        document.body.classList.remove("focus-mode");
        document.querySelectorAll('.focus-mode-hide').forEach(el => el.classList.remove('focus-mode-hide'));
        return;
    }

    document.body.classList.add("focus-mode");
    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.classList.add('focus-mode-hide'));
    });
    
    if (location.pathname.startsWith("/shorts")) {
        history.replaceState({}, "", "/");
        location.reload();
    }
}

chrome.storage.local.get({ ytEnabled: true }, data => {
    enabled = data.ytEnabled;
    applyFocusMode();
});

chrome.storage.onChanged.addListener(changes => {
    if(changes.ytEnabled){
        enabled = changes.ytEnabled.newValue;
        applyFocusMode();
    }
});

let applyTimeout;

function debouncedApply(){
    if(applyTimeout) clearTimeout(applyTimeout);
    applyTimeout = setTimeout(applyFocusMode, 100);
}

const observer = new MutationObserver(() => {
    debouncedApply();
});
const mainContainer = document.querySelector('ytd-app') || document.body;
observer.observe(mainContainer, { subtree: true, childList: true });
