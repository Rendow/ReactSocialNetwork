import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from './Message/Message';
import {DialogsMapDispatchToPropsType, DialogsMapStateToPropsType} from "./DialogsContainer";
import {Button, TextField} from "@material-ui/core";


export type DialogType = DialogsMapStateToPropsType & DialogsMapDispatchToPropsType

function Dialogs(props: DialogType) {

    let dialogsElements = props.dialogsPage.dialogs.map(dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>)
    let messagesElements = props.dialogsPage.messages.map(message => <Message key={message.id} message={message.messages}/>)
    let newPostElement = React.createRef<HTMLDivElement>()

    let newMessageBody = props.dialogsPage.newMessageBody

    let updateNewMessageBody = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let text = event.currentTarget.value
        props.updateNewMessageBody(text)
    }
    let sendMessage = () => {
        props.sendMessage()
        debugger
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                    <div>
                        <TextField
                            variant={"outlined"}
                            color={"primary"}
                            style={{margin: '10px 0'}}
                            onChange={updateNewMessageBody}
                            value={newMessageBody}
                            ref={newPostElement}> </TextField>
                    </div>
                    <div>
                        <Button
                            color={"primary"}
                            variant={"contained"}
                            style={{margin:'5px 0'}}
                            disabled={newMessageBody === ''}
                            onClick={sendMessage}> Send message
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dialogs











