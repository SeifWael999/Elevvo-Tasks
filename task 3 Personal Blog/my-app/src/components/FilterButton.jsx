const FilterButton = ({ category, isActive, onClick, children }) => (
  <button
    type="button"
    className={`btn ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}
    onClick={() => onClick(category)}
  >
    {children}
  </button>
)

export default FilterButton
