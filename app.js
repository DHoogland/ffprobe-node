process.env.FFPROBE_PATH = '/usr/bin/ffprobe'
const ffprobe = require('ffprobe-client')

if(process.argv[2] === undefined){
    return console.log('Geef een url op')
}

const url = encodeURI(process.argv[2]);

async function run () {
    try {
        const data = await ffprobe(url)

        // TODO: make response as defined
        let audio = [{}];
        let video = [{}];

        for (i = 0; i < data.streams.length; i++) {
            const stream = data.streams[i];
            if(stream.codec_type === "video"){
                video = {
                    'bitRate': stream.bit_rate,
                    'frameRate': stream.avg_frame_rate, //TODO
                    'resolution': {
                        'height': stream.height,
                        'width': stream.width
                    }
                };
            }

            if(data.streams[i].codec_type === "audio"){
                audio = [{
                    'bitrate': 160000,
                    'channelLayout': 'stereo',
                    'channels': 2,
                    'sampleRate': 44100
                }];
            }
        }

        const response = {
            'audio': audio,
            'bitrate': data.format.bit_rate,
            'duration': data.format.duration, //TODO
            'video': video
        };

        console.log(JSON.stringify(response));
    } catch (err) {
        console.error(err)
    }
}

run()
