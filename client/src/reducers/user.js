// user reducer
const userReducerDefaultState = {
  userName: '',
  email: ''
};

export default (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        userName: action.userName,
        email: action.email
      };
    case 'EDIT_USER':
      return {
        ...state.user,
        ...action.updates
      };
    default:
      return state;
  }
};