import { useState, useEffect, ChangeEvent } from 'react';
import { optionType, forecastType } from '../types';
const useForecast = () => {
  const [term, setTerm] = useState<string>('');
const [options, setOptions] = useState<[]>([]);
const [city, setCity] = useState<optionType | null>(null);
const [forecast, setForecast] = useState<forecastType | null>(null);

const getSearchOption = async (value: string) => {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
  .then(res => res.json())
  .then(data => setOptions(data))
  .catch(e => console.log(e));

}

const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.trim();
  setTerm(value);
  if (value === '') return;
  getSearchOption(value);
};

const getForecast = (city: optionType) => {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
  .then(res => res.json())
  .then(data => {
    const forecastData = {
      ...data.city,
      list: data.list.slice(0, 15),
    }
    setForecast(forecastData)
  }).catch(e => console.log(e));
}

const onSubmit = () => {
  if(!city) return
  getForecast(city)
}

const onOptionSelect = (option: optionType) => {
  setCity(option);

}

useEffect(() => {
  if(city) {
    setTerm(city.name);
    setOptions([]);
  }
}, [city])

return {
  term, options, forecast, onInputChange, onSubmit, onOptionSelect
}
}

export default useForecast;