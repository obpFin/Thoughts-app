import axios from 'axios';
import { apiUrl } from './../utils';

//Session

const token = () => {
  const user = sessionStorage.getItem('user')
  if (user) {
    return JSON.parse(user).jwt;
  }
  return null;
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
      console.log(error);
    });
  });
}

const logOut = () => {
  if (sessionStorage.getItem('user')) {
    //sessionStorage.removeItem('user');
    let jwt = token()
    return axios.delete(`${apiUrl}/users/me/token`, {
      headers: {
        'x-auth': jwt 
      }
    })
    .then((response) => {
      return token();
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
      console.log("response",error);
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
      reject(error);
    });
  });
};

export { login, logOut, allThoughts, userInfo };