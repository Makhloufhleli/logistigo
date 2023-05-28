#--< build image for development >--

FROM node:alpine As development
# Install pm2-runtime globally
RUN npm install pm2 -g
WORKDIR /usr/src/app

COPY package*.json yarn.lock tsconfig.json ./

COPY ./src ./src

RUN ls -a

RUN yarn install --pure-lockfile && yarn build
# CMD ["yarn", "run", "start:dev"]


#--< build image for production >--

FROM node:alpine as production
# Install pm2-runtime globally
RUN npm install pm2 -g
ARG NODE_ENV=production

WORKDIR /usr/prod/app

ENV NODE_ENV=production

COPY package*.json yarn.lock ./

RUN yarn install --production --pure-lockfile


COPY --from=development /usr/src/app/dist ./dist
