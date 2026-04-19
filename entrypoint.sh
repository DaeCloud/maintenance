#!/bin/sh
cat > /app/dist/config.js << EOF
window.__APP_CONFIG__ = {
  DEFAULT_SERVICE_NAME: "${VITE_DEFAULT_SERVICE_NAME}",
  SERVICE_NAME_MAP: ${VITE_SERVICE_NAME_MAP}
};
EOF
exec serve -s /app/dist