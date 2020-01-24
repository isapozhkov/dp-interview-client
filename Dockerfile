FROM node:10-alpine

COPY . /root/app

RUN yarn global add serve && \
    cd /root/app && \
    yarn && yarn build && \
    mkdir -p /var/www && cp -r /root/app/dist /var/www/ && \
    rm -rf /root/app

ENTRYPOINT [ "serve", "-l", "8080", "-s", "/var/www/dist" ]

EXPOSE 8080