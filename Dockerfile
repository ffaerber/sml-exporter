ARG QEMU
ARG NPM_OPTIONS
ARG BASE_IMAGE=amd64/debian:9.5-slim
FROM ${BASE_IMAGE}

ADD ${QEMU} /usr/bin/${QEMU}

RUN apt-get update && \
  apt-get install -y \
  vim \
  gnupg \
  node-gyp \
  iputils-ping \
  curl

RUN curl -sL https://deb.nodesource.com/setup_11.x | sh
RUN apt-get install -y nodejs

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install ${NPM_OPTIONS}
RUN npm dedupe

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s \
  CMD curl -f http://localhost:3000/metrics || exit 1

CMD [ "node", "server/index.js" ]
