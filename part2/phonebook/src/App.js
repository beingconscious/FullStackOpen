  import React , { useState } from 'react'
  import Note from './components/Note'

  const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [ newName , setNewName ] = useState ( '' )
  const [newPhoneNum,setNewPhoneNum] = useState ( '' )
  const [filterText,setFilterText] = useState ( '' )


  const add = (event) => {
    event.preventDefault()
      
    const namePresent = persons.filter(person => person.name === newName)
    console.log(namePresent)
    
    if(namePresent.length < 1){
      const nameObject = {
        name: newName,
        number: newPhoneNum,
        id: newName
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewPhoneNum('')
    }
    else alert(`${newName} already exists`)
  }
  
  const handleFilterText  = (event) =>{
    setFilterText(event.target.value)
    let temp =filteredCharacters(persons)
    console.log(temp)
  }

  function filteredCharacters(p) {
    return p.filter(person => {
       const ret =person.name.toLowerCase().includes(filterText)
       console.log(filterText)
       return ret 
      }
    )
  }

  const handleNewPhoneNum  = (event) =>{
    setNewPhoneNum(event.target.value)
  }

  const handleNewName  = (event) =>{
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: 
          <input
           value = {filterText}
           onChange ={handleFilterText}
          />
      </div>
      <h2>add a new</h2>
      <form onSubmit = {add}>
        <div>
          name: 
          <input
           value = {newName}
           onChange ={handleNewName}
           type = "text"
           // key = {}
          />
        </div>
        <div>
          number: 
          <input
           value = {newPhoneNum}
           onChange ={handleNewPhoneNum}
          />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
         <Note key= {person.id} name = {person.name} number = {person.phone} />)}
      </ul>
      
    </div>
  )
}
export default App