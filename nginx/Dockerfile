FROM nginx:latest

# Install OpenSSL
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Create certs directory
RUN mkdir -p /etc/nginx/certs

# Generate self-signed certificate
RUN openssl req -x509 -nodes -newkey rsa:4096 \
  -keyout /etc/nginx/certs/server.key \
  -out /etc/nginx/certs/server.crt \
  -days 365 \
  -subj "/CN=localhost"

# Copy the NGINX configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose necessary ports
EXPOSE 80 4500

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
