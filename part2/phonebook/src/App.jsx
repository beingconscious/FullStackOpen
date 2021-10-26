  import React,{ useState, useEffect } from 'react'
  import Person from './components/Person'
  import Filter from './components/Filter'
  import PersonForm from './components/PersonForm'
  import phoneBookService from './services/phonebook'


const App = () => { 

  const [ persons, setPersons ] = useState( [] )
  const [ newName , setNewName ] = useState ( '' )
  const [ newPhoneNum, setNewPhoneNum ] = useState ( '' )
  const [ filterText, setFilterText ] = useState ( '' )

  const hook = () => {
    phoneBookService
      .getAll()
      .then( initialNumbers => {
        setPersons(initialNumbers)
      })
  }
  useEffect(hook,[])

  console.log(persons)

  const add = event => {
    event.preventDefault()
      
    const personPresent = persons.filter( person => person.name === newName)
    console.log( personPresent )
    const nameObject = {
        name: newName,
        number: newPhoneNum,
      }
    
    if( personPresent.length < 1){
      
      //saving new number to backend server.
      phoneBookService
        .create( nameObject )
        .then( returnedPerson => {
          setPersons( persons.concat( returnedPerson))
          setNewName( '' )
          setNewPhoneNum( '' )
        })
    }
    else {
      let result = window.confirm( `${newName} is already added to the phonebook, replace the old number with a new one` )
      const id = personPresent[0].id
      if( result ) {
        phoneBookService
          .update( id , nameObject )
          .then( returnedPerson  => {
            setPersons( persons.map( person =>
             person.id !== id ? person : returnedPerson ))
          })
          .catch( error => console.error(error))
      }
    }
  }

  const removePerson = id => {
    const person = persons.find( p => p.id === id )
    let result = window.confirm( `delete ${person.name}?` )
      if( result ){
        phoneBookService
          .remove(id)
          .then( setPersons(persons.filter( p => p.id !== id)) )
          .catch( error => alert( `${person.name} was already deleted from the server`))
      }
  }
  
  const filteredPersons = filterText.length === 0 ? persons :
    persons.filter( person => person.name.toLowerCase().includes(filterText)) 
  
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
         onChange ={ e => setFilterText(e.target.value)}
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
          filteredPersons.map( person =>
            <Person
             name = {person.name}
             number = {person.number}
             id = {person.id}
             removePerson = {removePerson}
             key= {person.id}
            />
          )
        }    
    </div>
  )
}


export default App