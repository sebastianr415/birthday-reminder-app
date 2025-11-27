import { useState } from "react"

export default function Board(){
    // create a piece of state to store the name
    const [name, setName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [age, setAge] = useState("")
  // create a function to handle the name change
    function handleNameChange(e){
        setName(e.target.value)
    }
    function handleBirthdayChange(e){
        setBirthday(e.target.value)
    }
    function handleAgeChange(e){
        setAge(e.target.value)
    }
    return (
    <div className="Birthday-reminder">
        <h1>Birthday Reminder</h1>
        <input type="text" placeholder="Name" value={name} onChange={handleNameChange}/>
        <input type="date" placeholder="Birthday" value={birthday} onChange={handleBirthdayChange}/>
        <input type="number" placeholder="Age" value={age} onChange={handleAgeChange}/>
        <button className="submit">Submit</button>
        <p>Hello {name}</p>
        <p>Your birthday is {birthday}</p>
        <p>You are {age} years old</p>
    </div>
    )
}