const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';


export type UsersType = {
    id: number
    photoUrl: string
    followed: boolean
    name: string
    status: string
    photos: {
        small: string
        large: string
    }
    location: {
        city: string
        country: string
    }
}


export type DispatchType = FollowActionType | UnFollowActionType | SetUsersActionType | setCurrentPageActionType | setUsersTotalCountActionType | setIsFetchingACActionType

type FollowActionType = ReturnType<typeof follow>
type UnFollowActionType = ReturnType<typeof unfollow>
type SetUsersActionType = ReturnType<typeof setUsers>
type setCurrentPageActionType = ReturnType<typeof setCurrentPage>
type setUsersTotalCountActionType = ReturnType<typeof setTotalUsersCount>
type setIsFetchingACActionType = ReturnType<typeof toggleIsFetching>


let initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching:false,
}

export type InitialStateType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching:boolean
}

export const usersReducer = (state: InitialStateType = initialState, action: DispatchType): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS: {
            return {...state, users: [...action.users]}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        default:
            return state
    }
}


export const follow = (id: number) => {
    return {
        type: FOLLOW, userID: id
    } as const
}

export const unfollow = (id: number) => {
    return {
        type: UNFOLLOW, userID: id
    } as const
}
export const setUsers = (users: UsersType[]) => {
    return {
        type: SET_USERS, users: users
    } as const
}
export const setCurrentPage = (page: number) => {
    return {
        type: SET_CURRENT_PAGE, currentPage: page
    } as const
}
export const setTotalUsersCount = (count: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT, totalCount: count
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING, isFetching
    } as const
}