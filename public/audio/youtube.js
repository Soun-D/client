onload = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  document.querySelector("body").innerHTML += urlParams.get("src");

  setTimeout(() => {
    close();
  }, urlParams.get("len"));
};
