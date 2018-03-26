import {
  FETCH_THOUGHTS_BEGIN,
  FETCH_THOUGHTS_SUCCESS,
  FETCH_THOUGHTS_FAILURE,
  ADD_THOUGHT,
  EDIT_THOUGHT,
  REMOVE_THOUGHT

} from '../actions/thoughts';

const initialState = {
  thoughts: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THOUGHTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_THOUGHTS_SUCCESS:
      return {
        ...state,
        loading: false,
        thoughts: action.payload.thoughts
      };
    case FETCH_THOUGHTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        thoughts: []
      };
    case ADD_THOUGHT:
      return [
        ...state,
        action.thought
      ];
    case REMOVE_THOUGHT:
      return state.filter(({ id }) => id !== action.id);
    case EDIT_THOUGHT:
      return state.map((thought) => {
        if (thought.id === action.id) {
          return {
            ...thought,
            ...action.updates
          };
        } else {
          return thought;
        };
      });
    default:
      return state;
  }
};
