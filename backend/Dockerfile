# Use official OpenJDK base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy Maven wrapper and pom.xml first (for caching dependencies)
COPY mvnw pom.xml ./
COPY .mvn .mvn/

# Grant execution permission to the Maven wrapper (Fixes "Permission denied" issue)
RUN chmod +x mvnw

# Copy the rest of the project
COPY . .

# Build the application (this downloads dependencies first)
RUN ./mvnw clean package -DskipTests

# Expose the port Spring Boot runs on
EXPOSE 8080

# Run the Spring Boot application from the generated JAR
CMD ["java", "-jar", "target/*.jar"]
