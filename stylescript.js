//wrap the ajax call in an .on"click" event 
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="
var lat;
var lon;

$("#searchCity").on("click", function (event) {
    event.preventDefault();
    var cityName = $("#cityName").val();
    console.log(cityName);

    $.ajax({
        url: queryURL + cityName + "&appid=513e25023118dcdae6ded6cbd2eb4069",
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var temp = ((9 / 5) * response.main.temp - 459.67).toFixed(2);
        temp = $("<p>").text("Temperature: " + temp + " degrees F");

        var wind = $("<p>").text("Wind speed: " + response.wind.speed + " MPH");
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
        lat = response.coord.lat;
        lon = response.coord.lon;

        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=513e25023118dcdae6ded6cbd2eb4069`,
            method: "GET"
        }).then(function (response) {
            var uvValue = response.current.uvi;
            var uv = $("<p>").text("UV Index: " + response.current.uvi);

            if (uvValue < 3.5) {
                $(uv).css("color", "green");
            }
            else if (uvValue > 7) {
                $(uv).css("color", "red");
            }
            else {
                $(uv).css("color", "orange");
            }
            $("#weatherDetails").empty();
            $("#fiveDayRendered").empty();
            $("#weatherDetails").append("<h1>" + cityName + "</h1>", temp, humidity, wind, uv);

            var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + "513e25023118dcdae6ded6cbd2eb4069"

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(queryURL);
                console.log(response);

                var fiveDay = response.list.filter(function (item) {
                    return item.dt_txt.includes("12:00:00")
                })
                // console.log(fiveDay);
                displayPanel(fiveDay);

            })

            })
            // var displayWeather = $("#weatherDetails").empty();
            // use moment for 5 day


        })
    })

function displayPanel(data) {
    console.log(data)
    for (i = 0; i < data.length; i++) {

        createPanel(data[i])
    }

    
    function createPanel(dataPoint) {

        var panel = $("<div>").addClass("card border-dark cardDay").css({"width": "18%", "height": "200px", "background-color": "#037ffc", "padding": "20px", "margin": "4px"});
        var panelDate = $("<div>").addClass("panel-body").text(moment(dataPoint.dt_txt).format("MMMM DD YYYY"))
        var panelTemp = $("<div>").addClass("panel-body").text(dataPoint.main.temp)
        var fTemp = ((9 / 5) * dataPoint.main.temp - 459.67);
        // var fTemp = (dataPoint.main.temp - 273.15) * 1.80 + 32;
        panelTemp = "Average Temp: " + fTemp.toFixed(2) + " &deg;" + "F"
        $(fTemp).html(fTemp.toFixed(2));
        var panelImg = $("<img>").css({"width": "30%"});
        panelImg.attr("src", "https://openweathermap.org/img/wn/" + dataPoint.weather[0].icon + ".png")
        var panelHumidity = $("<div>").addClass("panel-body").text("Humidity: " + dataPoint.main.humidity)
        panel.append(panelDate, panelTemp, panelImg, panelHumidity).appendTo($("#fiveDayRendered"))
    }
}