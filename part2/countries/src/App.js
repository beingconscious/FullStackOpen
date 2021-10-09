  import React,{ useState ,useEffect } from 'react'
  import axios from 'axios'
  import Input from './components/Input'
  import Display from './components/Display'


const App = () => {
  const [ searchText, setSearchText ] = useState( '' )
  const [ countries, setCountries ] = useState( [] )
  let len = 0

  const countryHook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => { // console.log("promise fulfilled",response.data)
        setCountries(response.data)
    })
  }
  useEffect(countryHook,[])

  let filteredCountries = countries.filter(country => 
    {
      const ret = country.name.common.toLowerCase().includes(searchText)
      return ret
    }
  )
  len = filteredCountries.length // console.table({filteredCountries})
  console.log("app works")

  const handleChange = (cnt) => {
    const handle = () => {
      setSearchText(cnt)  
    }
    return handle
  }
  
  return(
    <>
      <Input  setSearchText={setSearchText} searchText= {searchText} />
      {
        len < 10 ?
        filteredCountries.map((c,i) =>
          <Display cntry = {c} key = {c.name.official.toString()} len = {len} handleChange = {handleChange} /> 
        ):
        "too many matches specify another filter"
      }
    </>  
  )
}

export default App