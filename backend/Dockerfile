# Maven
FROM maven:3.8.4-openjdk-8-slim as maven
WORKDIR /usr/src/app
COPY . ./
RUN mvn package

# Java
FROM openjdk:8-jdk-alpine
WORKDIR /opt/app
COPY --from=maven /usr/src/app/target/*.jar /opt/app/app.jar
ENTRYPOINT ["java","-jar","app.jar"]