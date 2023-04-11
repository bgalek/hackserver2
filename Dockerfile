FROM eclipse-temurin:20-jdk-alpine
COPY ./build/libs/*.jar app.jar
ENTRYPOINT ["java", "-Xmx180M", "-jar", "/app.jar"]