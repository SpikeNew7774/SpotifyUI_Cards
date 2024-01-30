const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const { parse } = require('path');


const corsOptions = {
    origin: [
      'https://spikerko.org'
    ],
    /* allowedHeaders: ['Content-Type', 'application/json'], */
    methods: ['POST'] // Allow specific methods
  };
  
  const corsMiddleware = cors(corsOptions);

  app.use(corsMiddleware);  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/favicon.ico', async (req, res) => {
  res.status(200).sendFile(__dirname + "/sources/transparent_bin/transparent_bin.webp");
});

app.get('/playlist/database.json', async (req, res) => {
  res.status(200).sendFile(__dirname + "/playlist_list/dropdown_menu.json");
});

app.get('/:fformat/images/:filename', async (req, res) => {
    const fname = req.params.filename;
    const fileformat = req.params.fformat;
    res.status(200).sendFile(__dirname + "/sources/images/" + fname + "." + fileformat)
});

/* app.get('/webp/images/:filename', async (req, res) => {
  const fname = req.params.filename;
  res.status(200).sendFile(__dirname + "/sources/images/" + fname + ".webp")
});

app.get('/png/images/:filename', async (req, res) => {
  const fname = req.params.filename;
  res.status(200).sendFile(__dirname + "/sources/images/" + fname + ".png")
}); */

app.get('/sptct_cdn/images/:fformat/:filename', async (req, res) => {
  const fname = req.params.filename;
  const fileformat = req.params.fformat;
  res.status(200).sendFile(__dirname + "/sources/images/spotify_officials_logo/" + fname + "." + fileformat)
});

app.get('/sptct_cdn/verf_images/:fformat/:filename', async (req, res) => {
  const fname = req.params.filename;
  const fileformat = req.params.fformat;
  res.status(200).sendFile(__dirname + "/sources/images/verf/" + fname + "." + fileformat)
});

app.get('/:fformat/bg_images/:filename', async (req, res) => {
    const fname = req.params.filename;
    const fileformat = req.params.fformat;
    res.status(200).sendFile(__dirname + "/sources/bg_images/" + fname + "." + fileformat)
});

app.get('/css/styles/:filename', async (req, res) => {
    const fname = req.params.filename;
    res.status(200).sendFile(__dirname + "/sources/styles/" + fname + ".css")
});

app.get('/spotify_card/:filename', async (req, res) => {
    const fname = req.params.filename;
    res.status(200).sendFile(__dirname + "/html_pages/" + fname + ".html")
});

app.get('/', async (req, res) => {
  const fname = req.params.filename;
  res.status(200).sendFile(__dirname + "/html_pages/" + "home" + ".html")
});

/* app.get('/spotify_card/:plistid/:filename', async (req, res) => {
    const fname = req.params.filename;
    const plistid = req.params.plistid
    res.status(200).sendFile(__dirname + "/html_pages/" + fname + ".html?cardPlaylistID=" + plistid)
}); */

app.get('/getdir/scdn/scdn_track_previews/:songid', async (req, res) => {
    const songid = req.params.songid;
    res.status(200).sendFile(__dirname + "/sources/track-preview/" + "song-id_-_" + songid + "/" + songid + ".mp3")
});



app.post('/api/spotify_dropdown_menu_options/playlists', (req, res) => {
 
  // Get the name from the request body
const authPsswd = req.body.auth;

if (authPsswd == "fc6d4705207280079474cee14b3ef6a4") {
    // Read the JSON file
    const data = fs.readFileSync(__dirname + '/playlist_list/dropdown_menu.json', 'utf8');

    // Parse the JSON data
    const parsedData = JSON.parse(data);

    // Check if parsedData is an array
    if (parsedData) {
      // Find the data for the specified ID
      res.setHeader('Content-Type', 'application/json');
      // Return the matching data
      res.status(200).send(JSON.stringify(parsedData));

      
    } else {
      // Invalid data structure
      res.setHeader('Content-Type', 'application/json');
      console.error('Invalid JSON data structure in /playlist_list/dropdown_menu.json');
      return res.status(400).send('Invalid JSON data structure in /playlist_list/dropdown_menu.json');
    }
} else {
  res.setHeader('Content-Type', 'application/json');
  return res.status(403).send('Authetication Failed');
} //feYAq#gnTxus%y8WvPFw5!tKtw&q562c


});





app.post('/api/spotify_ui_card/playlists', (req, res) => {
 
     // Get the name from the request body
   const playlisturlid = req.body.p_id;
  
   // Read the JSON file
   const data = fs.readFileSync(__dirname + '/playlist_list/plist.json', 'utf8');
 
   // Parse the JSON data
   const parsedData = JSON.parse(data);
 
   // Check if parsedData is an array
   if (Array.isArray(parsedData)) {
     // Find the data for the specified ID
     const matchingData = parsedData.filter(item => item.p_id === playlisturlid);
 
     res.setHeader('Content-Type', 'application/json');
     // Return the matching data
     res.status(200).send(JSON.stringify(matchingData));
   } else {
     // Invalid data structure
     res.setHeader('Content-Type', 'application/json');
     console.error('Invalid JSON data structure in /playlist_list/plist.json');
     return res.status(400).send('Invalid JSON data structure in /playlist_list/plist.json');
   }
 });

 app.get('/api/spotify_ui_card/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(405).send("This method is unsupported")
 });


/*  app.get('/data/:id', (req, res) => {
    // Extract ID from the request URL
    const id = parseInt(req.params.id);
  
    // Read the JSON file
    const data = fs.readFileSync(__dirname + '/f/data.json', 'utf8');
  
    // Parse the JSON data
    const parsedData = JSON.parse(data);
  
    // Check if parsedData is an array
    if (Array.isArray(parsedData)) {
      // Find the data for the specified ID
      const matchingData = parsedData.filter(item => item.id === id);
  
      res.setHeader('Content-Type', 'application/json');
      // Return the matching data
      res.status(200).send(JSON.stringify(matchingData));
    } else {
      // Invalid data structure
      console.error('Invalid JSON data structure in data.json');
      return res.status(400).send('Invalid data format');
    }
  }); */
  

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening on port ${port}. http://localhost:${port}`);
});