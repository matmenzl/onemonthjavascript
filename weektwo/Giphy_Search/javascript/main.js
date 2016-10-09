/*
comment: 
Initially I didn't find out how to delete the container.innerHTML 
of the first search and have it replaced with the second 
search-output until I got the hint from the community. I figured out that I had
to check .js-container with an emtpy-string myself but my main issue was, where to make the function-call. I also tried it with the remove()-method, but wasn't successfull... 

I wrapped the src-image in a a href in order to make it possible to share it from the app immeditely to social networks

Another feature I tried to add, but failed, was a copy to clipboard-button on each gif.
*/

/*1. grab the input and prevent from empty searches*/


  document.querySelector('.js-go').addEventListener('click', function(){

    var input = document.querySelector("input").value;
    if (input == '') {
      alert("Enter a Search Term");
    } else {
      getData(input);
    }
  });

  document.querySelector('.js-userinput').addEventListener('keyup', function(e){

    var input = document.querySelector("input").value;
    if (input=='') {
      alert("Enter a Search Term")
    } else {
      //if the key ENTER is pressed then execute
      if(e.which===13) {
        getData(input);
    }
    }
  });


/*2. get the data from giphy*/

function getData(input){
  var url = 'http://api.giphy.com/v1/gifs/search?q=' + input + '&api_key=dc6zaTOxFJmzC'; 

  //Ajax Request
  var GiphyAJAXCall = new XMLHttpRequest();
  GiphyAJAXCall.open ('GET', url );
  GiphyAJAXCall.send();

  GiphyAJAXCall.addEventListener('load', function(e){

    var data = e.target.response;
    pushToDOM(data);
  });
};



/*3. show the gifs*/

function pushToDOM(data) {

  clearSearch(); 

  var response = JSON.parse(data);
  var imageURLs = response.data;
  var container = document.querySelector(".js-container");

  imageURLs.forEach(function(image){

    var src = image.images.fixed_height.url;
    console.log(src);
    container.innerHTML = container.innerHTML + '<a href="' + src + '"><img src="' + src + '"class="container-image"></a>'
  });
}

// 4. reset search
function clearSearch() {
    
    document.querySelector(".js-container").innerHTML = "";    
    
}









