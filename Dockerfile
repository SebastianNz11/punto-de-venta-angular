FROM nginx:alpine

# Copia los archivos compilados de Angular
COPY dist/crud/browser /usr/share/nginx/html

# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
