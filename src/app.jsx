import { useState } from "react"

export default function Board(){
    // create a piece of state to store the name
    const [name, setName] = useState("")
    const [birthday, setBirthday] = useState("")
    


    const [people, setPeople] = useState([])
      // create a function to handle the name change
    function handleNameChange(e){
        setName(e.target.value)
    }
    function handleBirthdayChange(e){
        setBirthday(e.target.value)
    }
    function getAge(birthday){
        const diff = Date.now() - new Date(birthday).getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)); 
    }

    function handleSubmit(e){
        e.preventDefault()
        // ignore empty inputs
        if(!name || !birthday ) return

        const newPerson = {
            id: crypto.randomUUID(),
            name: name,
            birthday: birthday,
        }

        setPeople([...people, newPerson])

        // clear inputs
        setName("")
        setBirthday("")
    }
    //sort the birthdays
    const sortedBirthdays = people.sort((a, b) => new Date(a.birthday) - new Date(b.birthday))


    return (
    <div className="Birthday-reminder">
        <h1>Birthday Reminder</h1>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={handleNameChange}/>
        <input type="date" placeholder="Birthday" value={birthday} onChange={handleBirthdayChange}/>
        <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
        <ul>
            {people.map(sortedBirthdays =>(
                <li key={sortedBirthdays.id}>{sortedBirthdays.name} - {sortedBirthdays.birthday}   Your are: {getAge(sortedBirthdays.birthday)}</li>
            ))}
        </ul>
        {/* <p>Hello {name}</p>
        <p>Your birthday is {birthday}</p>
        <p>You are {age} years old</p> */}
    </div>
    )
}