onload = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const src = urlParams.get("src");

  document.querySelector("body").innerHTML += src;

  const start = urlParams.get("start");

  if (start) {
    const iframe = document.querySelector("iframe");
    const youtubeSrc = iframe.getAttribute("src").concat("&start=", start);
    iframe.setAttribute("src", youtubeSrc);
  }

  setTimeout(() => {
    close();
  }, urlParams.get("len"));
};
