//wrap the ajax call in an .on"click" event 
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="
var cityName = "new%20york" //$("#"/*put the class/ID for the inputbar (where they type the city) in here */).val().trim();
var lat;
var lon;
$("#searchCity").on("click", function(event) {
    event.preventDefault();
    var cityName = $("#cityName").val();
    console.log(cityName);
    $.ajax({
        url:queryURL+cityName+"&appid=513e25023118dcdae6ded6cbd2eb4069",
        method:"get"
    }).then(function(response){
        console.log(response);
        // $("<p>").text("Temperature: " + response.wind.deg + " degrees")
        var temp = ((9/5) * response.main.temp - 459.67).toFixed(2);
        temp = $("<p>").text("Temperature: " + temp + " degrees F");

        var wind = $("<p>").text("Wind speed: " + response.wind.speed + " MPH");
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
        console.log(temp);
        console.log(wind);
        console.log(humidity);
        lat = response.coord.lat;
        lon = response.coord.lon;
        $.ajax({
            url:`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=513e25023118dcdae6ded6cbd2eb4069`,
            method:"get"
        }).then(function(response){
            console.log(response);
            var uv = $("<p>").text("UV Index: " + response.current.uvi);
            
            if (uv < 3.5) {
                $(uv).css("color", "green");
            }
            else if (uv > 7) {
                $(uv).css("color", "red");
            }
            else {
                $(uv).css("color", "orange");
            }
            console.log(uv);
            $("#weatherDetails").empty();
            $("#weatherDetails").append(cityName, temp, humidity, wind, uv);


        })
        // var displayWeather = $("#weatherDetails").empty();
           

    })
})

// function displayWeather() {
//     $("#weatherDetails").empty();

// }