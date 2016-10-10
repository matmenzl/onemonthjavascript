
/*1 get the data from giphy*/

var url = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC"; 

  //Ajax Request
  var GiphyAJAXCall = new XMLHttpRequest();
  GiphyAJAXCall.open ('GET', url );
  GiphyAJAXCall.send();

  GiphyAJAXCall.addEventListener('load', function(e){

    var data = e.target.response;
    showGiphs(data);
  });


/*3. show the gifs*/

function showGiphs(data){

  var response = JSON.parse(data);
  var imageURLs = response.data;
  var box = document.querySelector(".box");

  for(i = 0; i < imageURLs.length; i++) {
        setDelay(i)
    };

    function setDelay(x) {
      setTimeout(function(){
        var src = imageURLs[x].images.fixed_height.url;
        box.innerHTML = '<img src="' + src + '">';
      }, 5000*i);
    }
  };


  // article that helped: https://coderwall.com/p/_ppzrw/be-careful-with-settimeout-in-loops with setTimout in foor loops










