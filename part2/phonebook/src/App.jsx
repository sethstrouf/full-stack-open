import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

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
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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