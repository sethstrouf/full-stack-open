const Person = ({ person, handleDeletePerson }) => (
  <li>{person.name} {person.number} <button onClick={() => handleDeletePerson(person.id)}>Delete</button></li>
)

export default Person