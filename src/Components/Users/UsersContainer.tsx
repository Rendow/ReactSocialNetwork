import React from 'react';
import {connect} from "react-redux";
import {ReduxStateType} from "../../Redux/redux-store";
import {
    follow,
    getPage,
    getUsers,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    toggleIsFollowingProgress, unFollow,
    UsersType
} from "../../Redux/users-reducer";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


export type mapStateToPropsType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount:number
    currentPage: number
    isFetching:boolean
    followingInProgress:number[]
}
export type dispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    toggleIsFollowingProgress:(followingInProgress: boolean, userId:number) => void
    getUsers:(pageSize: number, currentPage: number)  => void
    getPage:(pageNumber: number, currentPage: number)  => void
}

type UsersPropsType = mapStateToPropsType & dispatchToPropsType

class UsersContainer extends React.Component <UsersPropsType,{}>{

    componentDidMount() {
        this.props.getUsers(this.props.currentPage,this.props.pageSize)
    }
    onPageChanged = (pageNumber:number) => {
        this.props.getPage(pageNumber,this.props.pageSize)

    }

    render(){
        return <>
            {this.props.isFetching ? <Preloader/> : ''}
            <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            follow={this.props.follow}
            unFollow={this.props.unFollow}
            toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
            followingInProgress={this.props.followingInProgress}
        />
        </>
    }
}

let mapStateToProps = (state: ReduxStateType):mapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress:state.usersPage.followingInProgress
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps,
    {follow, unFollow, setUsers,
        setCurrentPage, setTotalUsersCount, toggleIsFetching,
        toggleIsFollowingProgress,getUsers, getPage}), WithAuthRedirect)(UsersContainer)
