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
        console.log(response)
        lat = response.coord.lat;
        lon = response.coord.lon;
        $.ajax({
            url:`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=513e25023118dcdae6ded6cbd2eb4069`,
            method:"get"
        }).then(function(response){
            console.log(response);
        })
    })
})