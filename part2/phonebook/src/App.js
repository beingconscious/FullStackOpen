  import React , { useState } from 'react'
  import Person from './components/Person'
  import Filter from './components/Filter'
  import PersonForm from './components/PersonForm'


const App = () => { 

  const [persons, setPersons] = useState([])
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
  
  const filteredPersons = filterText.length === 0 ? persons :
  persons.filter(person =>
    {
      const ret = person.name.toLowerCase().includes(filterText)
      console.log(filterText);console.log(ret)
      return ret
    }
  ) 
  
  console.log(filteredPersons)

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
        <Filter
         value = {filterText}
         onChange ={e => setFilterText(e.target.value)}
        />
      </div>
      <h2>add a new</h2>
      <PersonForm 
        onSubmit = {add}
        valueName = {newName}
        onChangeName = {handleNewName}
        valueNum = {newPhoneNum}
        onChangeNum = {handleNewPhoneNum}
      />
       
      <h2>Numbers</h2>
        {
          filteredPersons.map(person =>
            <Person
             key= {person.id}
             name = {person.name}
             number = {person.number}
            />
          )
        }    
    </div>
  )
}


export default App