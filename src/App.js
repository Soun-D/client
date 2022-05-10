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
  const [email, setEmail] = useState();
  const [siteSounds, setSiteSounds] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const host = "http://localhost:8080";

  // useEffect(() =>
  //   chrome.identity.getProfileUserInfo((profileUserInfo) =>
  //     setEmail(profileUserInfo.email)
  //   )
  // );

  useEffect(() => {
    setEmail("kwakdh25@gmail.com");
  }, []);

  useEffect(() => {
    getUrls();
    getAudioFiles();
    console.log(dataRefresh);
  }, [email, refresh]);

  const dataRefresh = () => {
    setRefresh(!refresh);
    console.log('refresh');
    // window.location.reload(false);
  };

  const getUrls = async () => {
    const response = await axios.get(host + "/site-sound?email=" + email);
    setSiteSounds(response.data);
  };

  const onRemove = (siteSoundId) => {
    setSiteSounds(
      siteSounds.filter((siteSound) => siteSound.id !== siteSoundId)
    );
    axios
      .delete(host + "/site-sound", {
        data: { site_sound_id: siteSoundId },
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAudioFiles = async () => {
    axios.get(host + "/audio-file?email=" + email).then((response) => {
      setAudioFiles(response.data);
    });
  };
  return (
    <M>
      <Sidebar />
      <MainContainer
        SiteSoundItems={siteSounds}
        audioFiles={audioFiles}
        onRemove={onRemove}
        refresh={dataRefresh}
      />
    </M>
  );
}

export default App;
