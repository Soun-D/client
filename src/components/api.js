import axios from "axios";

const host = "https://api.portfolist.kr";

export const siteSoundList = async (email) => {
  return axios.get(host + "/site-sound?email=" + email);
};

export const deleteSiteSound = (siteSoundId) => {
  return axios.delete(host + "/site-sound", {
    data: { id: siteSoundId },
  });
};

export const audioFileList = async (email) => {
  return axios.get(host + "/audio-file?email=" + email);
};

export const putSiteSound = async (siteSound) => {
  return axios.put(host + "/site-sound", siteSound);
};

export const deleteAudioFile = (audioFileId, email) => {
  return axios.delete(host + "/audio-file?email=" + email, {
    data: { id: audioFileId },
  });
};

export const postMp3 = (formData) => {
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
