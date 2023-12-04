FROM openjdk:18-alpine

WORKDIR /app
COPY . /app

RUN chmod +x mvnw
RUN ./mvnw -B -DskipTests clean package

RUN apk --no-cache add findutils

EXPOSE 8081

CMD ["/bin/sh", "-c", "export $(cat .env | xargs) && java -jar target/fisiomais-0.0.1-SNAPSHOT.jar"]
