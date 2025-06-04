# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Expose port for WebSocket + PeerJS
EXPOSE 3001

# Start the backend server
CMD ["node", "server.js"]
