package com.github.bgalek.hackserver.infrastructure.client

import io.netty.channel.ChannelOption
import io.netty.handler.timeout.ReadTimeoutHandler
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.client.reactive.ReactorClientHttpConnector
import org.springframework.web.reactive.function.client.WebClient
import reactor.netty.Connection
import reactor.netty.http.client.HttpClient
import reactor.netty.tcp.TcpClient
import java.time.Duration
import java.util.concurrent.TimeUnit

@Configuration
internal open class TaskRunnerWebClientConfiguration {
    @Bean
    open fun taskRunnerWebClient(
        @Value("\${client.timeout}") clientTimeout: Duration
    ): TaskRunnerWebClient {
        val httpClient = buildHttpClient(clientTimeout.toMillis().toInt())
        val webClient = buildWebClient(httpClient)
        return TaskRunnerWebClient(webClient)
    }

    private fun buildWebClient(httpClient: HttpClient): WebClient {
        return WebClient.builder()
            .clientConnector(ReactorClientHttpConnector(httpClient))
            .build()
    }

    private fun buildHttpClient(clientTimeoutMillis: Int): HttpClient {
        return HttpClient.create()
            .tcpConfiguration { client: TcpClient -> configureTcpClient(client, clientTimeoutMillis) }
    }

    private fun configureTcpClient(client: TcpClient, clientTimeoutMillis: Int): TcpClient {
        return client
            .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, clientTimeoutMillis)
            .doOnConnected { conn: Connection ->
                conn.addHandlerLast(
                    ReadTimeoutHandler(
                        clientTimeoutMillis.toLong(),
                        TimeUnit.MILLISECONDS
                    )
                )
            }
    }
}
