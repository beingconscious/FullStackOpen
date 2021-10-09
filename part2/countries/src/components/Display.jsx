	import React from 'react'
	import Weather from './Weather'

function Display({cntry,len,handleChange}) {

	if(len === 1) 
		return( <Country cntry ={cntry} />) 
 	else 
 		return( <Countries cntry ={cntry} handleChange = {handleChange} />)
}

function Country({cntry}) {
	return(
		<>
			<h1>{cntry.name.common}</h1>
			<p>capital {cntry.capital}</p>
			<p>population {cntry.population}</p>
			<h2>languages </h2>
			<ul>
				{
					Object.entries(cntry.languages).map(([key, value]) => {
    			// Pretty straightforward - use key for the key and value for the value.// Just to clarify: unlike object destructuring, the parameter names don't matter here.
    			return <li key = {key}> {value} </li>
					})
				}
			</ul>
			<img width='100px' height='100px' src={cntry.flags.svg} alt ={"flag.jpeg"}/>
			<Weather cntry= {cntry}/>
		</>
	)
}

function Countries({cntry,handleChange}) {
	let cn = cntry.name.common.toLowerCase()
 console.log()
	return(
		<>
			<p>{cn}</p>
			<button onClick = {handleChange(cn)}> show</button>
		</>
	)
}

export default Display