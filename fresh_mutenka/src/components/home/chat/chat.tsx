"use client"
import  { useState } from "react";


export default function Chat() {
  const [text, setText] = useState("");

  const [addText, setAddText] = useState("");

  
  const onClickAddText = () => {
    setAddText(text);
    setText("");
  }

  return (
    <div>
        <div>
            <p>You</p>
            {addText}
        </div>
        <div>

        </div>
        <input value={text} type="text" onChange={(event)=>setText(event.target.value)}></input>
        <button onClick={onClickAddText}></button>
    </div>
  );
};