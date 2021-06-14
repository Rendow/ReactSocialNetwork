import React from 'react';
import {connect} from "react-redux";
import {ReduxStateType} from "../../redux/redux-store";
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
} from "../../redux/users-reducer";

import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {Preloader} from "../common/Preloader/Preloader";
import {Users} from "./Users";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersPage, portionSize
} from "../../redux/users-selectors";


export type mapStateToPropsType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount:number
    currentPage: number
    isFetching:boolean
    followingInProgress:number[]
    portionSize:number
}
export type dispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    getUsers:(pageSize: number, currentPage: number)  => void
    getPage:(pageNumber: number, currentPage: number)  => void
}

type UsersPropsType = mapStateToPropsType & dispatchToPropsType

class UsersContainer extends React.Component <UsersPropsType,{}>{

    componentDidMount() {
        const {currentPage,pageSize} =  this.props
        this.props.getUsers(currentPage,pageSize)
    }
    onPageChanged = (pageNumber:number) => {
        const {pageSize} =  this.props
        this.props.getPage(pageNumber,pageSize)
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
            followingInProgress={this.props.followingInProgress}
            portionSize={this.props.portionSize}
        />
        </>
    }
}

let mapStateToProps = (state: ReduxStateType):mapStateToPropsType => {
    return {
        users: getUsersPage(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        portionSize: portionSize(state),
        followingInProgress:getFollowingInProgress(state)
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps,
    {follow, unFollow, setUsers,
        setCurrentPage, setTotalUsersCount, toggleIsFetching,
        toggleIsFollowingProgress,getUsers, getPage}), WithAuthRedirect)(UsersContainer)