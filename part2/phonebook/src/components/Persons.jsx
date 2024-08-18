import Person from "./Person"

const Persons = ({ persons, handleDeletePerson }) => (
  <ul >
    {persons.map(person =>
      <Person key={person.id} person={person} handleDeletePerson={handleDeletePerson} />
    )}
  </ul>
)

export default Persons