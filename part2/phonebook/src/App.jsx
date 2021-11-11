	import React,{ useState, useEffect } from 'react'
	import Person from './components/Person'
	import Filter from './components/Filter'
	import PersonForm from './components/PersonForm'
	import Notification from './components/Notification'
	import phoneService from './services/phonebook'


const App = () => { 

	const [ allPersons, setAllPersons ] = useState( [] )
	const [ name , setName ] = useState ( '' )
	const [ phone, setPhone ] = useState ( '' )
	const [ filterText, setFilterText ] = useState ( '' )
	const [ message, setMessage ] = useState( null )

	const hook = () => {
		phoneService.getAll().then( initialNumbers => {
			setAllPersons(initialNumbers)
		})
	}
	useEffect( hook,[] )

	// console.log(allPersons)

	const addHandle = event => {
		event.preventDefault()
		const person = allPersons.filter( p => p.name === name)
		const personToAdd = person[0]
		const updatedPerson = {
			...personToAdd,
			number: phone,
		}

		if( person.length !== 0 ){
			const id = person[0].id
			if ( window.confirm( `${personToAdd.name} is already present, replace the old no with a new one` ) ) {
				phoneService.update( id , updatedPerson ).then( rtp  => {
					setAllPersons( allPersons.map( p => p.id !== id ? p : rtp ))
					setMessage( `changed ${ rtp.name}'s number to ${ rtp.number }`  ) 
					setTimeout( () => { 
						setMessage( null )
					},  5000)
				})
				.catch( error => {
					setMessage( `[ERROR] ${updatedPerson.name} was already deleted` )
					setTimeout( () => {
						setMessage( null )
					},  5000)
				})
			}
		} else {
				const updatedPerson = {
					name: name,
					number: phone,
				}
				phoneService.create( updatedPerson ).then( rtp => {
				setAllPersons( allPersons.concat( rtp))
				setName( '' )
				setPhone( '' )
				setMessage( `added ${ rtp.name}` ) 
				setTimeout( () => {
					setMessage( null )
				},  5000)
			})
		}
	}

	console.log(message)

	const removePerson = id =>  {
		const person = allPersons.find( p => p.id === id )
		if ( window.confirm( `delete ${person.name}?` )) {
			phoneService
			.remove(id)
			.then( setAllPersons( allPersons.filter( p => p.id !== id)) )
		}
	}
	 
	const handleNewPhoneNum  = (event) => {
		setPhone(event.target.value)
	}
	const handleNewName  = (event) => {
		setName(event.target.value)
	}

	const filteredPersons = filterText.length === 0 ? allPersons :
	 allPersons.filter( p => p.name.toLowerCase().includes(filterText))

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message = { message } />
			<div>
				filter shown with: 
				<Filter
					value = { filterText }
					onChange ={ e => setFilterText(e.target.value)}
				/>
			</div>
			<h2>add a new</h2>
			<PersonForm 
				onSubmit = {addHandle}
				valueName = {name}
				onChangeName = {handleNewName}
				valueNum = {phone}
				onChangeNum = {handleNewPhoneNum}
			/>
			 
			<h2>Numbers</h2>
			{
				filteredPersons.map( p =>
					<Person
						name = {p.name}
						number = {p.number}
						id = {p.id}
						removePerson = {removePerson}
						key= {p.id}
					/>
				)
			}    
		</div>
	)
}


export default App