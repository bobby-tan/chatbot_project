# docker buildx build --platform linux/amd64,linux/arm64 -t tanliangwei/chatbot-frontend:latest . 
# docker run --rm -p 5173:5173 tanliangwei/chatbot-frontend:latest
# docker push tanliangwei/chatbot-frontend:latest
# docker run --rm -e CHATBOT_BACKEND_URL=http://localhost:8000  -p 5173:5173 tanliangwei/chatbot-frontend:latest
# interactive run docker run --rm -it tanliangwei/chatbot-frontend:latest sh
# 1. Base image
# Base image
FROM node:20-slim

# 2. Install git and serve
RUN apt-get update && \
    apt-get install -y git curl && \
    npm install -g serve && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy your frontend code from local machine (not cloning at runtime)
COPY . ./chatbot-frontend/

# 5. Go into frontend folder
WORKDIR /app/chatbot-frontend

# Install dependencies
RUN npm install

# Add entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

# Expose port
EXPOSE 5173

# CMD ["serve", "-s", "dist", "-l", "5173"]
