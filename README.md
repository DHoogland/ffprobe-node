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
`{"audio":[{"bitrate":"448000","channelLayout":"5.1(side)","channels":6,"sampleRate":"48000"}],"duration":596480,"video":{"frameRate":24,"resolution":{"height":480,"width":854}}}`
