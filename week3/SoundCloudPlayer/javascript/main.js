// 1. Search

// 2. Query Soundcloud API

SC.initialize({
  client_id: '195d273fb18f4a9a75ebda65c1aa2631'
});

// find all sounds of buskers licensed under 'creative commons share alike'
SC.get('/tracks', {
  q: 'rilo kiley'
}).then(function(tracks) {
  console.log(tracks);
});

// 3. Populate/Display Cards

// 4. Populate Playlist and Play