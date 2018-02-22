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
	return axios.post(`${apiUrl}/users/login`, {
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
  		return response.data.user.userName;
    }
  })
  .catch(function (error) {
  	return Promise.reject();
    console.log(error);
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
    .then(function (response) {
      return token();
    })
    .catch(function (error) {
      return Promise.reject();
      console.log(error);
    });
  }
}

const allThoughts = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/thoughts/all`)
    .then(function (response) {
      resolve(response.data.thoughts);
    })
    .catch(function (error) {
      console.log("response",error);
      reject(error);
    });
  });
};

const profileThoughts = () => {
  var self = this;
  let jwt = token()
  console.log(jwt);
  axios.get(`${apiUrl}/users/me`, {
    headers: {
      'x-auth': jwt 
    }
  })
  .then(function (response) {
    console.log(response);
    // self.setState({
    //   thoughts: response.data.thoughts
    // });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export { login, logOut, allThoughts, profileThoughts };