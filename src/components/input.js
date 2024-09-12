import './styles/input.css'

const SearchInput = () => {
  return (  
    <div className='main-container'>
      <h1>Tatoo find</h1>
      <div className='input-container'>
        <input type='text' placeholder='Describe your desired tatoo'/>
        <button>Search</button>
      </div>
    </div>
  );
}

export default SearchInput;