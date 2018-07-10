//GIpghy API Key - rwb2FLtJsi0xauS9uoQNSQVLX10XIlJm
//Giphy url - https://api.giphy.com/v1/gifs/random?api_key=rwb2FLtJsi0xauS9uoQNSQVLX10XIlJm&tag=dog&rating=G

//OMDBI API Key - 7bcccd86
//OMDBI url - http://www.omdbapi.com/?i=tt3896198&apikey=7bcccd86&t=Interstellar&plot=short&y=2014



// var array = [['a',1],['b',2],['c',3],['d',4],['e',5],['f',6]];

// 	var pulledData;

// 	localStorage.setItem('items',JSON.stringify(array));
// 	pulleddata = JSON.parse(localStorage.getItem('items'));
// 	console.log(pulleddata);





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
var favorites = [];
var newFavorite = [];
var saveRetrieveData = [];
var stillImage, mp4Image, gifTitle;
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
        movies.push(upperString);
    }
})

//On initial document/page load default to the Giphy tab
$(document).ready(function(){
    $(".selectGiphy").trigger("click");
});

//When giphy tab is clicked initialize app with giphy api and update elements and content accordingly
//Also load the favorite giphys from the local storage
$(".selectGiphy").on('click',function(){
    giphyTab = 1;
    movieTab = 0;
    $( "#persistCheck" ).prop( "checked", false );
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

    saveRetrieveData = JSON.parse(localStorage.getItem('savedGiphys'));
    console.log(saveRetrieveData);
    for (i in saveRetrieveData){
        apiURLbyID = `https://api.giphy.com/v1/gifs/${saveRetrieveData[i]}?api_key=rwb2FLtJsi0xauS9uoQNSQVLX10XIlJm`;     
        $.ajax({
            url: apiURLbyID
        }).then(function(apiResp){
            // console.log(apiResp.data.images.fixed_width_still.url);
            stillImage = apiResp.data.images.fixed_width_still.url;
            mp4Image = apiResp.data.images.fixed_width.url;
            gifTitle = apiResp.data.slug;
            gifID = apiResp.data.id;
            newGiphyDiv = $('<div>').attr('class','giphyDiv');
            newGiphy = $('<img>').attr('src',stillImage).attr('data-stillurl',stillImage).attr('data-mp4url',mp4Image).attr('data-state','still').attr('class','giphyImage');
            newGiphyDiv.append(newGiphy);
            newGiphyDiv.append(($('<div>').attr('class','downloadButton').attr('data-href',stillImage).attr('data-title',gifTitle)).prepend('<i>').addClass('fa fa-download'));
            newGiphyDiv.append(($('<div>').attr('class','favoriteButton').attr('data-id',gifID).attr('data-title',gifTitle)).prepend('<i>').addClass('fas fa-trash-alt'));
            $('.gifWindow').prepend(newGiphyDiv);
        })
    }
})

