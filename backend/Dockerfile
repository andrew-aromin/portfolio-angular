FROM maven:3.9.9-eclipse-temurin-21-alpine

# Set working directory
WORKDIR /app

# Create a non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring

COPY --chown=spring:spring . .

RUN mvn clean package && cp target/*.jar app.jar

# Switch to non-root user
USER spring

# Expose application port
EXPOSE 5009

# Run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
