# Etapa 1: Build
FROM node:18 AS build

WORKDIR /app

# Instala as dependências
COPY package.json package-lock.json ./
RUN npm install

# Copia os arquivos do projeto e gera a build
COPY . .
RUN npm run build

# Etapa 2: Servidor Nginx
FROM nginx:alpine

# Remove os arquivos padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos estáticos gerados para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Adiciona a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
