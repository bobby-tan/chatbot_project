# Start from an official Python runtime image compatible with Ubuntu 20.04 concepts
# command to build  `docker buildx build --platform linux/amd64,linux/arm64 -t tanliangwei/chatbot-frontend:latest . `
# command to run locally `docker run  -t tanliangwei/chatbot-backend:latest`
# command to push to docker hub `docker push tanliangwei/chatbot-backend:latest`
# 
# We use a specific version for stability
FROM python:3.10-slim-buster

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code into the container
COPY . .

# Expose the port your FastAPI app runs on (matching the --port 8000 command)
EXPOSE 8000

# Define the command to run the application when the container starts
# This uses the correct --host 0.0.0.0 for RunPod accessibility
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
