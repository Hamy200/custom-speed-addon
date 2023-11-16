

function setPlaybackSpeed(custom_speed = 0) {
    const video = document.querySelector('video');
    let speed = custom_speed || window.localStorage.getItem("playbackSpeed")
    for (let i = 0; i < 1000; i++)
    {
        console.log(i)
    }
    if (video) {
        video.playbackRate = custom_speed
        
    }



}




browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("ISDJIOEDJIOJAW")
    if (message.action === 'setPlaybackSpeed') {
        browser.runtime.sendMessage({ action: 'setPlaybackSpeed', custom_speed: message.custom_speed })
        .then(()=>console.log("DONEEE"))
       
        
    
    }
  });