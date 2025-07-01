'use client'

import { useState } from "react";

export default function Home(){

  const [input,setInput] = useState('')
  const handlesend =()=>{
    if(!input.trim()) return;
    console.log("user input",input)
    setInput('')
  }
  return(
    <main>
      <h1>AI chatbot ui</h1>
      <div>
        <input
        placeholder="type a message"
        value={input}
        onChange={(e) =>setInput(e.target.value)}
        />
        <button
        onClick={handlesend}
        > send </button>
      </div>
    </main>
  )
}