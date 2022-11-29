import com.github.gradle.node.npm.task.NpmTask

plugins {
    base
    id("com.github.node-gradle.node") version "3.5.0"
}

node {
    download.set(true)
    version.set("19.2.0")
}

tasks.npmInstall {
    inputs.files(project.files("package-lock.json"))
    outputs.dir("${project.projectDir}/node_modules")
}

tasks.register<NpmTask>("buildFrontend") {
    group = "build"
    args.set(listOf("run", "build"))
    inputs.dir("${project.projectDir}/src")
    outputs.dir("${project.projectDir}/dist")
    dependsOn("npmInstall")
}

tasks.build {
    dependsOn(project.tasks.getByName("buildFrontend"))
    copy {
        from("${project.projectDir}/dist").into("${rootProject.buildDir}/resources/main/public")
    }
}

tasks.register("run") {
    dependsOn(project.tasks.getByName("buildFrontend"))
    copy {
        from("${project.projectDir}/dist").into("${rootProject.projectDir}/src/main/resources/public")
    }
}