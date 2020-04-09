FROM nginx:stable-alpine

# Create and run as non-privileged user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/cache/nginx

USER appuser

COPY nginx.conf /etc/nginx/nginx.conf

# Copy in minified files from CI process
COPY ./build /var/www

EXPOSE 8080

ENTRYPOINT ["nginx","-g","daemon off;"]