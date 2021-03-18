"use strict";
//$.get(url, [data], successFunction)

// PART 1: SHOW A FORTUNE
//MAke a function to add arg=RESULTS into (Html element #fortune-text) in index.html
function replaceFortune(results) {
    $("#fortune-text").html(results);
}


function showFortune(evt) {
    //From Server.py get /fortune function, the pass in the replaceFortune above into index.html
    $.get('/fortune', replaceFortune)
    // .get(/fortune) will give us the "return random.choice(FORTUNES)"
    // replaceFortune funct will pass in FORTUNES
}

$('#get-fortune-button').on('click', showFortune);





// PART 2: SHOW WEATHER

function replaceWeather(results) {
    $("#weather-info").html(results.temp);
}
//JSONOBJECT: 
//{temp: TEMP, forecast: FORECAST}

function showWeather(evt) {
    evt.preventDefault();

    let url = "/weather.json";
    let formData = {"zipcode": $("#zipcode-field").val()};

    $.get(url, formData, replaceWeather)
    // TODO: request weather with that URL and show the forecast in #weather-info
}

$("#weather-form").on('submit', showWeather);




// PART 3: ORDER MELONS

function replaceMelons(results) {
    if (results.code === "OK") {
        $("#order-status").html("<p>" + results.msg + "</p>");
    } 
    else if (results.code === "ERROR1") {
        $('#order-status').html("<p><b>" + results.msg + "</b></p>");
    }
    else {
        $("#order-status").html("<p>" + results.msg + "</p>");
    }
}

function orderMelons(evt) {
    evt.preventDefault();

    let formInputs = {
        'melon_type': $('#melon-type-field').val(),
        'qty': $('#qty-field').val()
    };

    $.post('/order-melons.json', formInputs, replaceMelons);

    // TODO: show the result message after your form
    // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}

$("#order-form").on('submit', orderMelons);


