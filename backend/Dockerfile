# Use official OpenJDK base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy Maven wrapper and pom.xml first (for caching dependencies)
COPY mvnw pom.xml ./
COPY .mvn .mvn/

# Grant execution permission to the Maven wrapper
RUN chmod +x mvnw

# Copy the entire project
COPY . .

# Build the application (this downloads dependencies first)
RUN ./mvnw clean package -DskipTests

# Expose the port Spring Boot runs on
EXPOSE 8080

# Start the Spring Boot application
CMD ["./mvnw", "spring-boot:run"]
