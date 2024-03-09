"use client"
import { useEffect } from "react";
import  { useState } from "react";
import {getResponse} from "../../../pages/api/chat"


type ConversationType = {
  user:string;
  chatgpt:string;
}

export default function Chat() {
  const [userText, setUserText]   = useState("");
  const [messages, setMessages] = useState<ConversationType[]>([]);
  
  const onClickAddText = async () => {
    const res = await getResponse(userText);
    setMessages([...messages, {user:userText, chatgpt:res !== null ? res : ""}]);
    setUserText("")
  }
  return (
    <div>
        <div>
            {messages.map((message,index)=>{
              return (
                <div>
                  <div>
                    <p key={index}>You</p>
                    <p>{message.user}</p>
                  </div>

                  <div>
                    <p>Chat</p>
                    <p>{message.chatgpt}</p>
                  </div>
                </div>

              );
            })}
        </div>
        <div>

        </div>
        <input value={userText} type="text" onChange={(event)=>setUserText(event.target.value)}></input>
        <button onClick={onClickAddText}></button>
    </div>
  );
};