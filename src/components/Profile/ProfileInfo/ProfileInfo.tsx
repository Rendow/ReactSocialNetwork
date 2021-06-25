import React, {useState} from "react";
import s from "./ProfileInfo.module.css";
import Logo from './../../Users/img/logo2.png';
import {ProfileType} from "../../../redux/propfile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatus/ProfileStatusWithHooks";
import {DragAndDrop} from "../../common/DragAndDrop/DragAndDrop";
import {ContentForm} from "./ContentForm/ContentForm";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus:(text:string) => void
    setPhoto:(file:string | Blob) => void
    isOwner:boolean
}

function ProfileInfo(props: PropsType) {

    const [editPhotoMode, setEditPhotoMode] = useState(false)
    const [editMode, setEditMode] = useState(false)

    if (!props.profile) return <Preloader/>;

    let photoSmall = props.profile.photos.small ? props.profile.photos.small  : Logo
    let photoLarge = props.profile.photos.large ? props.profile.photos.large : Logo

    let img = <img onDoubleClick={()=>{setEditPhotoMode(!editPhotoMode)}} className={s.img} src={photoLarge || photoSmall}/>

    return (
        <div>
            <div className={s.descriptionBlock}>
                <div>
                    {img}
                    <div>
                        {props.isOwner
                        && editPhotoMode
                        && <div style={{margin:'15px 0 0 30px'}}>
                            <DragAndDrop
                            setEditPhotoMode={setEditPhotoMode}
                            isOwner={props.isOwner}
                            setPhoto={props.setPhoto}/>
                        </div>
                        }
                    </div>
                </div>

                <div className={s.contentWrap}>
                    <div className={s.name}>{props.profile && props.profile.fullName}
                        <span>Double click on highlighted objects to edit your profile</span>
                    </div>

                    <div  className={s.fragmentWrap}>
                        <p> Status: </p> <ProfileStatusWithHooks  updateStatus={props.updateStatus} status={props.status}/>
                    </div>
                    { editMode
                        ? <ContentForm
                            setPhoto={props.setPhoto}
                            isOwner={props.isOwner}
                            profile={props.profile}
                            setEditMode={setEditMode}/>
                        : <Content
                            setEditMode={setEditMode}
                            setPhoto={props.setPhoto}
                            isOwner={props.isOwner}
                            profile={props.profile}/>
                    }
                    <div className={s.textBlock}>
                        <div className={s.description}>Do you know that Falcon 9 is a reusable, two-stage rocket
                            manufactured by SpaceX for the reliable and safe transport of people and
                            payloads into Earth orbit and beyond? Now you know.
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}


export type ContentType = {
    profile: ProfileType | null
    setPhoto:(file:string | Blob) => void
    isOwner:boolean
    setEditMode: (value:boolean) => any
}
const Content = (props:ContentType) => {

    return   <div>

        {props.isOwner && <button onClick={()=> {props.setEditMode(true)}}> edit</button>}


        <div  className={s.fragmentWrap}>
            <p> aboutMe: </p> <p>{props.profile?.aboutMe}</p>
        </div>

        <div  className={s.fragmentWrap}>
            {props.profile?.lookingForAJob &&
            <>
                <p> lookingForAJobDescription: </p>
                <p>{props.profile?.lookingForAJobDescription || 'lookingForAJobDescription'}</p>
            </>}
        </div>
        <div  className={s.fragmentWrap} >
            <p> Contacts:  {
                Object.entries(props.profile?.contacts ? props.profile?.contacts : {})
                    .map((key,value) => {
                        return   <div key={value} className={s.fragmentWrap} style={{flexFlow:"column",marginLeft:'20px'}}>
                            <p> {key[0]}: </p> <p>{key[1]}</p>
                        </div>
                    })}</p>
        </div>

    </div>
}





export default ProfileInfo;