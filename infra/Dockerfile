# Multi-stage Dockerfile for Shreenil Spring Boot Backend
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /workspace/app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN chmod +x ./mvnw && ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

RUN addgroup -S shreenil && adduser -S shreenil -G shreenil
USER shreenil:shreenil

COPY --from=builder /workspace/app/target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
