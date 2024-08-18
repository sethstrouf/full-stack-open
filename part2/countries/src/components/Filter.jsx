function Filter({ searchTerm, setSearchTerm }) {
  return (
    <div>
      Find Countries {' '}
      <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)}></input>
    </div>
  )
}

export default Filter
