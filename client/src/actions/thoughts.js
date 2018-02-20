export const addThought = (
	{
		text = ''
	} = {}
) => ({
	type: 'ADD_THOUGHT',
	thought: {
		text
	}
});

export const editThought = (id, updates) => ({
	type: 'EDIT_THOUGHT',
	updates
});

export const removeThought = ({ id }) => ({
	type: 'REMOVE_THOUGHT',
	id
});