"use client"
import { useEffect } from "react";
import useSWR from "swr";
import  { useState } from "react";
import {getResponse} from "../../../pages/api/chat"
import { testMethod } from "../../../pages/api/chat";

const fetcher = (url:string) => fetch(url).then(r => r.json())
const user_id = "7677e7cd-f1bc-4124-a42d-e80f5da3fedd"

type ConversationType = {
  user:string;
  chatgpt:string;
}

export default function Chat() {
   const goalCreateApi = ()=> {
        const { data, error } = useSWR(`/api/goal/create/${user_id}`, fetcher)
        console.log(data);
      return data
   }
  //  goalCreateApi();

  const [userText, setUserText]   = useState("");
  const [messages, setMessages] = useState<ConversationType[]>([]);
  
  const onClickAddText = async () => {
    const res = await getResponse(userText);
    if (res?.includes("おめでとう") ) {
      await testMethod();
    }
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