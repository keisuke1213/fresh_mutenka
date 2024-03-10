"use client"
import styles from './chat.module.css'
import { useEffect, useRef } from "react";
import useSWR from "swr";
import  { useState } from "react";
import {getResponse} from "../../../pages/api/chat"


const fetcher = (url: string) => fetch(url).then(r => r.json())
const user_id = "7677e7cd-f1bc-4124-a42d-e80f5da3fedd"

type ConversationType = {
  user: string;
  chatgpt: string;
}

export default function Chat() {
   const goalCreateApi = ()=> {
        const { data, error } = useSWR(`/api/goal/create/${user_id}`, fetcher)
        console.log(data);
      return data
   }
  //  goalCreateApi();

  const [userText, setUserText] = useState("");
  const [messages, setMessages] = useState<ConversationType[]>([]);
  const { data, error, mutate } = useSWR(`/api/goal/getCurrentGoal/${user_id}`, fetcher)

  function getGoalId() {
    const sub_goal_id = data.goals[0].id
    console.log("サブゴール", sub_goal_id);
    return sub_goal_id
  }


  const onClickAddText = async () => {
    const res = await getResponse(userText);
    console.log("くりっく");
    mutate();

    if (res?.includes("おめでとう")) {

      getGoalId();
      // const getSubGoalId = (sub_goal_id:string) =>{
      //   getGoalId();
      //   const { data, error } = useSWR(`/api/goal/getCurrentGoal/${sub_goal_id}`, fetcher)
      //   return data
      // }
      // getSubGoalId(sub_goal_id);
    }


    setMessages([...messages, { user: userText, chatgpt: res !== null ? res : "" }]);
    setUserText("")
  }
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageContainer} ref={chatContainerRef}>
        <div className={styles.messageWrapper}>
          {messages.map((message, index) => {
            return (
              <div key={index}>
                <div className={styles.userWrapper}>
                  <p className={styles.nameYou} key={index}>You</p>
                  <p className={styles.messageYou}>{message.user}</p>
                </div>
                <div className={styles.chatGPTWrapper}>
                  <p className={styles.nameChatGPT}>Chat</p>
                  <p className={styles.messageChatGPT}>{message.chatgpt}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.textWrapper}>
        <input value={userText} type="text" onChange={(event) => setUserText(event.target.value)}></input>
        <button className={styles.submitBtn} onClick={onClickAddText}><img src="/button.png" alt="#" /></button>
      </div>
    </div>
  );
};