import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'
import ErrorMessage from './components/ErrorMessage'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')
  const [notification, setNewNotification] = useState('')
  const [error, setNewError] = useState('')

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
      if (window.confirm(`Update ${newName}'s phone number?`)){
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
        .update(existingPerson.id,updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => 
            person.id === existingPerson.id ? returnedPerson : person
          ));
          setNewNotification(`Changed ${newName}'s phone number in the list.`)
          setTimeout(() => {
              setNewNotification('')
            }, 5000)
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.log('fail')
          setNewError(`The information of ${newName} has been removed from the server.`)
          setTimeout(() => {
              setNewError('')
            }, 5000)
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
    setNewNotification(`Added ${newName} to the list.`)
    setTimeout(() => {
      setNewNotification('')
    }, 5000)
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

      {error && <ErrorMessage message={error} />}

      <PersonForm 
        onSubmit={addName} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />

      { notification && <Notification message={notification} />}

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={remove} />
    </div>
  )
}

export default App