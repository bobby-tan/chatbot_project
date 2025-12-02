#!/bin/sh

echo "Generating runtime config..."

cat <<EOF > public/config.json
{
  "CHATBOT_BACKEND_URL": "${CHATBOT_BACKEND_URL:-"http://localhost:8000"}",
  "BEARER_TOKEN": "${BEARER_TOKEN}"
}
EOF


echo "Building frontend..."
npm run build

echo "Starting server..."
exec serve -s dist -l 5173
