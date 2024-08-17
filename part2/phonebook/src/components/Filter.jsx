const Filter = ({ searchTerm, setSearchTerm }) => (
  <div>filter shown with <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
)

export default Filter