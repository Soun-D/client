/*global chrome*/

export const playAudio = (type, src, len, visible, start) => {
  let url = chrome.runtime.getURL(`/audio/${type}.html`);

  url += `?src=${src}&len=${len * 1000}`;

  url += `&start=${start > 0 ? start : 1}`;

  chrome.windows.create({
    type: "popup",
    focused: false,
    top: 1,
    left: type === "youtube" && visible ? 1325 : 1785,
    height: visible ? 400 : 1,
    width: visible ? 600 : 1,
    url,
  });
};
