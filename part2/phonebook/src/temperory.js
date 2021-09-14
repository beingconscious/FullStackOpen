    const personExist = persons.find((person) => person.name === newName)
    console.log(personExist)
    if(personExist === undefined){
      const nameObject = {
        name: newName
      }
      setPersons(persons.concat(nameObject))
      setNewName(' ')
    }
    else{
      alert('name already exists')
    }

    i have been stuck in this problem for more than a few hours now .the exercise(ex no:2.7) is to prevent the user from entering an already present name inside the phonebook. tried the array methods filter,some and find . but no use , Current output of the code is inserting the name atleast two times . feeling desperate ,appreciate some help