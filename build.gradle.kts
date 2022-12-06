plugins {
    java
    application
    id("org.springframework.boot") version "3.0.0-RC1"
    id("io.spring.dependency-management") version "1.1.0"
    id("net.ltgt.errorprone") version "3.0.1"
    id("com.adarshr.test-logger") version "3.0.0"
}

group = "com.github.bgalek"
version = "0.0.1-SNAPSHOT"

application {
    mainClass.set("com.github.bgalek.hackserver.HackserverApplication")
    applicationDefaultJvmArgs = listOf(
        "-Dcom.sun.management.jmxremote",
        "-Dcom.sun.management.jmxremote.port=7799",
        "-Dcom.sun.management.jmxremote.rmi.port=7799",
        "-Dcom.sun.management.jmxremote.local.only=false",
        "-Dcom.sun.management.jmxremote.authenticate=false",
        "-Dcom.sun.management.jmxremote.ssl=false",
        "-Djmx.rmi.registry.port=6001",
    )
}

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
    errorprone("com.google.errorprone:error_prone_core:2.16")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.google.firebase:firebase-admin:9.1.1")
    implementation("com.github.slugify:slugify:3.0.2")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    implementation(fileTree(baseDir = "libs"))
}

tasks.withType<Test> {
    useJUnitPlatform()
}

tasks.withType<Tar> {
    enabled = false
}

tasks.bootDistZip {
    enabled = false
}

tasks.distZip {
    dependsOn(project("frontend").tasks.build)
}