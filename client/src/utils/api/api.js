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
    .then((response) => {
      if (response.status === 200 && response.data.token) {
        sessionStorage.setItem('user', JSON.stringify({
          loggedIn: true,
          userName: response.data.user.userName,
          jwt: response.data.token,
          _id:response.data.user._id
        }));
        resolve(response.data.user);
      }
    })
    .catch((error) => {
      console.error(error);
      reject(error);
    });
  });
}

const logOut = () => {
  if (isLoggedIn()) {
    let jwt = token()
    return new Promise((resolve,reject) => {
      axios.delete(`${apiUrl}/users/me/token`, {
        headers: {
          'x-auth': jwt 
        }
      })
      .then((response) => {
        sessionStorage.removeItem('user');
        if (response.status === 200 && !sessionStorage.getItem('user')) {
          resolve(response);
        } else {
          console.error("session removal failed");
          return Promise.reject();
        }
      })
      .catch((error) => {
        console.error("logout failed");
        return Promise.reject();
      });
    });
  }
}

const createAccount = (user) => {
  return new Promise((resolve,reject) => {
    axios.post(`${apiUrl}/users`, user)
    .then((user) => {
      if (user) {
        resolve(user);
      }
    }).catch((error) => {
      console.error(error);
      reject(error);
    });
  });
}

const updateUser = (userName,email) => {
  let jwt = token();
  let user = getUser();
  return new Promise((resolve, reject) => {
    axios.patch(`${apiUrl}/users/${user._id}`,
    {
      userName,
      email
    },{
      headers: {
        'x-auth': jwt 
      },
    })
    .then((response) => {
      if (response) {
        resolve(response);
      }
    }).catch((error) => {
      console.error(error);
      reject(error);
    });
  })  
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

export { getUser, login, logOut, createAccount, updateUser, allThoughts, userInfo, isLoggedIn };