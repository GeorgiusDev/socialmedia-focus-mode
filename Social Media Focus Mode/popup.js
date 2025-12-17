const ytToggle = document.getElementById("ytToggle");
const igToggle = document.getElementById("igToggle");

chrome.storage.local.get(
    { ytEnabled: true, igEnabled: true },
    data => {
        ytToggle.checked = data.ytEnabled;
        igToggle.checked = data.igEnabled;
    }
);

ytToggle.addEventListener("change", () => {
    chrome.storage.local.set({ ytEnabled: ytToggle.checked });
});

igToggle.addEventListener("change", () => {
    chrome.storage.local.set({ igEnabled: igToggle.checked });
});
