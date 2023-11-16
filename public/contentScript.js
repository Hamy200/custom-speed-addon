
function setPlaybackSpeed(custom_speed = 1) {
    const video = document.querySelector('video');
    if (video) {
        video.playbackRate = custom_speed
        
    }



}

function observeDOM() {
    const targetNode = document.documentElement;

    const observerOptions = {
        childList: true,
        subtree: true,
    };

    const observer = new MutationObserver(() => {
        setPlaybackSpeed(parseFloat(localStorage.getItem("playbackSpeed")));
    });

    observer.observe(targetNode, observerOptions);
}

setPlaybackSpeed(parseFloat(localStorage.getItem("playbackSpeed"))||1)
window.addEventListener('popstate', ()=>setPlaybackSpeed(parseFloat(localStorage.getItem("playbackSpeed"))||1));
observeDOM();

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    setPlaybackSpeed(message.custom_speed)
    window.localStorage.setItem("playbackSpeed", message.custom_speed)
  });

