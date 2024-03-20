FROM node:lts AS build

#### make the 'app' folder the current working directory
WORKDIR /app

#### copy things
COPY . .

## Config legacy-peer-deps
RUN npm install --save --legacy-peer-deps
RUN npm cache clean --force
RUN npm set audit false
RUN npm config set legacy-peer-deps true

#### install angular cli
RUN npm install

#### install project dependencies
RUN npm run build --prod

### STAGE 2: Run ###
FROM nginxinc/nginx-unprivileged

#### copy nginx conf
#COPY nginx.conf /etc/nginx/nginx.conf

#### copy artifact build from the 'build environment'
COPY --from=build /app/dist/adopted-paw-frontend /usr/share/nginx/html


#### don't know what this is, but seems cool and techy
CMD ["nginx", "-g", "daemon off;"]
