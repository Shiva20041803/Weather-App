const API_KEY = '7cfd17f0656a4c62216ad0e319be5630'

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

  const getFormattedWeatherData = async (city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
  
    const data = await fetch(URL)
      .then((res) => res.json())
      .then((data) => data);
  
    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      sys: { country },
      name,
      dt,
    } = data;
    // console.log(data);
    const { description, icon } = weather[0];
  
    const iconURL = makeIconURL(icon);
  
    const currentDate = new Date(dt * 1000); // Convert UNIX timestamp to milliseconds
  
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: "numeric",};
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
  
    const formattedDate = currentDate.toLocaleDateString(undefined, dateOptions);
    const formattedTime = currentDate.toLocaleTimeString(undefined, timeOptions);
  
    return {
      description,
      iconURL,
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      speed,
      country,
      name,
      date: formattedDate,
      time: formattedTime,
    };
  };
  
  export { getFormattedWeatherData };
  