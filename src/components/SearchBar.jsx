import React, { useEffect, useState } from 'react'

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // TODO: filter chats based on search input
    console.log(searchTerm)
  }, [searchTerm])

  const inputStyle = {
    display: 'flex',
    borderRadius: '4px',
    padding: '10px',
    width: '90%',
    textAlign: 'left',
    fontSize: '14px',
    border: '1px solid grey'
    // backgroundColor: '#'
  }

  function handleInputChange(event) {
    setSearchTerm(event.target.value)
  }

  return (
    <input
      type='text'
      placeholder='Search Chats...'
      value={searchTerm}
      onChange={handleInputChange}
      style={inputStyle}
    />
  )
}

export default SearchBar
