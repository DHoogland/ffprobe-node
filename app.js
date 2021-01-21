process.env.FFPROBE_PATH = '/usr/bin/ffprobe'
const ffprobe = require('ffprobe-client')

if(process.argv[2] === undefined){
    return console.log('Geef een url op')
}

const url = encodeURI(process.argv[2]);

async function run () {
    try {
        const data = await ffprobe(url)
        let audio = [{}];
        let video = [{}];

        for (i = 0; i < data.streams.length; i++) {
            const stream = data.streams[i];
            if(stream.codec_type === "video"){
                const framerate = stream.avg_frame_rate.split('/');
                const framerateSum = framerate[0]/framerate[1];

                video = {
                    'bitRate': stream.bit_rate,
                    'frameRate': framerateSum,
                    'resolution': {
                        'height': stream.height,
                        'width': stream.width
                    }
                };
            }

            if(data.streams[i].codec_type === "audio"){
                audio = [{
                    'bitrate': stream.bit_rate,
                    'channelLayout': stream.channel_layout,
                    'channels': stream.channels,
                    'sampleRate': stream.sample_rate
                }];
            }
        }

        const duration = data.format.duration * 1000; //convert to milliseconds
        const response = {
            'audio': audio,
            'bitrate': data.format.bit_rate,
            'duration': duration,
            'video': video
        };

        console.log(JSON.stringify(response));
    } catch (err) {
        console.error('Er heeft zich een probleem voorgedaan.')
    }
}

run()
