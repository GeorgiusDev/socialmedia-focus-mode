chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(
        { ytEnabled: true, igEnabled: true },
        data => {
            chrome.storage.local.set(data);
        }
    );
});
