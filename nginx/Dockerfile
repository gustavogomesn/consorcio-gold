FROM nginx:1.29.1-alpine-slim

COPY nginx.conf /etc/nginx/nginx.conf

RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 5500

CMD ["nginx", "-g", "daemon off;"]
#CMD ["nginx", "-t"]
