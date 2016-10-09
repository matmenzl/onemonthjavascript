
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


    for(var i = 0; i < imageURLs.length; i++) {

        var src = imageURLs[i].images.fixed_height.url;

        //loop works outside of setTimout
        // clearTV();
        box.innerHTML = box.innerHTML + '<img src="' + src + '">';

        setTimeout(function(){
          //inside setTimout same gif gets printed in the defined intervall
          console.log(src);
          //iteration gets passed through though
          // clearTV();
          // box.innerHTML = box.innerHTML + '<img src="' + src + '">';
      },2000*i);
    };
  };

  function clearTV() {
      document.querySelector(".box").innerHTML = "";    
  };







