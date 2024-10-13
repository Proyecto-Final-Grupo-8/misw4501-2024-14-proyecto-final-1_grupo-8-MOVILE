# Usa una imagen de Node.js 18
FROM node:18-alpine

# Crea un directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Exponer los puertos necesarios para Expo
EXPOSE 8081 19000 19001 19002

# Comando para iniciar la aplicación Expo en modo túnel
CMD ["npx", "expo", "start", "--tunnel"]
