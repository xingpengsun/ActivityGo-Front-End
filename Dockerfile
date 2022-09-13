FROM node:14.17-alpine3.14 as build
WORKDIR /activityGo

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

FROM nginx:1.21.1-alpine
WORKDIR /var/www/
COPY --from=build ./activityGo/build/ ./
WORKDIR /
COPY --chown=root:root --from=build /activityGo/nginx/default.conf /etc/nginx/nginx.conf
COPY --chown=root:root --from=build /activityGo/nginx/activityGo.conf /etc/nginx/sites-enabled/
COPY --chown=root:root --from=build /activityGo/nginx/ssl_cert /etc/ssl/activitygo.mingx.tech/

WORKDIR /etc/nginx
EXPOSE 80 443