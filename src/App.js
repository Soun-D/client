/*global chrome*/

import "./App.css";
import MainContainer from "./components/MainContainer";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import { useState } from "react";

const M = styled.div`
  height: 340px;
  width: 610px;
  display: flex;
  border: solid 2px black;
`;

function App() {
  const [data, setData] = useState([]);

  // chrome.identity.getProfileUserInfo((profileUserInfo) =>
  //   getUrls(profileUserInfo)
  // );

  getUrls({email: "kwakdh25@gmail.com"});

  async function getUrls(profileUserInfo) {
    const url = "http://localhost:8080/site-sound";
    const email = profileUserInfo.email;

    fetch(url + "?email=" + email, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((appData) => {
        setData(appData);
      });
  }

  return (
    <M>
      <Sidebar />
      <MainContainer ssItems={data} />
    </M>
  );
}

export default App;
