import axios from 'axios';
import { apiUrl } from './../utils';

//Session
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

export { login };