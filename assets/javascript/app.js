//GIpghy API Key - rwb2FLtJsi0xauS9uoQNSQVLX10XIlJm
//Giphy url - https://api.giphy.com/v1/gifs/random?api_key=rwb2FLtJsi0xauS9uoQNSQVLX10XIlJm&tag=dog&rating=G

//OMDBI API Key - 7bcccd86
//OMDBI url - http://www.omdbapi.com/?i=tt3896198&apikey=7bcccd86&t=Interstellar&plot=short&y=2014

//////////////////////////////////////////CATEGORY ARRAY/////////////////////////////////////////////////
var topics = ['dogs','cats','elephants','puppies','kittens','monkeys','turtle'];
var movies = [['Interstellar','2014'],['Snatch','2000'],['Avatar','2009'],['Dunkirk','2017'],['Aliens','1986'],['The Shawshank Redemption','1994']];

/////////////////////////////////////////VARIABLES///////////////////////////////////////////////////////
var index;
var upperString;
var apiUrl;
var button;
var image;
var newGiphy;
var newMovie;
var toPersist = 0;
var giphyTab;
var movieTab;
var url1 = ""; 
var url2 = "";
var newMovieDiv,newMovieTitle,newMoviePoster,newMoviePlot,newMovieRating,newMovieRuntime,newMovieGenre,newMovieActors,newMovieDirector;
////////////////////////////////////////FUNCTIONS///////////////////////////////////////////////////////

//load buttons from the preloaded array
for (index in topics){
    upperString = topics[index][0].toUpperCase() + topics[index].substr(1).toLowerCase();
    $(".buttonContainer").append($('<button>').text(upperString).addClass('giphyButton categoryButton').attr('data-value',upperString).attr('data-rating','G'));
}

for (index in movies){
    upperString = movies[index][0][0].toUpperCase() + movies[index][0].substr(1).toLowerCase();
    $(".buttonContainer").append($('<button>').text(upperString).addClass('hide movieButton categoryButton').attr('id','movieButton').attr('data-value',upperString).attr('data-year',movies[index][1]));
}

//Create new button based on user input
$('#userSubmit').on('click',function(){
    upperString = ($('#typedInput').val())[0].toUpperCase() + ($('#typedInput').val()).substr(1).toLowerCase();
    
    if(giphyTab == 1){
        $('.buttonContainer').prepend($('<button>').text(upperString).addClass('giphyButton categoryButton').attr('data-value',upperString).attr('data-rating',$('#ratingSelect').val()).css('background-color',$('#colorSelect').val()));
        topics.push(upperString);
    }
    else if( movieTab == 1){
        $('.buttonContainer').prepend($('<button>').text(upperString).addClass('movieButton categoryButton').attr('data-value',upperString).attr('data-year',$('#inputYear').val()).css('background-color',$('#colorSelect').val()));
        topics.push(upperString);
    }
})

//On initial document/page load default to the Giphy tab
$(document).ready(function(){
    $(".selectGiphy").trigger("click");
});

//When giphy tab is clicked initialize app with giphy api
$(".selectGiphy").on('click',function(){
    giphyTab = 1;
    movieTab = 0;
    $(this).css('background-color','white');
    $(".selectMovie").css('background-color','rgba(128, 128, 128, 0.8)');
    $('.movieButton').addClass('hide');
    $('.giphyButton').removeClass('hide');
    $('#catSpan').text('category');
    $('#typedInput').val("");
    $('#buttonSpan').text('Category');
    $('#persistSpan').text('Gifs');
    $("#dropdownSpan").text('Rating');
    $("#inputYear").addClass('hide');
    $("#ratingSelect").removeClass('hide');
    $(".gifWindow").empty();
    url1 = 'https://api.giphy.com/v1/gifs/random?api_key=rwb2FLtJsi0xauS9uoQNSQVLX10XIlJm&tag=';
    url2 = '&rating=';
})

