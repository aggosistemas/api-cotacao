# Etapa 1: Imagem base do Node.js
FROM node:18

# Etapa 2: Diretório de trabalho dentro do container
WORKDIR /app

# Etapa 3: Copiar arquivos de dependência e instalar
COPY package*.json ./
RUN npm install

# Etapa 4: Copiar o restante do código-fonte
COPY . .

# Etapa 5: Expor a porta usada pela aplicação
EXPOSE 3000

# Etapa 6: Comando para iniciar a aplicação
CMD ["npm", "start"]
