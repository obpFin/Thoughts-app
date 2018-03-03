// user reducer
const userReducerDefaultState = {
  userName: '',
  email: ''
};

export default (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_USER_USERNAME':
      return {
        ...state,
        userName: action.userName
      };
    case 'SET_USER_EMAIL':
    return {
      ...state,
      userName: action.email
    };
    default:
      return state;
  }
};