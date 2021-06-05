FROM node:latest

ENV APP_ROOT /src
ENV NODE_ENV production
Env REACT_APP_API_URL https://api.letschess.nl


RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD ./app ${APP_ROOT}

RUN yarn
RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn","start"]