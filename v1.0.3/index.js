const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const { parse } = require('path');
const { match } = require('assert');
const axios = require('axios');

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

app.get('/sptct_cdn/scdn/scdn_track_previews/:fformat/:fileid', async (req, res) => {
  const fileid = req.params.fileid;
  const fileformat = req.params.fformat;
  res.status(200).sendFile(__dirname + "/sources/track-preview/" + fileid + "." + fileformat);
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
/* 
 app.get('/api/spotify_ui_card/playlists', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(405).send("This method is unsupported")
 }); */

 app.get('/sptct_cdn/lottie-animations/:fformat/:filename', (req, res) => {
  res.setHeader('Content-Type', 'text/lottie');

  const fileid = req.params.filename;
  const fileformat = req.params.fformat;
  res.status(200).sendFile(__dirname + "/sources/lottie_animations/" + fileid + "." + fileformat);
});

 app.post('/api/use_spotify_api/spotify_ui_card/playlists', (req, res) => {
  
   const playlistExtId = req.body.p_id;

  // Get the name from the request body
 /* fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ // grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret
      grant_type: 'client_credentials',
      client_id: process.env.SPT_CLIENT_ID,
      client_secret: process.env.SPT_CLIENT_SECRET
    })
  })
    .then(response => response.json())
    .then(data => {
        const token = data.access_token;

        fetch('https://api.spotify.com/v1/playlists/' + playlistExtId, {
            method: 'GET',
            headers: {
              'Authorization': "Bearer " + token
            }
          })
            .then(response => response.json())
            .then(data => {
              
                res.setHeader('Content-Type', 'application/json');
               // res.status(200).send(JSON.stringify(data));
               console.log("data: " + data)
              if (data === 0) {
                const badJsonObject = {
                  error: "01",
                  error_desc: "Playlist does not exist!"
                }
                
                  res.status(200).send(JSON.stringify(badJsonObject));
              } else {
                
                const plistCover = data.images[0].url;
                const plistName = data.name;
                const plistUrl = data.external_urls.spotify;
                const plistOwner = data.owner.id;
                const plistDesc = data.description;
                const plistTrackPreview = data.tracks.items[0].track.preview_url;
                const plistId = data.id;
                
                const addData = fs.readFileSync(__dirname + '/playlist_list/user_definition.json', 'utf8');

                // Parse the JSON data
                const parsedData = JSON.parse(addData);
              
                // Check if parsedData is an array
                if (Array.isArray(parsedData)) {
                  // Find the data for the specified ID
                  const matchingData = parsedData.filter(item => item.user_id === plistOwner);
              
                  res.setHeader('Content-Type', 'application/json');
                  // Return the matching data
               //   res.status(200).send(JSON.stringify(matchingData));


               if (matchingData.length > 0) {
                  const jsonObject = {
                    plist_cover_url: plistCover,
                    plist_name: plistName,
                    plist_url: plistUrl,
                    plist_owner: plistOwner,
                    plist_description: plistDesc,
                    plist_track_preview: plistTrackPreview,
                    plist_id: plistId,
                    error: "none",
                    by_spotify: matchingData[0].by_spotify,
                    by_spikerko: matchingData[0].by_spikerko,
                    verified_status: matchingData[0].verified_status,
                    bg: matchingData[0].bg
                  }
                  
                  res.status(200).send(JSON.stringify(jsonObject));
               } else {
                    const jsonObject = {
                      plist_cover_url: plistCover,
                      plist_name: plistName,
                      plist_url: plistUrl,
                      plist_owner: plistOwner,
                      plist_description: plistDesc,
                      plist_track_preview: plistTrackPreview,
                      error: "none",
                      by_spotify: 'false',
                      by_spikerko: 'false',
                      verified_status: 'false',
                      bg: 'false'
                    }
                    
                    res.status(200).send(JSON.stringify(jsonObject));
                    
            

               }
                  
                } else {
                  // Invalid data structure
                  res.setHeader('Content-Type', 'application/json');
                  console.error('Invalid JSON data structure in /playlist_list/user_definition.json');
                  return res.status(400).send('Invalid JSON data structure in /playlist_list/user_definition.json');
                }

            


              }
           //    const plistPreview = data.tracks.items[0].name
                

                

            })
            .catch(error => {
              console.error(error);
            });

    })
    .catch(error => {
      console.error(error);
    }); */

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('grant_type', 'client_credentials');
    urlSearchParams.append('client_id', process.env.SPT_CLIENT_ID);
    urlSearchParams.append('client_secret', process.env.SPT_CLIENT_SECRET);

  axios.post('https://accounts.spotify.com/api/token',
    /* qs.stringify({
        grant_type: 'client_credentials',
        client_id: process.env.SPT_CLIENT_ID,
        client_secret: process.env.SPT_CLIENT_SECRET
    }), */
    urlSearchParams,
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
  )
    .then(response => response.data)
    .then(data => {

      const token = data.access_token;

      axios.get('https://api.spotify.com/v1/playlists/' + playlistExtId, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.data)
        .then(data => {
          res.setHeader('Content-Type', 'application/json');
          // res.status(200).send(JSON.stringify(data));
        //  console.log("data: " + data)
         if (data == '0') {
           const badJsonObject = {
             error: "01",
             error_desc: "Playlist does not exist!"
           }
           
             res.status(200).send(JSON.stringify(badJsonObject));
         } else {
           
           const plistCover = data.images[0].url;
           const plistName = data.name;
           const plistUrl = data.external_urls.spotify;
           const plistOwner = data.owner.id;
           const plistDesc = data.description;
           const plistTrackPreview = data.tracks.items[0].track.preview_url;
           const plistId = data.id;

           const addData = fs.readFileSync(__dirname + '/playlist_list/user_definition.json', 'utf8');

           // Parse the JSON data
           const parsedData = JSON.parse(addData);
         
           // Check if parsedData is an array
           if (Array.isArray(parsedData)) {
             // Find the data for the specified ID
             const matchingData = parsedData.filter(item => item.user_id === plistOwner);
         
             res.setHeader('Content-Type', 'application/json');
             // Return the matching data
          //   res.status(200).send(JSON.stringify(matchingData));

          if (matchingData.length > 0) {
            const jsonObject = {
              plist_cover_url: plistCover,
              plist_name: plistName,
              plist_url: plistUrl,
              plist_owner: plistOwner,
              plist_description: plistDesc,
              plist_track_preview: plistTrackPreview,
              plist_id: plistId,
              error: "none",
              by_spotify: matchingData[0].by_spotify,
              by_spikerko: matchingData[0].by_spikerko,
              verified_status: matchingData[0].verified_status,
              bg: matchingData[0].bg,
              by_kaajogurt123: matchingData[0].by_kaajogurt123
            }
            
            res.status(200).send(JSON.stringify(jsonObject));
         } else {
              const jsonObject = {
                plist_cover_url: plistCover,
                plist_name: plistName,
                plist_url: plistUrl,
                plist_owner: plistOwner,
                plist_description: plistDesc,
                plist_track_preview: plistTrackPreview,
                error: "none",
                by_spotify: 'false',
                by_spikerko: 'false',
                verified_status: 'false',
                bg: 'false',
                by_kaajogurt123: 'false'
              }
              
              res.status(200).send(JSON.stringify(jsonObject));
              
      

         }
            
           } else {
             // Invalid data structure
             res.setHeader('Content-Type', 'application/json');
             console.error('Invalid JSON data structure in /playlist_list/user_definition.json');
             return res.status(400).send('Invalid JSON data structure in /playlist_list/user_definition.json');
           }



         }
      //    const plistPreview = data.tracks.items[0].name
           

           


        }).catch(error => {
          console.error(error);
          // Handle API request error appropriately
        });
    })
    .catch(error => {
        console.error(error);
    });

});

app.get("/api", (req, res) => {

  res.setHeader('Content-Type', 'application/json');

  const jsonObject = {
    error: "This is a only POST api so this method is unsupported"
  }

  
  res.status(405).json(jsonObject);
})


app.get("/api/*", (req, res) => {

  res.setHeader('Content-Type', 'application/json');

  const jsonObject = {
    error: "This is a only POST api so this method is unsupported"
  }

  
  res.status(405).json(jsonObject);
})


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

  
  
app.get('/shhurl/*', (req, res) => {
 

  const originalUrlPN = req.url;

  const strPathName = originalUrlPN.replace("/shhurl", "");
//  const currentUrl = new URL(req.url);
 //console.log(strPathName);


  // Read the JSON file
  const data = fs.readFileSync('./shhurl/short_url_list.json', 'utf8');

  // Parse the JSON data
  const parsedData = JSON.parse(data);

  // Check if parsedData is an array
  if (Array.isArray(parsedData)) {
    // Find the data for the specified ID
    const matchingData = parsedData.filter(item => item.url_path === strPathName);

    res.setHeader('Content-Type', 'application/json');

  //  res.status(200).send(matchingData);
    if (matchingData == 0) {
      const jsonObject = {
        error: "URL is not specified in our JSON Url List."
      }
      console.log(matchingData)
      res.status(404).send(JSON.stringify(jsonObject));
    } else {
      const redirUrl = matchingData[0].redirection_url;
      const redirType = matchingData[0].redirection_type;
      /* const jsonObject = {
        redirection_url: matchingData[0].redirection_url
      } */
      // Return the matching data
    /// res.status(200).send(JSON.stringify(jsonObject));
        res.redirect(redirType, redirUrl)
    }

  } else {
    // Invalid data structure
    res.setHeader('Content-Type', 'application/json');
    console.error('Invalid JSON data structure in /playlist_list/plist.json');
    return res.status(400).send('Invalid JSON data structure in /playlist_list/plist.json');
  }

});


/* app.get('/shhurl', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
const jsonObject = {
  what_is_shhurl: "ShhUrl is an Open-Source URL Shortening Service made by Spikerko to be used for Node JS Application for short URLs."
}
res.status(200).send(JSON.stringify(jsonObject));
}) */

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}. http://localhost:${port}`);
});