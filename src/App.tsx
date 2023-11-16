/*global firefox*/

import { useState } from 'react';
import browser from "webextension-polyfill"
import './App.css'

function App() {
  const [currentSpeed, setCurrentSpeed] = useState(localStorage.getItem("playbackSpeed") || 1)
  const [input, setInput] = useState("")
  const [quickSpeeds, setQuickSpeeds] = useState<number[]>(localStorage.getItem("quickSpeeds") ? JSON.parse(localStorage.getItem("quickSpeeds")!) : [])
  
  function setPlaybackSpeed(custom_speed = 1) {
    browser.tabs.query({ active: true, currentWindow: true })
      .then((tabs) => {
        const activeTab = tabs[0];
        console.log(activeTab)
        browser.tabs.sendMessage(activeTab.id!, { action: 'setPlaybackSpeed', custom_speed })
          .then(() => {
            setCurrentSpeed(custom_speed)
            localStorage.setItem("playbackSpeed", custom_speed.toString())
          })

      })
      .catch((error) => {
        console.error('Error querying tabs:', error);
      });
  }

  function submitForm(e: React.SyntheticEvent) {
    e.preventDefault()
    setPlaybackSpeed(parseFloat(input))
    setInput("")
  }

  function quickAdd()
  {
    if (parseFloat(input))
    {
      setQuickSpeeds((prev)=>{
        localStorage.setItem("quickSpeeds", JSON.stringify([...prev, parseFloat(input)]))
        return [...prev, parseFloat(input)]
      })
      setInput("")
    }

    
  }

  function reset()
  {
    setPlaybackSpeed(1)
    localStorage.setItem("quickSpeeds", JSON.stringify([]))
    setQuickSpeeds([])
    setInput("")
  }
  




  return (
    <div className='flex flex-col gap-10'>
      <button className='btn hover:bg-red-800 bg-red-500 absolute left-2' onClick={reset}>Reset</button>
      <h2 className="text-center text-2xl font-bold">Current Speed: <span className="text-orange-400">{currentSpeed}</span></h2>
      
      <div className='grid grid-cols-3 gap-2'>
      {quickSpeeds.map(e=>(
        <button className='btn' onClick={()=>setPlaybackSpeed(e)}>{e}x</button>
      ))}
      </div>

      
      <form onSubmit={(e) => submitForm(e)} className='gap-2 flex flex-col'>
        <input required value={input} min={0} className='input input-bordered' onChange={e => setInput(e.target.value)} type="number" step={"0.1"} placeholder='Custom Speed' />
        <div className='flex gap-2 justify-center'>
          <button type="submit" className='btn'>Set Speed</button>
          <button type="button" onClick={quickAdd} className="btn bg-blue-500 hover:bg-blue-800">Quick Add</button>
        </div>
        
      </form>

    </div>
  )
}

export default App
