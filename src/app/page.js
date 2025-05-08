'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const WEATHER_BACKGROUNDS = {
  thunderstorm: '/weather-backgrounds/thunder_storm.mp4',
  'heavy-rain': '/weather-backgrounds/heavy_rainfall.mp4',
  rain: '/weather-backgrounds/rainfall.mp4',
  snow: '/weather-backgrounds/snow.mp4',
  fog: '/weather-backgrounds/fog.mp4',
  'partly-cloudy': '/weather-backgrounds/partially_cloudy.mp4',
  cloudy: '/weather-backgrounds/cloudy.mp4',
  sunny: '/weather-backgrounds/sunny.mp4',
  clear: '/weather-backgrounds/sunny.mp4',
  default: null,
}

export default function Home() {
  const [location, setLocation] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [geoStatus, setGeoStatus] = useState('idle')
  const [backgroundVideo, setBackgroundVideo] = useState(null)
  const [videoTransition, setVideoTransition] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (weatherData?.currentConditions?.conditions) {
      const condition = weatherData.currentConditions.conditions.toLowerCase()
      console.log('Current weather condition:', condition)

      // Normalize spaces to hyphens for matching
      const normalized = condition.replace(/\s+/g, '-')
      let selected = WEATHER_BACKGROUNDS.default

      // Check for exact matches first
      if (WEATHER_BACKGROUNDS[normalized]) {
        selected = WEATHER_BACKGROUNDS[normalized]
      } else {
        // Fallback to partial matching
        for (const [key, src] of Object.entries(WEATHER_BACKGROUNDS)) {
          if (key !== 'default' && normalized.includes(key)) {
            selected = src
            break
          }
        }
      }

      // Only update if the video source has changed
      if (selected !== backgroundVideo) {
        setVideoTransition(true)
        setTimeout(() => {
          setBackgroundVideo(selected)
          setVideoTransition(false)
        }, 2000) // Transition duration
      }
    } else {
      setBackgroundVideo(WEATHER_BACKGROUNDS.default)
    }
  }, [weatherData])

  const clearData = () => {
    setWeatherData(null)
    setLocation('')
    setBackgroundVideo(WEATHER_BACKGROUNDS.default)
    setError(null)
  }

  async function fetchWeather(q) {
    setLoading(true)
    setError(null)
    try {
      // Add cache-busting parameter to prevent caching
      const timestamp = new Date().getTime()
      const res = await fetch(
        `/api/weather_forecast_data?location=${encodeURIComponent(q)}&t=${timestamp}`,
      )
      if (!res.ok) throw new Error(`Weather API error: ${res.status}`)
      const json = await res.json()
      return json.data
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function reverseGeocode(lat, lng) {
    try {
      const res = await fetch(`/api/reverse_geocode?lat=${lat}&lng=${lng}`)
      if (!res.ok) throw new Error(`Geocoding API error: ${res.status}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      return data.address
    } catch {
      return `${lat.toFixed(4)},${lng.toFixed(4)}`
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!location.trim()) return setError('Please enter a location')
    try {
      const data = await fetchWeather(location)
      setWeatherData(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      return setError('Geolocation not supported')
    }
    setGeoStatus('fetching')
    setError(null)
    try {
      const pos = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 10000 }),
      )
      const { latitude, longitude } = pos.coords
      const name = await reverseGeocode(latitude, longitude)
      setLocation(name)
      const data = await fetchWeather(name)
      setWeatherData(data)
      setGeoStatus('success')
    } catch (err) {
      setError(err.message)
      setGeoStatus('error')
    }
  }

  return (
    <section className="weather-app relative min-h-screen w-full overflow-hidden">
      {/* Fixed Background Video */}
      {backgroundVideo ? (
        <div className="fixed inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className={`h-full w-full object-cover transition-opacity duration-[2000] ${
              videoTransition ? 'opacity-0' : 'opacity-50'
            }`}
            key={backgroundVideo} // Force re-render when source changes
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <div className="fixed inset-0 bg-black/30" />
        </div>
      ) : (
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-blue-500 to-blue-50 dark:from-slate-900 dark:to-gray-600" />
      )}

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-4xl p-4 sm:p-6">
        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-lg bg-white/80 p-4 shadow-lg backdrop-blur-sm sm:p-6 dark:bg-gray-800/80"
        >
          <div className="mb-4 flex flex-col gap-2 sm:flex-row">
            <div className="flex w-full flex-col items-start justify-center space-x-2 md:flex-row md:items-center">
              <label
                htmlFor="location"
                className="py-2 font-medium dark:text-gray-300"
              >
                Location:
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city or detect"
                className="w-full flex-1 rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              type="button"
              onClick={getCurrentLocation}
              disabled={geoStatus === 'fetching'}
              className="flex h-10 w-16 items-center justify-center rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400"
            >
              {geoStatus === 'fetching' ? (
                <div className="loader"></div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
              )}
            </button>
            {weatherData && (
              <button
                type="button"
                onClick={clearData}
                className="flex justify-center rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
              >
                Clear
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
          {error && (
            <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
          )}
        </form>

        {weatherData && (
          <div className="rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
            <span className="mb-2 inline-flex text-2xl font-bold dark:text-white">
              Weather for <h3 className="pl-1 capitalize">{location}</h3>
            </span>
            <p className="mb-4 dark:text-gray-300">
              Time Zone: {weatherData.timezone}
            </p>

            {/* Current */}
            <div className="mb-6 flex items-center gap-4">
              <div>
                <p className="text-4xl font-bold dark:text-white">
                  {weatherData.currentConditions.temp}°C
                </p>
                <p className="dark:text-gray-300">
                  {weatherData.currentConditions.conditions}
                </p>
              </div>
              {weatherData.currentConditions.icon && (
                <Image
                  src={`/weather-icons/${weatherData.currentConditions.conditions}.png`}
                  alt={weatherData.currentConditions.conditions}
                  width={64}
                  height={64}
                  className="drop-shadow-md"
                />
              )}
            </div>

            {/* Forecast */}
            <h3 className="mb-2 text-xl font-semibold dark:text-white">
              Weekly Forecast:
            </h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-1 lg:grid-cols-3">
              {weatherData.days?.map((day, i) => (
                <li
                  key={i}
                  className="rounded-lg bg-white/50 p-3 shadow-sm dark:bg-gray-700/50"
                >
                  <div className="flex justify-between">
                    <strong className="dark:text-white">{day.datetime}</strong>
                    <span className="dark:text-gray-300">{day.conditions}</span>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <span className="dark:text-blue-400">
                      High: {day.tempmax}°C
                    </span>
                    <span className="dark:text-blue-300">
                      Low: {day.tempmin}°C
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
