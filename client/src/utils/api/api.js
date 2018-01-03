import axios from 'axios';
import { apiUrl } from './../utils';

//Session

const token = () => {
  const user = sessionStorage.getItem('user')
  console.log("user",user);
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
      console.log("asd",token());

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

export { login, logOut };