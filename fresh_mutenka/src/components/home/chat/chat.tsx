"use client"
import  { useState } from "react";

type ConversationType = {
  user:string;
  chatgpt:string;
}

export default function Chat() {
  const [userText, setUserText] = useState("");

  const [messages, setMessages] = useState<ConversationType[]>([]);


  
  const onClickAddText = () => {
    setMessages([...messages, {user:userText, chatgpt:""}]);
    setUserText("");
  }

  return (
    <div>
        <div>
            {messages.map((message,index)=>(
                <p key={index}>You: {message.user}</p>
            ))}
        </div>
        <div>

        </div>
        <input value={userText} type="text" onChange={(event)=>setText(event.target.value)}></input>
        <button onClick={onClickAddText}></button>
    </div>
  );
};