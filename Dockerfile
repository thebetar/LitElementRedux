# Get image
FROM nginx:alpine

# Set directory to run commands from
WORKDIR /usr/share/nginx/html/

# Copy files from here to container
COPY dist /usr/share/nginx/html/