$( document ).ready(function() { //load it when it is ready

    $('.sections').on('change', function(event){ //whenever dropbox changes
      event.preventDefault();
      $('.item-container').empty();
      $('.categories').prepend('<p class="ajax-loader"><img src="images/ajax-loader.gif" alt="loading"></p> ');
      $('.initial').addClass("minimize");
      var $selection = $('.sections :selected').val(); //it stores the value after selected

      $.ajax({//get Api
        method: 'GET',
        dataType: 'json',
        url: 'http://api.nytimes.com/svc/topstories/v1/' + $selection + '.json?api-key=c37f75561abe3523181a126c4cb4dc92:12:75124075'})

        .done(function(data){ //when it is successful grabing the json
           console.log(data);

           $('.ajax-loader').remove();

           var nytData = data.results,
                         articleLink,
                         articleCaption,
                         articleImageUrl;

         //get populate only 12stories with images
              nytData = nytData
                        .filter(function(item){
                            return item.multimedia.length;
                          }).splice(0, 12);

      var nytItems = " ";

       for(var i=0; i<12; i++){
            articleImageUrl = nytData[i].multimedia[4].url;
            articleCaption = nytData[i].abstract;
            articleLink = nytData[i].url;

            nytItems += '<li class="article-item">';
            nytItems += '<a class="articleimage" href="' + articleLink + '" target="_blank" style="background-image:url(\'' + articleImageUrl + '\');">';
            nytItems += '<p class="text-container">' + articleCaption + '</p></a></li>';
          }

          $('.item-container').append(nytItems);

    }); //done function
  }); // change function
}); //ready function
