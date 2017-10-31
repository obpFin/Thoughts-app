import axios from 'axios';
import { apiUrl } from './../utils';

//Session

const login = (credentials,loginSucceed) => {
	var self = this;
	//var loginSucceed;
	var user = {};
	return axios.post(`${apiUrl}/users/login`, {
		email: credentials.email,
		password: credentials.password
	})
  .then(function (response) {
  	console.log("response",response);
    if (response.data.token) {
    	user = {
        loggedIn: true,
        userName: response.data.userName,
        jwt: response.data.jwt
  		};
  		sessionStorage.setItem('user', user);
  		console.log("got user ",sessionStorage.getItem('user'));
  		loginSucceed = true;
  		return true;
    }
  })
  .catch(function (error) {
  	return Promise.reject();
  	loginSucceed = false;
    console.log(error);
  });
}

export { login };