FROM node


WORKDIR /pixplore-c

COPY package.json /pixplore-c

RUN npm i

COPY . /pixplore-c


# default command that runs when it loads up ex node src/server.js
CMD [ "npm", "run", "dev"]