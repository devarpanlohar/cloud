'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, Crosshair } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="w-[70px] h-[70px] bg-gray-200/20 rounded-lg" /> // Optional loading state
});


// Import reusable components
import DataVisualizations from './components/weather/DataVisualizations';
import MetricCards from './components/weather/MetricCards';

// Import Lottie animation JSON files from src/lottie/
import sunnyAnimation from '../lottie/sunny.json';
import partlyCloudyAnimation from '../lottie/partlycloudy.json';
import cloudyAnimation from '../lottie/cloudy.json';
import rainyAnimation from '../lottie/rainy.json';
import thunderstormAnimation from '../lottie/thunderstorm.json';
import snowyAnimation from '../lottie/snowy.json';
import foggyAnimation from '../lottie/foggy.json';
import overcastAnimation from '../lottie/overcast.json';

// Lottie files for metrics
import windSpeedAnimation from '../lottie/windSpeed.json';
import windDirectionAnimation from '../lottie/windDirection.json';
import humidityAnimation from '../lottie/humidity.json';
import pressureAnimation from '../lottie/pressure.json';
import uvAnimation from '../lottie/uv.json';
import visibilityAnimation from '../lottie/visibility.json';
import precipitationAnimation from '../lottie/precipitation.json';
import airQualityAnimation from '../lottie/airQuality.json';
import sunriseAnimation from '../lottie/sunrise.json';
import sunsetAnimation from '../lottie/sunset.json';

// Map weather conditions to categories
const getWeatherCondition = (condition) => {
  if (!condition) return 'sunny';
  const cond = condition.toLowerCase();
  if (cond.includes('thunderstorm')) return 'thunderstorm';
  if (cond.includes('snow')) return 'snow';
  if (cond.includes('fog')) return 'fog';
  if (cond.includes('rain')) return 'rain';
  if (cond.includes('cloudy')) return 'cloudy';
  if (cond.includes('overcast')) return 'overcast';
  if (cond.includes('partially cloudy') || cond.includes('partly cloudy')) return 'partlycloudy';
  if (cond.includes('clear')) return 'sunny';
  return 'sunny';
};

// Map weather conditions to background videos and Lottie animations
const weatherAssets = {
  sunny: {
    video: '/videos/sunny.mp4',
    animation: sunnyAnimation,
  },
  partlycloudy: {
    video: '/videos/partlycloudy.mp4',
    animation: partlyCloudyAnimation,
  },
  cloudy: {
    video: '/videos/cloudy.mp4',
    animation: cloudyAnimation,
  },
  rain: {
    video: '/videos/rainy.mp4',
    animation: rainyAnimation,
  },
  thunderstorm: {
    video: '/videos/thunderstorm.mp4',
    animation: thunderstormAnimation,
  },
  snow: {
    video: '/videos/snowy.mp4',
    animation: snowyAnimation,
  },
  fog: {
    video: '/videos/foggy.mp4',
    animation: foggyAnimation,
  },
  overcast: {
    video: '/videos/overcast.mp4',
    animation: overcastAnimation,
  },
};

const fetchWeather = async (location) => {
  const res = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(json.error || 'Failed to fetch weather data');
  }
  return json.data;
};

const reverseGeocode = async (lat, lon) => {
  const res = await fetch(`/api/reverse_geocode?lat=${lat}&lng=${lon}`);
  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(json.error || 'Failed to reverse geocode');
  }
  return json.address;
};

