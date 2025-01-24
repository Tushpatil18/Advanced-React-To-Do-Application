import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, TextField, IconButton } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import SearchIcon from '@mui/icons-material/Search';
import styles from './TaskManager.module.css';

export const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const fetchWeatherByLocation = async (searchLocation) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=bd5e378503939ddaee76f12ad7a97608&units=metric`
      );
      if (!response.ok) {
        throw new Error('Location not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (position) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=bd5e378503939ddaee76f12ad7a97608&units=metric`
      );
      if (!response.ok) {
        throw new Error('Unable to fetch weather data');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      fetchWeatherByCoords,
      () => {
        fetchWeatherByLocation('Pune');
      }
    );
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeatherByLocation(location.trim());
    }
  };

  const getWeatherIcon = (weatherCode) => {
    return weatherCode < 800 ? <CloudIcon /> : <WbSunnyIcon />;
  };

  return (
    <Box className={styles.weatherWidget}>
      <form onSubmit={handleSearch} className={styles.weatherSearch}>
        <TextField
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search location..."
          variant="outlined"
          size="small"
          error={!!error}
          helperText={error}
          InputProps={{
            endAdornment: (
              <IconButton type="submit" size="small">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </form>
      {loading ? (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress size={24} />
        </Box>
      ) : weather && (
        <Box className={styles.weatherContent}>
          <Typography className={styles.temperature}>
            {getWeatherIcon(weather?.weather[0]?.id)}
            {Math.round(weather?.main?.temp)}°C
          </Typography>
          <Box className={styles.weatherInfo}>
            <Typography className={styles.weatherDescription}>
              {weather?.weather[0]?.main}
            </Typography>
            <Typography className={styles.location}>
              {weather?.name}, {weather?.sys?.country}
            </Typography>
            <Typography variant="body2">
              H: {Math.round(weather?.main?.temp_max)}° L: {Math.round(weather?.main?.temp_min)}°
            </Typography>
            <Typography variant="body2">
              Humidity: {weather?.main?.humidity}%
            </Typography>
            <Typography variant="body2">
              Wind: {Math.round(weather?.wind?.speed)} m/s
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};