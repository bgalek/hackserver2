package com.github.bgalek.hackserver.infrastructure.client

import org.springframework.http.ResponseEntity
import org.springframework.web.reactive.function.client.WebClient
import java.net.URI

interface TeamClient {
    fun execute(uri: URI): ResponseEntity<String>?
}

class TaskRunnerWebClient(
    private val webClient: WebClient
) : TeamClient {

    override fun execute(uri: URI): ResponseEntity<String>? {
        return webClient.get()
            .uri(uri)
            .retrieve()
            .toEntity(String::class.java)
            .block()
    }
}
