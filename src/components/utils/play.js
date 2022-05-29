/*global chrome*/

export const playAudio = (type, src, len) => {
  let url = chrome.runtime.getURL(`/audio/${type}.html`);

  url += `?src=${src}&len=${len}`;

  chrome.windows.create({
    type: "popup",
    focused: false,
    top: 1,
    left: 1,
    height: 400,
    width: 600,
    url,
  });
};
