import axios from "axios";
import queryString from "query-string";
import firebase from "firebase";

const getFirebaseToken = async () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) return currentUser.getIdToken();

  const hasRememberedAcocount = localStorage.getItem(
    "firebase:authUser:AIzaSyCxAyTMlTB2Rsbai1bnsPH"
  );
  if (!hasRememberedAcocount) return null;

  return new Promise((resolve, reject) => {
    const waitTime = setTimeout((resolve, reject) => {
      reject(null);
      console.log("Reject timeOut");
    }, 10000);

    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          reject(null);
        }

        const token = await user.getIdToken();
        console.log("Loged in user token", token);
        resolve(token);

        unregisterAuthObserver();
        clearTimeout(waitTime);
      });
  });
};

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// Thêm một bộ đón chặn request
axios.interceptors.request.use(
  async (config) => {
    // const currentUser = firebase.auth().currentUser;
    // if (currentUser) {
    //   const token = await currentUser.getIdToken();
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    const token = getFirebaseToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
axios.interceptors.response.use(
  (response) => {
    if (response && response.data) return response;
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error);
  }
);

export default axiosClient;
