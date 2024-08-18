import { useState, useEffect } from 'react'
import personService from './services/personService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const findExistingPerson = () => {
    return persons.find(person => person.name === newName)
  }

  const handleAddName = (e) => {
    e.preventDefault()

    const existingPerson = findExistingPerson()

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the older number with a new one?`)) {
        updatePerson({...existingPerson, number: newNumber})
      }
    } else {
      addPerson()
    }
  }

  const addPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const updatePerson = (updatedPerson) => {
    personService
      .update(updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson))
        setNewNumber('')
        setSuccessMessage(`Updated ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const handleDeletePerson = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .destroy(id)
        .then(returnedPerson => {
          const newPersons = persons.filter(person => person.id !== returnedPerson.id)
          setPersons(newPersons)
          setSuccessMessage(`Deleted ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
  }

  const filteredPersons = searchTerm
    ? persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage} />

      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <h2>Add New</h2>

      <PersonForm handleAddName={handleAddName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App