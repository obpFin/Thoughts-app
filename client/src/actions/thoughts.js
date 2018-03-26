import { apiUrl } from './../utils/utils';

export const FETCH_THOUGHTS_BEGIN = 'FETCH_THOUGHTS_BEGIN';
export const FETCH_THOUGHTS_SUCCESS = 'FETCH_THOUGHTS_SUCCESS';
export const FETCH_THOUGHTS_FAILURE = 'FETCH_THOUGHTS_FAILURE';
export const ADD_THOUGHT = 'ADD_THOUGHT';
export const EDIT_THOUGHT = 'EDIT_THOUGHT';
export const REMOVE_THOUGHT = 'REMOVE_THOUGHT';

export const fetchAllThoughts = () => {
	return dispatch => {
			dispatch(fetchThoughtsBegin());
		return fetch(`${apiUrl}/thoughts/all`)
			.then(handleErrors)
			.then((res => res.json()))
			.then(json => {
				dispatch(fetchThoughtsSuccess(json.thoughts));
				return json.thoughts;
			})
			.catch(error => dispatch(fetchThoughtsError(error)));
	};
};

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const fetchThoughtsBegin = () => ({
  type: FETCH_THOUGHTS_BEGIN
});

export const fetchThoughtsSuccess = thoughts => ({
  type: FETCH_THOUGHTS_SUCCESS,
  payload: { thoughts }
});

export const fetchThoughtsError = error => ({
  type: FETCH_THOUGHTS_FAILURE,
  payload: { error }
});

export const addThought = (
	{
		text = ''
	} = {}
) => ({
	type: ADD_THOUGHT,
	thought: {
		text
	}
});

export const editThought = (id, updates) => ({
	type: EDIT_THOUGHT,
	updates
});

export const removeThought = ({ id }) => ({
	type: 'REMOVE_THOUGHT',
	id
});