//When movie tab is clicked initialize app with movie api
$(".selectMovie").on('click',function(){
    giphyTab = 0;
    movieTab = 1;
    $(this).css('background-color','white');
    $(".selectGiphy").css('background-color','rgba(128, 128, 128, 0.8)');
    $(".gifWindow").empty();
    $('.giphyButton').addClass('hide');
    $('.movieButton').removeClass('hide');
    $('#catSpan').text('movie');
    $('#typedInput').val("");
    $('#buttonSpan').text('Movie');
    $('#persistSpan').text('Movies');
    $("#dropdownSpan").text('Year');
    $("#inputYear").removeClass('hide');
    $("#ratingSelect").addClass('hide');

    url1 = 'http://www.omdbapi.com/?i=tt3896198&apikey=7bcccd86&t=';
    url2 = '&plot=full&y=';
})



//call giphy api and loads specific giphys
$(document).on('click','.giphyButton',function(){
    button = $(this);
    apiUrl = url1+button.attr('data-value')+url2+button.attr('data-rating');
    if ($('#persistCheck').is(':checked')){
        
    }else{
        $('.gifWindow').empty();
    }
    for (var i=0;i<10;i++){
               
        $.ajax({
            url: apiUrl
        }).then(function(apiResp){
            // console.log(apiResp.data.images.fixed_width_still.url);
            stillImage = apiResp.data.images.fixed_width_still.url;
            mp4Image = apiResp.data.images.fixed_width.url;
            newGiphy = $('<img>').attr('src',stillImage).attr('data-stillurl',stillImage).attr('data-mp4url',mp4Image).attr('data-state','still').attr('class','giphyImage');
            $('.gifWindow').append(newGiphy);
        })
    }
})

//call omdbi api and loads specific movie
$(document).on('click','.movieButton',function(){
    button = $(this);
    apiUrl = url1+button.attr('data-value')+url2+button.attr('data-year');
    
    if ($('#persistCheck').is(':checked')){
        
    }else{
        $('.gifWindow').empty();
    }    
               
    $.ajax({
        url: apiUrl
    }).then(function(apiResp){
        console.log(apiUrl);
        console.log(apiResp);

        if(apiResp.Response == 'True'){
            newMovieDiv = $('<div>').attr('class','movieDiv');
            newMovieTitle = $('<p>').text(apiResp.Title).attr('class','movieTitle');
            newMoviePoster = $('<img>').attr('src',apiResp.Poster).attr('class','moviePoster');
            newMoviePlot = ($('<p>').text(apiResp.Plot).attr('class','moviePlot')).append('<br>','<br>');
            newMovieRating = ($('<p>').html('<u>Rated:</u> '+apiResp.Rated).attr('class','movieRated')).append('<br>','<br>');
            newMovieRuntime = ($('<p>').html('<u>Runtime:</u> '+apiResp.Runtime).attr('class','movieRuntime')).append('<br>','<br>');
            newMovieGenre = ($('<p>').html('<u>Genre:</u> '+apiResp.Genre).attr('class','movieGenre')).append('<br>','<br>');
            newMovieActors = ($('<p>').html('<u>Actors:</u> '+apiResp.Actors).attr('class','movieActors')).append('<br>','<br>');
            newMovieDirector = ($('<p>').html('<u>Director:</u> '+apiResp.Director).attr('class','movieDirector')).append('<br>','<br>');

            newMovieDiv.append(newMovieTitle,newMoviePoster,newMoviePlot,newMovieRating,newMovieRuntime,newMovieGenre,newMovieDirector,newMovieActors);
            // newMovie = $
            $('.gifWindow').append(newMovieDiv);

        }

        

    })
})






//Start and stop giphy
$(document).on('click','.giphyImage',function(){
    image = $(this);
    if(image.attr('data-state') === 'still'){
        image.attr('src',image.attr('data-mp4url'));
        image.attr('data-state','play'); 
    }
    else if(image.attr('data-state') === 'play'){
        image.attr('src',image.attr('data-stillurl'));
        image.attr('data-state','still');
    }
})

