"use client"
import { useEffect } from "react";
import  { useState } from "react";
import {getResponse} from "../../../pages/api/chat"

type ConversationType = {
  user:string;
  chatgpt:string;
}

export default function Chat() {
  const [userText, setUserText] = useState("");
  const [messages, setMessages] = useState<ConversationType[]>([]);
  
  useEffect(() => {
    getResponse().then(data=>{
      const formattedData = data.map(item=>)
    })
  },[])
  
  const onClickAddText = async () => {
    setMessages([...messages, {user:userText, chatgpt:""}]);
    setUserText("");
     await getResponse();
    
    
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