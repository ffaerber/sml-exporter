FROM resin/rpi-raspbian:jessie
MAINTAINER Felix Faerber <ffaerber@gmail.com>

RUN apt-get update -qq && apt-get install vim wget
RUN wget https://nodejs.org/dist/v11.0.0/node-v11.0.0-linux-armv7l.tar.gz --no-check-certificate
RUN tar -xvf node-v11.0.0-linux-armv7l.tar.gz
RUN cp -R node-v11.0.0-linux-armv7l/. /usr/local/

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN apt-get install -y build-essential node-gyp
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]
