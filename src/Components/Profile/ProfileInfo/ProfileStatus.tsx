import s from "./ProfileInfo.module.css";
import React from "react";


export class ProfileStatus extends React.Component <any> {
    state = {
        editMode: false
    }
    activateEditMode = () => {
     this.setState({
        editMode:true
    })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode:false
        })
    }
    render() {
        return <div>
            {!this.state.editMode &&
            <div>
                <span onDoubleClick={this.activateEditMode}> sdasd</span>
            </div>}
            {this.state.editMode &&
            <div>
                <input autoFocus={true} onBlur={this.deactivateEditMode} type="text" value={'sadasd'}/>
            </div>}
        </div>
    }

}