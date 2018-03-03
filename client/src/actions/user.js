export const setUser = (
	{
    userName = '',
    email = ''
	} = {}
) => ({
	type: 'SET_USER',
	thought: {
    userName,
    email
	}
});

export const editUser = (updates) => ({
	type: 'EDIT_USER',
	updates
});