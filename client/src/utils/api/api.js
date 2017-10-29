import axios from 'axios';
import { apiUrl } from './../utils';

//Session

const login = (credentials) => {
	var self = this;
	var user = {};
	axios.post(`${apiUrl}/users/login`, {
		email: credentials.email,
		password: credentials.password
	})
  .then(function (response) {
    console.log("headers",response);
    if (response.data.jwt) {
    	user = {
        loggedIn: true,
        userName: response.data.userName,
        jwt: response.data.jwt
  		};
  		sessionStorage.setItem('user', user);
    }
  })
  .catch(function (error) {
    console.log(error);
  });
  return true;
}

export { login };