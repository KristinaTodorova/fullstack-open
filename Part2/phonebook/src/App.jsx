import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')

  useEffect(() => {

      personService
      .getAll()
      .then(response => {
        setPersons(response)
        console.log(response)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName && person.number === newNumber)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`Update ${newName} 's phone number?`)){
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
        .update(existingPerson.id,updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => 
            person.id === existingPerson.id ? returnedPerson : person
          ));
          setNewName('');
          setNewNumber('');
        })
      }

    }

    else {

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
    })

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  }

  const filteredPersons = (persons || []).filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const remove = id => {
    const person = persons.find (p => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)){
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleSearchChange} />

      <h2>Add entry</h2>

      <PersonForm 
        onSubmit={addName} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={remove} />
    </div>
  )
}

export default App
