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
            playYoutube(ss.src, ss.play_time, ss.visible, ss.start);
          } else if (!ss.is_youtube) {
            playSound(ss.src, ss.play_time);
          }
        }
      });
    }
  });
});

const playYoutube = (src, closeTime, visible, start) => {
  let url = chrome.runtime.getURL("/audio/youtube.html");

  url += `?src=${src}&len=${closeTime * 1000}`;

  url += `&start=${start > 0 ? start : 1}`;

  chrome.windows.create({
    type: "popup",
    focused: false,
    top: 1,
    left: visible ? 1325 : 1785,
    height: visible ? 400 : 1,
    width: visible ? 600 : 1,
    url,
  });
};

const playSound = (src, closeTime) => {
  let url = chrome.runtime.getURL("/audio/audio.html");

  url += `?volume=1&src=${src}&length=${closeTime * 1000}`;

  chrome.windows.create({
    type: "popup",
    focused: false,
    top: 1,
    left: 1785,
    height: 1,
    width: 1,
    url,
  });
};
