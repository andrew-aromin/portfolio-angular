FROM node:18-alpine AS builder

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist/frontend/browser/ /usr/share/nginx/html

EXPOSE 5010

CMD ["nginx", "-g", "daemon off;"]
