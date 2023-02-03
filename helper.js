const test = require('dotenv').config()
var axios = require('axios');
const {API_URL, WORDS} = require("./constants");
let {KEYS} = require("./constants");
const {db} = require("./models");
const {parseInputDatesAsUTC} = require("pg/lib/defaults");
let keyIndex = 0;

function getConfig(searchText, pagetoken) {
    if (process.env.NODE_ENV == 'development') {
        KEYS = [process.env.YT_KEY_0];
    }
    var config = {
        method: 'get',
        url: `${API_URL}?q=${searchText}&key=${KEYS[keyIndex]}&type=video&part=snippet&pageToken=${pagetoken}`,
    };
    return config;
}

module.exports.allInterval = () => {
    setInterval(async () => {
        var nextPageToken = '';
        for (let i = 0; i < WORDS.length; i++) {
            setTimeout(async () => {
                try {
                    if (keyIndex > KEYS.length - 1) {
                        console.log("KEYS EXHAUSTED")
                        return;
                    }
                    let data = await axios(getConfig(WORDS[i], nextPageToken));
                    nextPageToken = data.nextPageToken;
                    let videoData = data.data.items.map(async video => {
                        await db.Video.create({
                            videoID: video.id.videoId,
                            title: video.snippet.title,
                            description: video.snippet.description,
                            pubished_at: video.snippet.publishTime,
                            thumbnail_urls: video.snippet.thumbnails,
                            word_id: i
                        })
                    })
                } catch (e) {
                    keyIndex++;
                }
            }, 0)
        }
    }, 10000);
}

module.exports.validVariable = (variable) => {
    if (variable != undefined && variable != NaN && variable != null) {
        return variable;
    }
    return false;
}