export type optionType = {
  name: string
  country: string
  lat: number
  lon: number
}

export type forecastType = {
 name: string
  country: string
  sunrise: number
  sunset: number
  list: [{
    dt: number
    main: {
      feels_like: number
      grnd_level: number
      humidity: number
      pressure: number
      temp: number
      temp_max:   number
      temp_min:  number
    }
    weather: [{
      description: string
      icon: string
      id: number
      main: string
    }]
    wind: {
      speed: number
      deg: number
      gust: number
    }
    clouds: {
      all: number
    }
    pop: number
    visibility: number
  }]
}
