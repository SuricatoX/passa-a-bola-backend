# Use a imagem oficial do Node.js (LTS)
FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala apenas deps de produção
RUN npm install --production

# Copia todo o código da app
COPY . .

# Expor porta
EXPOSE 3000

# Health check simples que sempre retorna healthy
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "process.exit(0)"

# Comando default para iniciar seu servidor
CMD ["node", "server.js"]
