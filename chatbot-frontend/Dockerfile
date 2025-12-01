# 1. Base image
FROM --platform=linux/amd64 node:20-slim

# 2. Install git and serve
RUN apt-get update && \
    apt-get install -y git curl && \
    npm install -g serve && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 3. Set working directory
WORKDIR /app

# 4. Copy your frontend code from local machine (not cloning at runtime)
COPY . ./chatbot-frontend/

# 5. Go into frontend folder
WORKDIR /app/chatbot-frontend

# 6. Install dependencies
RUN npm install

# 7. Build frontend
RUN npm run build

# 8. Expose port
EXPOSE 5173

# 9. Serve production build
CMD ["serve", "-s", "dist", "-l", "5173"]
