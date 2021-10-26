	import React, {useState, useEffect} from 'react'
	import axios from 'axios'

function Weather({cntry}) {

	const [ weather,setWeather ] = useState([])
	const api_key = process.env.REACT_APP_API_KEY
  const weatherLen = Object.keys(weather).length

  useEffect(() => {
    console.log("got inside effect")
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${cntry.capital}`)
      .then(response => {
        setWeather(response.data)
        console.log("promise fulfilled")
      })
    },[])

  console.log(weatherLen)
  // console.log(weather[0].current)

  if(weatherLen > 0){
    // const currentWeather = weather[0].current
    // console.log(currentWeather.temperature)
    return(
    <>
      <h2>Weather in {cntry.capital}</h2>
      <p>temperature:{weather.current.temperature} Celsius</p>
      <img src={weather.current.weather_icons[0]} alt="Weather icon"></img>
      <p>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}
      </p>
    </>
    )}

  return("weather api is not responding")
  
}

export default Weather