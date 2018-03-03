import axios from 'axios';
import { apiUrl } from './../utils';

//Session

const token = () => {
  const user = sessionStorage.getItem('user')
  if (user) {
    return JSON.parse(user).jwt;
  } else {
    return null;
  }
}

const getUser = () => {
  const user = sessionStorage.getItem('user')
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
}

const login = (credentials,loginSucceed) => {
	var self = this;
  return new Promise((resolve, reject) => {
    axios.post(`${apiUrl}/users/login`, {
      email: credentials.email,
      password: credentials.password
    })
    .then(function (response) {
      if (response.data.token) {
        sessionStorage.setItem('user', JSON.stringify({
          loggedIn: true,
          userName: response.data.user.userName,
          jwt: response.data.token
        }));
        resolve(response.data.user);
      }
    })
    .catch((error) => {
      reject(error);
      console.error(error);
    });
  });
}

const logOut = () => {
  if (sessionStorage.getItem('user')) {
    let jwt = token()
    return axios.delete(`${apiUrl}/users/me/token`, {
      headers: {
        'x-auth': jwt 
      }
    })
    .then((response) => {
      sessionStorage.removeItem('user');
      if (sessionStorage.getItem('user')) {
        console.error("logout failed");
        return Promise.reject();
      }
      return true;
    })
    .catch((error) => {
      return Promise.reject();
      console.log(error);
    });
  }
}

const allThoughts = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/thoughts/all`)
    .then((response) => {
      resolve(response.data.thoughts);
    })
    .catch(function (error) {
      console.error("response",error);
      reject(error);
    });
  });
};

const userInfo = () => {
  let jwt = token();
  return new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/users/me`, {
      headers: {
        'x-auth': jwt 
      }
    })
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      console.warn(error);
      reject(error);
    });
  });
};

const isLoggedIn = () => {
  if(token()) {
    return true;
  }
  return false;
}

export { getUser, login, logOut, allThoughts, userInfo, isLoggedIn };