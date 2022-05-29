import axios from "axios";

const host = "https://api.portfolist.kr";

export const getSiteSoundList = async (email) => {
  return axios.get(host + "/site-sound?email=" + email);
};

export const deleteSiteSound = (siteSoundId) => {
  return axios.delete(host + "/site-sound", {
    data: { id: siteSoundId },
  });
};

export const getAudioList = async (email) => {
  return axios.get(host + "/audio-file?email=" + email);
};

export const getBothAudioList = async (email) => {
  return axios.get(host + "/audio-file/all?email=" + email);
};

export const getYoutubeList = async (email) => {
  return axios.get(host + "/youtube?email=" + email);
};

export const putSiteSound = async (siteSound) => {
  return axios.put(host + "/site-sound", siteSound);
};

export const deleteAudioFile = (audioFileId, email) => {
  return axios.delete(host + "/audio-file?email=" + email, {
    data: { id: audioFileId },
  });
};

export const postAudio = (formData) => {
  return axios.post(host + "/audio-file", formData, {
    config: {
      headers: {
        "Content-type": "multipart/form-data",
      },
    },
  });
};

export const postSiteSound = (siteSound) => {
  return axios.post(host + "/site-sound", siteSound);
};

export const postYoutube = (youtube) => {
  return axios.post(host + "/youtube", youtube);
};
