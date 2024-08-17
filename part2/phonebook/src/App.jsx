import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const findExistingPerson = () => {
    return persons.find(person => person.name === newName)
  }

  const handleAddName = (e) => {
    e.preventDefault()

    if (findExistingPerson()) return alert(`${newName} is already added to phonebook`)

    const newPerson = {
      name: newName,
      number: newNumber
    }

    axios
      .post(`http://localhost:3001/persons`, newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  const filteredPersons = searchTerm
    ? persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <h2>Add New</h2>

      <PersonForm handleAddName={handleAddName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App