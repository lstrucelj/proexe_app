import * as actions from '../actions/actions'

export const initialState = [];

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_USERS:
            return action.payload;
        case actions.CREATE_USER:
            return [...state, action.payload];
        case actions.DELETE_USER:
            return state.filter((item) => item.id !== action.payload.id);

        case actions.UPDATE_USER:
            return state.map((user) => {
                if (user.id === action.payload.id) {
                    return {
                        ...user,
                        ...action.payload,
                    };
                } else {
                    return user;
                }
            });

        case actions.SORT_USERS:
            return state.slice().sort((a, b) => action.payload == 'asc' ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username));

        default:
            return state
    }
}
