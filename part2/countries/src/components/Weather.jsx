	import React, {useState, useEffect} from 'react'
	import axios from 'axios'

function Weather({cntry}) {

	const [ weather,setWeather ] = useState([])
	const api_key = process.env.REACT_APP_API_KEY
  const weatherHook = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${cntry.capital}`)
      .then(response => setWeather(response.data))
  }
  useEffect(weatherHook,[])
  console.log(weather.length)

  if(weather.length > 0){
    const currentWeather = weather[0].current
    console.log(currentWeather.temperature)
    return(
    <>
      <h2>Weather in {cntry.capital}</h2>
      <p>temperature:{currentWeather.temperature} Celsius</p>
      <img src={currentWeather.weather_icons[0]} alt="Weather icon"></img>
      <p>wind: {currentWeather.wind_speed} mph direction {currentWeather.wind_dir}
      </p>
    </>
    )}

  return("weather api is not responding")
  
}

export default Weather