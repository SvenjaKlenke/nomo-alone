FROM openjdk:17
EXPOSE 8080
LABEL maintainer="svenjaklenke"
ADD backend/target/app.jar app.jar
CMD ["sh", "-c", "java-jar/app.jar"]

