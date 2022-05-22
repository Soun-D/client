/*global chrome*/

import "./App.css";
import MainContainer from "./components/MainContainer";
import Helper from "./components/Helper";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  deleteSiteSound,
  audioFileList,
  siteSoundList,
} from "./components/api";
import AudioList from "./components/AudioList";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Spinner from "./components/Spinner";

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

  useEffect(() =>
    chrome.identity.getProfileUserInfo((profileUserInfo) =>
      setEmail(profileUserInfo.email)
    )
  );

  useEffect(() => {
    getUrls();
    getAudioFiles();
  }, [email, refresh]);

  useEffect(() => {
    setLoading(false);
  }, [audioFiles, siteSounds]);

  const dataRefresh = () => {
    setLoading(false);
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
                <Spinner></Spinner>
              ) : (
                <AudioList
                  audioList={audioFiles}
                  refresh={dataRefresh}
                  email={email}
                />
              )
            }
          />
          <Route path="/help" element={<Helper />}></Route>
        </Routes>
      </M>
    </BrowserRouter>
  );
};

export default App;
