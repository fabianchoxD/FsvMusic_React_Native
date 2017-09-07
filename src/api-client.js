const URL = 'https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=france&api_key=279d58f408a2eb774552b45319a5af0f&format=json';

function getArtists(){
    return fetch(URL)
        .then(response => response.json())
        .then(data => data.topartists.artist)
        .then(artists =>artists.map(artist => {
            return {
                id: artist.mbid,
                name: artist.name,
                image: artist.image[3]['#text'],
                url: artist.url,
                likes: 400,
                comments: 200,
            }
        }))

}

export{ getArtists }