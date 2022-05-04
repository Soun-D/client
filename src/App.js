/*global chrome*/

import "./App.css";
import MainContainer from "./components/MainContainer";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const M = styled.div`
  height: 340px;
  width: 610px;
  display: flex;
  border: solid 2px black;
`;

function App() {
  const [siteSounds, setSiteSounds] = useState([]);

  useEffect(() => {
    getUrls({ email: "kwakdh25@gmail.com" });
  }, [siteSounds]);

  const onRemove = (siteSoundId) => {
    setSiteSounds(
      siteSounds.filter((siteSound) => siteSound.id != siteSoundId)
    );
  };

  // useEffect(() => {
  //   chrome.identity.getProfileUserInfo((profileUserInfo) =>
  //     getUrls(profileUserInfo)
  //   );
  // }, [data]);

  const getUrls = async (profileUserInfo) => {
    const url = "http://localhost:8080/site-sound";
    const email = profileUserInfo.email;

    axios.get(url + "?email=" + email).then((response) => {
      setSiteSounds(response.data);
    });
  };

  return (
    <M>
      <Sidebar />
      <MainContainer SiteSoundItems={siteSounds} onRemove={onRemove} />
    </M>
  );
}

export default App;
