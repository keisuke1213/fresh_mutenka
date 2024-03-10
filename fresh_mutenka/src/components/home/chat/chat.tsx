"use client"
import styles from './chat.module.css'
import { useEffect, useRef } from "react";
import useSWR from "swr";
import { useState } from "react";
import { getResponse } from "../../../pages/api/chat"
import { testMethod } from "../../../pages/api/chat";


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
    const goals = JSON.parse(res || '');
      
      if (Array.isArray(goals)) {
        console.log('setContent')
        goals.forEach(({ level, goal }) => {
          const content = goal;
          const url = `/api/sub_goal/update/setContent/0154f731-faa7-4985-88b2-d8a71e74f606/${level}/${content}`;
          
          fetcher(url)
            .then(data => {
              console.log(data); // レスポンスデータを処理
            })
            .catch(error => {
              console.error(error); // エラーを処理
            });
        });
      }

    setMessages([...messages, { user: userText, chatgpt: res !== null ? res : "" }]);
    setUserText("")
  }

  // const [goalContent, setGoalContent] = useState('')
  // const [goalsArray, setGoalsArray] = useState()
  // if (Array.isArray(JSON.parse(sub_goal_contents))) {
    //   setGoalsArray(JSON.parse(sub_goal_contents));
    // }
    // if (goalsArray) {
      
  // }
  // function useMultipleRequests() {
  //   const requests = [];
  
  //   for (let i = 1; i <= 10; i++) {
    //     const content = goalsArray.find(goal => goal.level === i * 10)?.goal;
    //     const { mutate } = useSWR(`/api/sub_goal/update/setContent/0154f731-faa7-4985-88b2-d8a71e74f606/${i * 10}/${content}`, fetcher);
    //     requests.push({ mutate });
    //   }
    
    
    //   return requests;
    // }
    // const requests = useMultipleRequests();
    // const sub_goal_contents = `[
    //   {"level": 10, "goal": "低い椅子やベンチに立って、高さに慣れる"},
    //   {"level": 20, "goal": "脚立の最初の段に立ち、安定感を感じる"},
    //   {"level": 30, "goal": "脚立の上の段に立ち、手すりを持つことで安心感を得る"},
    //   {"level": 40, "goal": "2階の窓から外を見る"},
    //   {"level": 50, "goal": "小さな丘や斜面に登り、高い位置からの景色に慣れる"},
    //   {"level": 60, "goal": "低いビルの屋上や展望台から景色を眺める"},
    //   {"level": 70, "goal": "高い場所にある安全な展望台を訪れる"},
    //   {"level": 80, "goal": "ガラス床がある展望台を訪れる"},
    //   {"level": 90, "goal": "フェリスホイールや高い観覧車に乗る"},
    //   {"level": 100, "goal": "高所恐怖症を克服すること"}
    // ]`;
    // useEffect(() => {
    //   const goals = JSON.parse(res);
      
    //   if (Array.isArray(goals)) {
    //     goals.forEach(({ level, goal }) => {
    //       const content = goal;
    //       const url = `/api/sub_goal/update/setContent/0154f731-faa7-4985-88b2-d8a71e74f606/${level}/${content}`;
          
    //       fetcher(url)
    //         .then(data => {
    //           console.log(data); // レスポンスデータを処理
    //         })
    //         .catch(error => {
    //           console.error(error); // エラーを処理
    //         });
    //     });
    //   }
    // }, []); // 空の依存配列を使用して、コンポーネントのマウント時にのみ実行されるようにします。


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  const chatContainerRef = useRef(null);
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