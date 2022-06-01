/*global chrome*/

import "./App.css";
import MainContainer from "./components/siteSound/MainContainer";
import Helper from "./components/help/Helper";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import { useState, useEffect } from "react";
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
  const [email, setEmail] = useState("");

  useEffect(() =>
    chrome.identity.getProfileUserInfo((profileUserInfo) =>
      setEmail(profileUserInfo.email)
    )
  );

  // useEffect(() => setEmail("kwakdh25@gmail.com"), []);

  return (
    <BrowserRouter>
      <M>
        <Sidebar />
        <Routes>
          <Route path="/index.html" element={<MainContainer email={email} />} />
          <Route path="/" element={<Spinner />} />
          <Route path="/audio" element={<AudioList email={email} />} />
          <Route
            path="/youtube"
            element={<YoutubeList email={email} />}
          ></Route>
          <Route path="/help" element={<Helper />}></Route>
        </Routes>
      </M>
    </BrowserRouter>
  );
};

export default App;
