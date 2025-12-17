const selectors = [
    'a[href^="/reels"]',
    'a[href^="/explore"]',
    'a[href^="/reels/"]',
    'a[href^="/explore/"]'
]

let enabled = true;


function applyIGFocus(){
    if (!enabled) {
        document.body.classList.remove("focus-mode");
        document.querySelectorAll('.ig-focus-hide').forEach(el => el.classList.remove('ig-focus-hide'));
        return;
    }

    document.body.classList.add("focus-mode");
    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.classList.add('ig-focus-hide'));
    });
    
    if (location.pathname.startsWith("/reels") || location.pathname.startsWith("/explore") || location.pathname.startsWith("/reel") || location.pathname.startsWith("/p")) {
        history.replaceState({}, "", "/");
        location.reload();
    }
}

chrome.storage.local.get({ igEnabled: true }, data => {
    enabled = data.igEnabled;
    applyIGFocus();
});

chrome.storage.onChanged.addListener(changes => {
    if(changes.igEnabled){
        enabled = changes.igEnabled.newValue;
        applyIGFocus();
    }
});

let applyTimeout;

function debouncedApply(){
    if(!enabled) return;
    clearTimeout(applyTimeout);
    applyTimeout = setTimeout(applyIGFocus, 100);
}

const observer = new MutationObserver(debouncedApply);
const mainContainer = document.body;
observer.observe(mainContainer, { subtree: true, childList: true });