//When movie tab is clicked initialize app with movie api
$(".selectMovie").on('click',function(){
    giphyTab = 0;
    movieTab = 1;
    $( "#persistCheck" ).prop( "checked", false );
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
    saveRetrieveData = [];
    apiUrl = url1+button.attr('data-value')+url2+button.attr('data-rating');
    if ($('#persistCheck').is(':checked')){
        
    }else{
        $('.gifWindow').empty();
    }
    //Load saved/favorite giphys
    saveRetrieveData = JSON.parse(localStorage.getItem('savedGiphys'));
    if(saveRetrieveData !== null){
        for (i in saveRetrieveData){
            apiURLbyID = `https://api.giphy.com/v1/gifs/${saveRetrieveData[i]}?api_key=rwb2FLtJsi0xauS9uoQNSQVLX10XIlJm`;     
            $.ajax({
                url: apiURLbyID
            }).then(function(apiResp){
                stillImage = apiResp.data.images.fixed_width_still.url;
                mp4Image = apiResp.data.images.fixed_width.url;
                gifTitle = apiResp.data.slug;
                gifID = apiResp.data.id;
                newGiphyDiv = $('<div>').attr('class','giphyDiv');
                newGiphy = $('<img>').attr('src',stillImage).attr('data-stillurl',stillImage).attr('data-mp4url',mp4Image).attr('data-state','still').attr('class','giphyImage');
                newGiphyDiv.append(newGiphy);
                newGiphyDiv.append(($('<div>').attr('class','downloadButton').attr('data-href',stillImage).attr('data-title',gifTitle)).prepend('<i>').addClass('fa fa-download'));
                newGiphyDiv.append(($('<div>').attr('class','favoriteButton').attr('data-id',gifID).attr('data-title',gifTitle)).prepend('<i>').addClass('fas fa-trash-alt'));
                $('.gifWindow').prepend(newGiphyDiv);
            })
        }
    }

    //On button click, load 10 Giphys at a time 
    for (var i=0;i<10;i++){
               
        $.ajax({
            url: apiUrl
        }).then(function(apiResp){
            // console.log(apiResp.data.images.fixed_width_still.url);
            stillImage = apiResp.data.images.fixed_width_still.url;
            mp4Image = apiResp.data.images.fixed_width.url;
            gifTitle = apiResp.data.title;
            gifID = apiResp.data.id;
            newGiphyDiv = $('<div>').attr('class','giphyDiv');
            newGiphy = $('<img>').attr('src',stillImage).attr('data-stillurl',stillImage).attr('data-mp4url',mp4Image).attr('data-state','still').attr('class','giphyImage');
            newGiphyDiv.append(newGiphy);
            newGiphyDiv.append(($('<div>').attr('class','downloadButton').attr('data-href',stillImage).attr('data-title',gifTitle)).prepend('<i>').addClass('fa fa-download'));
            newGiphyDiv.append(($('<div>').attr('class','favoriteButton').attr('data-id',gifID).attr('data-title',gifTitle)).prepend('<i>').addClass('fas fa-star'));
            $('.gifWindow').append(newGiphyDiv);
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
            $('.gifWindow').prepend(newMovieDiv);

        }
    })
})


//Download still image gif with the saved filename the same as giphy title name
$(document).on('click','.downloadButton', function() {
    let url = $(this).attr('data-href');
    let query = `https://query.yahooapis.com/v1/public/yql?q=select * from data.uri where url="${url}"&format=json&callback=`;
    let a = document.createElement("a");

    a.download = `${$(this).attr('data-title')}.gif`;
    
    fetch(query).then(response => response.json())
    .then(({query:{results:{url}}}) => {
        a.href = url;
        document.body.appendChild(a);
        a.click();  
    })
    .catch(err => console.log(err));
})


//Start and stop giphy when clicked
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

//Hover over Download button and update css accordingly on mouse enter and mouse exit
$(document).on('mouseenter','.downloadButton',function(){
    $(this).text('    Download');
    $(this).next('.fa-star').css('margin-left','74.5px');
    $(this).next('.fa-trash-alt').css('margin-left','74.5px');
})
$(document).on('mouseleave','.downloadButton',function(){
    $(this).text('');
    $('.fa-star').css('margin-left','148px')
    $('.fa-trash-alt').css('margin-left','148px');
})

//Save giphy to favorites array and savedGiphys local storage, when star/favorite button it clicked
$(document).on('click','.fa-star', function(){
    $(this).addClass('fa-trash-alt').removeClass('fa-star');
    newFavorite = $(this).attr('data-id');
    if(JSON.parse(localStorage.getItem('savedGiphys')) !== null){
        favorites = JSON.parse(localStorage.getItem('savedGiphys'));
        favorites.push(newFavorite);
    }
    else{
        favorites[0] = newFavorite;
    }    
    localStorage.setItem('savedGiphys',JSON.stringify(favorites));
})

//When clicking on the trash can icon, remove giphy from the favorites/saved list
$(document).on('click','.fa-trash-alt', function(){
    $(this).addClass('fa-star').removeClass('fa-trash-alt');
    favorites = JSON.parse(localStorage.getItem('savedGiphys'));
    var found = favorites.indexOf($(this).attr('data-id'));
    if(found !== -1){
        favorites.splice(found,1);
    }
    localStorage.setItem('savedGiphys',JSON.stringify(favorites));
})