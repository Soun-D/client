const urlPatterns = [
  "https://www.google.com/?safe=active&ssui=on",
  "https://www.naver.com/",
];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // console.log(changeInfo.status + " " + changeInfo.url);

  if (changeInfo.status == "loading") {
    urlPatterns.forEach((url) => {
      if (changeInfo.url == url) {
        playSound();
        console.log("SUCCESS");
      }
    });
  }
});

function playSound() {
  let url = chrome.runtime.getURL("/audio/audio.html");

  // set this string dynamically in your code, this is just an example
  // this will play success.wav at half the volume and close the popup after a second
  url += "?volume=1&src=/audiofiles/winter-I-miss-you.mp3&length=5000";

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
