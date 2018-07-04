//GIpghy API Key - rwb2FLtJsi0xauS9uoQNSQVLX10XIlJm
//Giphy url - https://api.giphy.com/v1/gifs/random?api_key=rwb2FLtJsi0xauS9uoQNSQVLX10XIlJm&tag=dog&rating=G

//////////////////////////////////////////CATEGORY ARRAY/////////////////////////////////////////////////
var topics = ['dogs','cats','elephants','puppies','kittens','monkeys','turtle'];

/////////////////////////////////////////VARIABLES///////////////////////////////////////////////////////
var index;
var upperString;
var apiUrl;
var button;
var image;
var newGiphy;
var toPersist = 0;
////////////////////////////////////////FUNCTIONS///////////////////////////////////////////////////////

//load buttons from the preloaded array
for (index in topics){
    upperString = topics[index][0].toUpperCase() + topics[index].substr(1).toLowerCase();
    $(".buttonContainer").append($('<button>').text(upperString).attr('class','categoryButton').attr('data-value',upperString).attr('data-rating','G'));
}

//Create new button based on user input
$('#userSubmit').on('click',function(){
    upperString = ($('#typedInput').val())[0].toUpperCase() + ($('#typedInput').val()).substr(1).toLowerCase();
    $('.buttonContainer').prepend($('<button>').text(upperString).attr('class','categoryButton').attr('data-value',upperString).attr('data-rating',$('#ratingSelect').val()).css('background-color',$('#colorSelect').val()));
    // $('.buttons').append($('<button>').text(upperString).attr('class','categoryButton').attr('data-value',upperString).attr('data-rating',$('#ratingSelect').val()).css('background-color',$('#colorSelect').val()));
})

$(document).ready(function(){
    $(".selectGiphy").trigger("click");
});

$(".selectGiphy").on('click',function(){
    $(this).css('background-color','white');
    $(".gifWindow").empty();
})

//call giphy api and loads specific giphys
$(document).on('click','.categoryButton',function(){
    button = $(this);
    apiUrl = 'https://api.giphy.com/v1/gifs/random?api_key=rwb2FLtJsi0xauS9uoQNSQVLX10XIlJm&tag='+button.attr('data-value')+'&rating='+button.attr('data-rating');
    if ($('#persistCheck').is(':checked')){
        
    }else{
        $('.gifWindow').empty();
    }
    for (var i=0;i<10;i++){
               
        $.ajax({
            url: apiUrl
        }).then(function(apiResp){
            console.log(apiResp.data.images.fixed_width_still.url);
            stillImage = apiResp.data.images.fixed_width_still.url;
            mp4Image = apiResp.data.images.fixed_width.url;
            newGiphy = $('<img>').attr('src',stillImage).attr('data-stillurl',stillImage).attr('data-mp4url',mp4Image).attr('data-state','still').attr('class','giphyImage');
            $('.gifWindow').append(newGiphy);
        })
    }
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

