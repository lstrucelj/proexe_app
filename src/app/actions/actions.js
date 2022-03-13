export const GET_USERS = 'GET USERS'
export const CREATE_USER = 'CREATE USER'
export const UPDATE_USER = 'UPDATE USER'
export const DELETE_USER = 'DELETE USER'
export const SORT_USERS = 'SORT USERS'


const BASE_URL = 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data';

export const getUsers = users => ({
    type: GET_USERS,
    payload: users,
})

export function fetchUsers() {
    return async dispatch => {
        try {
            const response = await fetch(BASE_URL)
            const data = await response.json();
            data.forEach((row) => row.city = row.address.city);
            data.sort((a, b) => a.username.localeCompare(b.username));
            dispatch(getUsers(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export const createUser = user => ({
    type: CREATE_USER,
    payload: user,
})

export function fetchCreateUser(user) {
    return async dispatch => {
        try {
            //new user
            user.id = Math.floor(Math.random() * 100);
            const response = await fetch(BASE_URL, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });

            const data = await response.json();
            dispatch(createUser(user))
        } catch (error) {
            console.log(error);
        }
    }
}


export const updateUser = user => ({
    type: UPDATE_USER,
    payload: user,
})

export function fetchUpdateUser(user) {
    return async dispatch => {
        try {
            const response = await fetch(BASE_URL + user.id, {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            const data = await response.json();
            dispatch(updateUser(user))
        } catch (error) {
            console.log(error);
        }
    }
}


export const deleteUser = user => ({
    type: DELETE_USER,
    payload: user,
})

export function fetchDeleteUser(user) {
    return async dispatch => {
        try {
            const response = await fetch(BASE_URL + user.id, {
                method: 'DELETE',
            })
            const data = await response.json();
            dispatch(deleteUser(user))
        } catch (error) {
            console.log(error);
        }
    }
}

export const sortUsers = sortDirection => ({
    type: SORT_USERS,
    payload: sortDirection,
})

