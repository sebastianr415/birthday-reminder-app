import { useState, useEffect } from "react"

export default function Board(){
    // create a piece of state to store the name
    const [name, setName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [people, setPeople] = useState([])

    //fetch the data fromt the json file
  
useEffect(() =>{
    fetch('http://localhost:3000/api/birthdays')
    .then(res => res.json())
    .then(data => {setPeople(data)})
    .catch(error =>{console.error("Failed to load birthdays", error)

    })
},[])
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

        fetch('http://localhost:3000/api/birthdays', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, birthday})
        })

        .then(res => res.json())
        .then(savedBirthday => {
            setPeople(prev => [...prev, savedBirthday])
            setName("")
            setBirthday("")
        })

        .catch(error => {console.error("Failed to save birthday", error)})
        const newPerson = {
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
        <form onClick={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={handleNameChange}/>
        <input type="date" placeholder="Birthday" value={birthday} onChange={handleBirthdayChange}/>
        <button type="submit">Submit</button>
        </form>
        <ul>
            {people.map(sortedBirthdays =>(
                <li key={sortedBirthdays.id}>{sortedBirthdays.name} - {sortedBirthdays.birthday}   Age: {getAge(sortedBirthdays.birthday)}</li>
            ))}
        </ul>
    </div>
    )
}