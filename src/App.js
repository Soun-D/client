/*global chrome*/

import "./App.css";
import MainContainer from "./components/siteSound/MainContainer";
import Helper from "./components/help/Helper";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  deleteSiteSound,
  audioFileList,
  siteSoundList,
} from "./components/utils/api";
import AudioList from "./components/audio/AudioList";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Spinner from "./components/utils/Spinner";
import YoutubeList from "./components/youtube/YoutubeList";

const M = styled.div`
  height: 400px;
  width: 640px;
  display: flex;
  border: solid 2px black;
`;

const App = () => {
  const [email, setEmail] = useState();
  const [siteSounds, setSiteSounds] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() =>
  //   chrome.identity.getProfileUserInfo((profileUserInfo) =>
  //     setEmail(profileUserInfo.email)
  //   )
  // );

  useEffect(() => setEmail("kwakdh25@gmail.com"));

  useEffect(() => {
    getUrls()
      .then(() => getAudioFiles())
      .then(() => setLoading(false));
  }, [email, refresh]);

  const dataRefresh = () => {
    setRefresh(!refresh);
  };

  const getUrls = async () => {
    const response = await siteSoundList(email);
    setSiteSounds(response.data);
  };

  const onRemove = (siteSoundId) => {
    deleteSiteSound(siteSoundId).then(() =>
      setSiteSounds(
        siteSounds.filter((siteSound) => siteSound.id !== siteSoundId)
      )
    );
  };

  const getAudioFiles = async () => {
    const response = await audioFileList(email);
    setAudioFiles(response.data);
  };

  const playYoutube = () => {
    let url = chrome.runtime.getURL("/audio/youtube.html");

    chrome.windows.create({
      type: "popup",
      focused: false,
      top: 100,
      left: 100,
      height: 400,
      width: 600,
      url,
    });
  };

  return (
    <BrowserRouter>
      <M>
        <Sidebar />
        <Routes>
          <Route
            path="/index.html"
            element={
              loading ? (
                <Spinner />
              ) : (
                <>
                  <MainContainer
                    SiteSoundItems={siteSounds}
                    audioFiles={audioFiles}
                    onRemove={onRemove}
                    refresh={dataRefresh}
                  />
                  <button onClick={playYoutube}></button>
                </>
              )
            }
          />
          <Route
            path="/"
            element={
              loading ? (
                <Spinner />
              ) : (
                <MainContainer
                  SiteSoundItems={siteSounds}
                  audioFiles={audioFiles}
                  onRemove={onRemove}
                  refresh={dataRefresh}
                />
              )
            }
          />
          <Route
            path="/audio"
            element={
              loading ? (
                <Spinner />
              ) : (
                <AudioList
                  audioList={audioFiles}
                  refresh={dataRefresh}
                  email={email}
                />
              )
            }
          />
          <Route path="/youtube" element={<YoutubeList />}></Route>
          <Route path="/help" element={<Helper />}></Route>
        </Routes>
      </M>
    </BrowserRouter>
  );
};

export default App;
