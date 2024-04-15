document.addEventListener("DOMContentLoaded", function () {
    // Your WeatherAPI key
    const apiKey = 'fad177c6d5db403aba3115313241204';
    const toDoForm = document.getElementById('toDoForm');
    const toDoList = document.getElementById('taskList');
    function fetchWeatherData(city) {
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

        document.getElementById('weatherDescription').textContent = 'Loading...';
        document.getElementById('temperature').textContent = 'Loading...';

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                return response.json();
            })
            .then(data => {
                const temperature = data.current.temp_c;
                const weatherDescription = data.current.condition.text;
                const weatherIcon = data.current.condition.icon
                document.getElementById('weatherDescription').textContent = `Weather: ${weatherDescription}`;
                document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
                document.getElementById('icon').src = weatherIcon
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('weatherDescription').textContent = 'Failed to fetch weather data. Please try again.';
                document.getElementById('temperature').textContent = '';
            });
    }

    document.getElementById('cityForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const city = document.getElementById('cityInput').value.trim();
        if (city) {
            fetchWeatherData(city);
        }
    });
    toDoForm.addEventListener('submit', function (e) {
        e.preventDefault()
        const li = document.createElement('li');
        li.textContent = toDoForm.task.value
        toDoList.appendChild(li)

    })
});
