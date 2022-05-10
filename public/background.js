chrome.identity.getProfileUserInfo(async (profileUserInfo) => {
  const email = profileUserInfo.email;
  const host = "http://localhost:8080";
  const response = await fetch(host + "/site-sound?email=" + email);
  const siteSoundList = await response.json();

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // console.log(changeInfo.status + " " + changeInfo.url);

    if (changeInfo.status == "loading") {
      siteSoundList.forEach((ss) => {
        if (changeInfo.url == ss.url)
          playSound(ss.file_location);
      });
    }
  });
});

function playSound(src) {
  let url = chrome.runtime.getURL("/audio/audio.html");

  // set this string dynamically in your code, this is just an example
  // this will play success.wav at half the volume and close the popup after a second
  url += `?volume=1&src=${src}&length=5000`;

  chrome.windows.create({
    type: "popup",
    focused: false,
    top: 1,
    left: 1928,
    height: 1,
    width: 1,
    url,
  });
}
