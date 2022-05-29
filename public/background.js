chrome.identity.getProfileUserInfo(async (profileUserInfo) => {
  const email = profileUserInfo.email;
  const host = "https://api.portfolist.kr";

  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const response = await fetch(host + "/site-sound/split?email=" + email, {
      mode: "cors",
    });
    const siteSoundList = await response.json();
    if (changeInfo.status == "loading") {
      siteSoundList.forEach((ss) => {
        if (changeInfo.url == ss.url) {
          if (ss.is_youtube) {
            playYoutube(ss.src, ss.play_time);
          } else if (!ss.is_youtube) {
            playSound(ss.src, ss.play_time);
          }
        }
      });
    }
  });
});

const playYoutube = (src, closeTime) => {
  let url = chrome.runtime.getURL("/audio/youtube.html");

    url += `?src=${src}&len=${closeTime}`

    chrome.windows.create({
      type: "popup",
      focused: false,
      top: 1,
      left: 1,
      height: 400,
      width: 600,
      url,
    });
}

const playSound = (src, closeTime) => {
  let url = chrome.runtime.getURL("/audio/audio.html");

  url += `?volume=1&src=${src}&length=${closeTime}`;

  chrome.windows.create({
    type: "popup",
    focused: false,
    top: 1,
    left: 1,
    height: 1,
    width: 1,
    url,
  });
}
