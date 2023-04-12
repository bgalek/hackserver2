plugins {
    java
    id("org.springframework.boot") version "3.0.5"
    id("io.spring.dependency-management") version "1.1.0"
    id("com.adarshr.test-logger") version "3.2.0"
    id("net.ltgt.errorprone") version "3.0.1"
    kotlin("jvm") version "1.8.20"
}

group = "com.github.bgalek"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(19))
    }
}

repositories {
    mavenCentral()
    maven { url = uri("https://repo.spring.io/milestone") }
}

dependencies {
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    errorprone("com.google.errorprone:error_prone_core:2.18.0")
    implementation(fileTree(baseDir = "libs"))
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-webflux")
    implementation("com.google.firebase:firebase-admin:9.1.1")
    implementation("io.micrometer:micrometer-registry-prometheus:latest.release")
    implementation("com.github.slugify:slugify:3.0.2")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    implementation(kotlin("stdlib-jdk8"))
}

tasks.withType<Test> {
    useJUnitPlatform()
}

tasks.getByName<Jar>("jar") {
    enabled = false
}

tasks.withType<Tar> {
    enabled = false
}

tasks.bootJar {
    dependsOn(project("frontend").tasks.build)
}
