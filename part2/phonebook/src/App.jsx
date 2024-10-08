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
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

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
        setNotificationMessage(`Added ${returnedPerson.name}`)
        setNotificationType('success')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType(null)
        }, 5000)
      })
      .catch(error => {
        console.error(error)
        setNotificationMessage(error.response.data.error)
        setNotificationType('error')
      })
  }

  const updatePerson = (updatedPerson) => {
    personService
      .update(updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson))
        setNewNumber('')
        setNotificationMessage(`Updated ${returnedPerson.name}`)
        setNotificationType('success')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType(null)
        }, 5000)
      })
      .catch(error => {
        console.error(error)
        setNotificationMessage(error.response.data.error)
        setNotificationType('error')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType(null)
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
          setNotificationMessage(`Deleted ${returnedPerson.name}`)
          setNotificationType('success')
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType(null)
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

      <Notification notificationType={notificationType} message={notificationMessage} />

      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <h2>Add New</h2>

      <PersonForm handleAddName={handleAddName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App