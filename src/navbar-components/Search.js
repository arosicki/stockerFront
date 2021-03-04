import "./Search.css"

const Search = () => {
    return (
        <span className="search-bar">
        <label className="search-icon"><span className="material-icons"> search </span></label>
        <input className="search-input" type="text" placeholder="Search"></input>
        </span>
    )
}

export default Search;