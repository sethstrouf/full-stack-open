import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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

  const filteredPersons = search
    ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
        <div>filter shown with <input value={search} onChange={e => setSearch(e.target.value)} /></div>
      <h2>Add New</h2>
      <form onSubmit={handleAddName}>
        <div>name: <input value={newName} onChange={e => setNewName(e.target.value)} /></div>
        <div>number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul >
        {filteredPersons.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App