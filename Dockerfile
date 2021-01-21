FROM node:10.23.1-alpine

# Create app directory
WORKDIR /usr/src/app

# Install FFMPEG with FFPROBE
RUN apk add ffmpeg

COPY . .

RUN npm install

CMD ["node", "app.js"]
