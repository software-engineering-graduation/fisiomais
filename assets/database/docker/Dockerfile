FROM mysql:8.0

# Environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=1234
ENV MYSQL_DATABASE=fisiomais_db
ENV MYSQL_USER=fisiomais
#FIXME - Substitua pela senha do usuário principal
ENV MYSQL_PASSWORD=ngna%D#Pa$wwVgTVs9MQpFeQ!6oJ5qfsFwD

# Copia o script de criação da base de dados para o container
COPY ../database_creation.sql /docker-entrypoint-initdb.d/

# Exporta a porta 3306 para o host
EXPOSE 3306