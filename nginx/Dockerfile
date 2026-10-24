# 1. Image Nginx officielle légère
FROM nginx:alpine

# 2. Copie de la configuration personnalisée pour remplacer la config par défaut
COPY default.conf /etc/nginx/conf.d/default.conf

# 3. Exposition du port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
