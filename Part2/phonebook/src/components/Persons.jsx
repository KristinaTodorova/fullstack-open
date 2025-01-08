const Persons = ({ persons, onDelete }) => {
    return (
      <>
        {persons.map(person => (
          <p key={person.name}>
            {person.name} {person.number}
            <button onClick={() => onDelete(person.id)}>Delete</button>
          </p>
        ))}
      </>
    )
  }
  
export default Persons
  