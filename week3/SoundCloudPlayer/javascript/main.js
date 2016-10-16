// 1. Search

var UI = {};

UI.enterPress = function() {

  document.querySelector('.js-search').addEventListener('keyup', function(e){

    var inputValue = document.querySelector('input').value;
    if(e.which===13) 
    SoundCloudAPI.getTrack(inputValue);
  });

}
UI.enterPress();



UI.submitClick = function() {

  document.querySelector('.js-submit').addEventListener('click', function(){

    var inputValue = document.querySelector('input').value;
    if (inputValue == '') {
      alert("Enter a Search Term");
    } else {
    SoundCloudAPI.getTrack(inputValue);
    }
  });
}

UI.submitClick();

UI.clearSearch = function() {
    
    document.querySelector(".search-results").innerHTML = "";    
}
UI.clearSearch();



// 2. Query Soundcloud API


var SoundCloudAPI = {};

SoundCloudAPI.init = function() {

  SC.initialize({
    client_id: '195d273fb18f4a9a75ebda65c1aa2631'
  });

}

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(inputValue) {

  UI.clearSearch();

  SC.get('/tracks', {
    q: inputValue
  }).then(function(tracks) {
    console.log(tracks);
    SoundCloudAPI.renderTracks(tracks);
  });
}



// 3. Populate/Display Cards
SoundCloudAPI.renderTracks = function(tracks) {

  tracks.forEach(function(track){
    //card
    var card = document.createElement('div');
    card.classList.add('card');

    var searchResults = document.querySelector(".search-results");
    searchResults.appendChild(card);

    //image
    var imageDiv = document.createElement('div');
    imageDiv.classList.add('image');

    var image_img = document.createElement('img');
    image_img.classList.add('image_img');
    image_img.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract/';
    imageDiv.appendChild(image_img);
    card.appendChild(imageDiv);

    //content
    var content = document.createElement('div');
    content.classList.add('content');
    card.appendChild(content);

    //header
    var header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">' + track.title + '</a>';
    content.appendChild(header);

    //button
    var button = document.createElement('div');
    button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');
    card.appendChild(button);

    //icon
    var icon = document.createElement('i');
    icon.classList.add('add', 'icon');
    button.appendChild(icon);

    //button
    var buttonText = document.createElement('span');
    buttonText.innerHTML = 'Add to Playlist';
    button.appendChild(buttonText);

    //click event
    button.addEventListener('click', function(){
      SoundCloudAPI.getEmbed(track.permalink_url);
    });



  });

};


// 4. Populate Playlist and Play

SoundCloudAPI.getEmbed = function(trackURL) {
  SC.oEmbed(trackURL, {
    auto_play: false
  }).then(function(embed){
    console.log('oEmbed response: ', embed);

      var sideBar = document.querySelector('.js-playlist');
      var box = document.createElement('div');
      box.innerHTML = embed.html;

      sideBar.appendChild(box, sideBar.firstChild);
      localStorage.setItem("key", sideBar.innerHTML);

  });

}

var sideBar = document.querySelector(".js-playlist");
sideBar.innerHTML = localStorage.getItem('key');


// 5. delete playlist

UI.deletePlaylist = function () {

  var sideBar = document.querySelector('sidebar');
  localStorage.removeItem("key", 'sideBar.innerHTML');

  }

//create delete button
var sideBar = document.querySelector('.js-sidebar');
var button = document.createElement('div');
button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');
sideBar.appendChild(button);


// 6. skip to next song in playlist

