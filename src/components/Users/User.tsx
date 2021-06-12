import React from 'react';
import s from "./Users.module.css";
import logo from "./img/logo2.png";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import SuperButton from "../common/FormsControl/SuperButton";

type UserPropsType = {
    users: UsersType
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    followingInProgress:number[]
}

export const User: React.FC<UserPropsType> = ({users,...props}) => {
    return (
        <div style={{marginBottom:'8px'}}>
            <span>
                    <div>
                        <NavLink to={'/profile/' + users.id}>
                            <img src={users.photos.small != null ? users.photos.small : logo} className={s.photo}/>
                        </NavLink>
                </div>
                    <div>

                        {  users.followed
                        ? <SuperButton
                                style={{letterSpacing:'1px', fontSize:'14px'}}
                                      disabled={props.followingInProgress.some(id => id === users.id)}
                                      onClick={() => {props.unFollow(users.id)}}>
                            UNFOLLOW
                        </SuperButton>
                            : <SuperButton  style={{letterSpacing:'1px', fontSize:'14px'}}
                                            disabled={props.followingInProgress.some(id => id === users.id)}
                                            onClick={() => {props.follow(users.id)}}>
                                FOLLOW
                            </SuperButton>
                        }

                    </div>
                </span>
                <span>
                    <span>
                        <div> {users.name}</div>
                        <div> {users.status}</div>
                    </span>
                    <span>
                         <div>{'u.location.country'}</div>
                         <div>{'u.location.city'}</div>
                    </span>
                </span>
        </div>

)}