#FFPROBE NodeJS Docker
## How to
```
docker build -t ffprobe-node .
docker run ffprobe-node node app [url]
```

Test URL:
- https://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_surround.avi

### Example
`docker run ffprobe-node node app https://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_surround.avi`

##### Response
`{"audio":[{"bitrate":160000,"channelLayout":"stereo","channels":2,"sampleRate":44100}],"duration":"596.480000","video":{"frameRate":"24/1","resolution":{"height":480,"width":854}}}
`
