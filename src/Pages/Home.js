import React, { useState } from "react"
import { useLazyQuery } from "@apollo/client"
import { GET_WEATHER_QUERY } from "../graphql/Queries"
import "./../App.css"

function Home() {
  const [cityName, setCityName] = useState("")
  const [getWeather, { loading, data, error }] = useLazyQuery(
    GET_WEATHER_QUERY,
    {
      variables: { name: cityName },
    }
  )
  if (loading) <h1>Data is Loading....</h1>
  if (error) <h1>Error found....</h1>
  if (data) console.log(data)

  return (
    <div className="App">
      <h1>Search Here</h1>
      <input
        type="text"
        placeholder="City name..."
        onChange={(e) => setCityName(e.target.value)}
      />
      <button onClick={() => getWeather()} style={{ marginLeft: "10px" }}>
        Search
      </button>
      {data && (
        <>
          <h1>CityName : {data.getCityByName.name}</h1>
          <h1>Temperature : {data.getCityByName.weather.temperature.actual}</h1>
          <h1>Description: {data.getCityByName.weather.summary.description}</h1>
          <h1>Wind Speed: {data.getCityByName.weather.wind.speed}</h1>
        </>
      )}
    </div>
  )
}

export default Home
