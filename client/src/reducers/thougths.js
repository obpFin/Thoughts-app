const thoughtsReducerDefaultState = [];

export default (state = thoughtsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_THOUGHT':
      return [
        ...state,
        action.thought
      ];
    case 'REMOVE_THOUGHT':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_THOUGHT':
      return state.map((expense) => {
        if (expense.id === action.id) {
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