export default function WeatherDashboard() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backgroundVideo, setBackgroundVideo] = useState(weatherAssets.sunny.video);

  const getUserLocation = () => {
    if (typeof window === 'undefined') return; // Prevent SSR issues

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser. Using default location.');
      handleSearch(null, 'london');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const address = await reverseGeocode(latitude, longitude);
          const city = address.split(',')[0].trim();
          await handleSearch(null, city); // Pass city directly to handleSearch
        } catch (err) {
          console.error('Reverse geocoding error:', err);
          setError('Unable to determine location. Using default location (London).');
          await handleSearch(null, 'london');
        }
      },
      (err) => {
        let errorMessage = 'Location access denied. Using default location.';

        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Using London as default.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable. Using London.';
            break;
          case err.TIMEOUT:
            errorMessage = 'Location request timed out. Using London.';
            break;
        }

        console.error('Geolocation error:', err);
        setError(errorMessage);
        handleSearch(null, 'london');
      },
      {
        enableHighAccuracy: true,
        timeout: 5000, // 5 seconds timeout
        maximumAge: 0 // Force fresh lookup
      }
    );
  };

  const handleSearch = async (e, searchLocationParam) => {
    e?.preventDefault(); // Allow calling without event
    setLoading(true);
    setError(null);
    try {
      // Use parameter if provided, otherwise use state
      const searchLocation = searchLocationParam || location.trim().toLowerCase() || null;
      const data = await fetchWeather(searchLocation);
      setWeatherData(data);
      const condition = getWeatherCondition(data.currentConditions.conditions);
      setBackgroundVideo(weatherAssets[condition].video);
      // Update input with resolved location
      setLocation(data.resolvedAddress);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setBackgroundVideo(weatherAssets.sunny.video);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center">
      {/* Background Video */}
      <video
        key={backgroundVideo} // Add key to force reload
        autoPlay loop muted playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 min-h-screen w-full bg-black/20 p-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-6">Weather Dashboard</h1>

        {/* Update the search form component: */}
        <form onSubmit={handleSearch} className="mb-6 w-full max-w-md">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location (e.g., London)"
              className="flex-1 p-2 bg-white text-gray-800 focus:outline-none"
            />
            {/* Clear Button */}
            <button
              type="button"
              onClick={getUserLocation} // Reset to detected location
              className="h-[40px] px-3 bg-gray-400 hover:bg-gray-500 text-white"
              title="Reset to current location"
            >
              <Crosshair className="w-5 h-5" /> {/* Replace with your icon */}
            </button>
            {/* Search Button */}
            <button
              type="submit"
              className="h-[40px] px-3 flex items-center bg-blue-500 hover:bg-blue-600 text-white"
              disabled={loading}
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>
        </form>

        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {weatherData && (
          <div className="grid gap-4 w-full max-w-4xl">
            {/* Current Weather */}
            <motion.div
              className="p-4 rounded-lg bg-white/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-gray-800">
                Current Weather in {weatherData.resolvedAddress}
              </h2>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="text-4xl font-bold text-gray-800">{weatherData.currentConditions.temp}°C</p>
                  <p className="text-gray-600">Feels like {weatherData.currentConditions.feelslike}°C</p>
                  <p className="text-gray-600 capitalize">{weatherData.currentConditions.conditions}</p>
                </div>
                <div className="flex flex-col items-center">
                  <Lottie
                    animationData={weatherAssets[getWeatherCondition(weatherData.currentConditions.conditions)].animation}
                    loop
                    style={{ width: 70, height: 70 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Additional Metrics (Wind, Humidity, etc.) */}
            <motion.div
              className="p-4 rounded-lg bg-white/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Conditions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <MetricCards
                  title="Wind Speed"
                  value={weatherData.currentConditions.windspeed}
                  unit="km/h"
                  icon={<Lottie animationData={windSpeedAnimation} loop style={{ width: 40, height: 40 }} />}
                />
                <MetricCards
                  title="Wind Direction"
                  value={weatherData.currentConditions.winddir}
                  unit="°"
                  icon={<Lottie animationData={windDirectionAnimation} loop style={{ width: 40, height: 40 }} />}
                />
                <MetricCards
                  title="Humidity"
                  value={weatherData.currentConditions.humidity}
                  unit="%"
                  icon={<Lottie animationData={humidityAnimation} loop style={{ width: 40, height: 40 }} />}
                />
                <MetricCards
                  title="Pressure"
                  value={weatherData.currentConditions.pressure}
                  unit="hPa"
                  icon={<Lottie animationData={pressureAnimation} loop style={{ width: 40, height: 40 }} />}
                />
                <MetricCards
                  title="UV Index"
                  value={weatherData.currentConditions.uvindex}
                  unit=""
                  icon={<Lottie animationData={uvAnimation} loop style={{ width: 40, height: 40 }} />}
                />
                <MetricCards
                  title="Visibility"
                  value={weatherData.currentConditions.visibility}
                  unit="km"
                  icon={<Lottie animationData={visibilityAnimation} loop style={{ width: 40, height: 40 }} />}
                />
                <MetricCards
                  title="Precipitation"
                  value={weatherData.currentConditions.precip || 0}
                  unit="mm"
                  icon={<Lottie animationData={precipitationAnimation} loop style={{ width: 40, height: 40 }} />}
                />
                <MetricCards
                  title="Air Quality Index"
                  value="N/A"
                  unit=""
                  icon={<Lottie animationData={airQualityAnimation} loop style={{ width: 40, height: 40 }} />}
                />
              </div>
            </motion.div>

            {/* Today (with Sunrise/Sunset) */}
            <motion.div
              className="p-4 rounded-lg bg-white/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-gray-800">Today</h2>
              {weatherData?.days?.[0] ? (
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium text-gray-600">
                    {new Date(weatherData.days[0].datetime).toLocaleDateString([], { weekday: 'long' })}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xl font-bold text-blue-500">{weatherData.days[0].tempmax}°C</span>
                    <span className="text-lg text-blue-300">{weatherData.days[0].tempmin}°C</span>
                  </div>
                  <div className="mt-2 flex flex-col items-center py-3">
                    <Lottie
                      animationData={weatherAssets[getWeatherCondition(weatherData.days[0].conditions)].animation}
                      loop
                      style={{ width: 45, height: 45 }}
                    />
                    <span className='text-sm font-medium text-gray-600'>{weatherData.days[0].conditions}</span>
                  </div>
                  <div className="flex gap-4 mt-2 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Lottie animationData={sunriseAnimation} loop style={{ width: 40, height: 40 }} />
                      <span>Sunrise: {weatherData.currentConditions.sunrise}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Lottie animationData={sunsetAnimation} loop style={{ width: 40, height: 40 }} />
                      <span>Sunset: {weatherData.currentConditions.sunset}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-600">No data for today.</p>
              )}
            </motion.div>

            {/* Hourly Temperature Trend (Data Visualization) */}
            <motion.div
              className="p-4 rounded-lg bg-white/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Hourly Temperature Trend</h2>
              {weatherData?.days?.[0]?.hours?.length > 0 ? (
                <DataVisualizations
                  data={weatherData.days[0].hours.slice(0, 12)} // Next 12 hours
                  type="line"
                  title="Temperature (°C)"
                  xKey="datetime"
                  yKey="temp"
                />
              ) : (
                <p className="text-center text-gray-600">No hourly data available.</p>
              )}
            </motion.div>

            {/* Next 3 Hours */}
            <motion.div
              className="p-4 rounded-lg bg-white/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold text-gray-800">Next 3 Hours</h2>
              {weatherData?.days?.[0]?.hours?.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {(() => {
                    // Current time in the location's timezone (using weatherData.tzoffset)
                    const now = new Date();
                    if (weatherData.tzoffset) {
                      const localOffsetMinutes = now.getTimezoneOffset();
                      const targetOffsetMinutes = weatherData.tzoffset * 60;
                      const offsetDifference = targetOffsetMinutes - localOffsetMinutes;
                      now.setMinutes(now.getMinutes() + offsetDifference);
                    }
                    const currentHour = now.getHours();

                    // Find the index of the next hour after the current time
                    const nextHourIndex = weatherData.days[0].hours.findIndex((hour) => {
                      const hourTime = parseInt(hour.datetime.split(':')[0], 10);
                      return hourTime >= currentHour;
                    });

                    // If no future hours are found, default to the first 3 hours
                    const startIndex = nextHourIndex !== -1 ? nextHourIndex : 0;
                    return weatherData.days[0].hours.slice(startIndex, startIndex + 3).map((hour, i) => {
                      const dateString = `${weatherData.days[0].datetime}T${hour.datetime}`;
                      const date = new Date(dateString);
                      if (isNaN(date.getTime())) {
                        console.error('Invalid date in hour.datetime:', hour.datetime);
                        return null;
                      }
                      return (
                        <motion.div
                          key={i}
                          className="p-2 rounded-lg bg-white/30 text-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <p className="text-sm font-medium text-gray-600">
                            {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className="text-lg font-bold text-gray-800">{hour.temp ?? 'N/A'}°C</p>
                          <div className="flex flex-col items-center justify-center">
                            <Lottie
                              animationData={weatherAssets[getWeatherCondition(hour.conditions)].animation}
                              loop={true}
                              style={{ width: 40, height: 40 }}
                            />
                            <span className='text-sm font-medium text-gray-600'>{hour.conditions}</span>
                          </div>

                        </motion.div>
                      );
                    }).filter(Boolean);
                  })()}
                </div>
              ) : (
                <p className="text-center text-gray-600">No hourly forecast available.</p>
              )}
            </motion.div>

            {/* Next 6 Days */}
            <motion.div
              className="p-4 rounded-lg bg-white/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-xl font-semibold text-gray-800">Next 6 Days</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {weatherData?.days?.slice(1, 7)?.map((day, i) => (
                  <motion.div
                    key={i}
                    className="p-3 rounded-lg bg-white/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-md font-medium text-gray-600">
                      {new Date(day.datetime).toLocaleDateString([], { weekday: 'long' })}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-orange-600 font-bold">Max: {day.tempmax}°C</span>
                        <span className="text-sm text-blue-500">Min: {day.tempmin}°C</span>
                        <span className="text-sm font-medium text-gray-500 capitalize">{day.conditions}</span>
                      </div>
                      <Lottie
                        animationData={weatherAssets[getWeatherCondition(day.conditions)].animation}
                        loop={true}
                        style={{ width: 40, height: 40 }}
                      />
                    </div>
                  </motion.div>
                )) ?? (
                    <p className="col-span-3 text-center text-gray-600">No 7-day forecast available.</p>
                  )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}