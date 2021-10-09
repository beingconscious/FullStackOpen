	import React from 'react'

console.log("input works")
function Input({setSearchText,searchText}) {
  const handleSearch = e => setSearchText(e.target.value)

	return(
		<div>
			find countries<input onChange= {handleSearch} value ={searchText} />
		</div>
		)
}

export default Input