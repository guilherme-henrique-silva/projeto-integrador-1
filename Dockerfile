# Etapa 1: Build do projeto Angular
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar todo o código do projeto
COPY . .

# Build do projeto Angular
RUN npm run build

# Etapa 2: Servir a aplicação com Nginx
FROM nginx:alpine

# Remover configuração padrão do nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copiar configuração personalizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar os arquivos compilados da etapa anterior
COPY --from=builder /app/dist/projeto-integrador-1/browser /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
