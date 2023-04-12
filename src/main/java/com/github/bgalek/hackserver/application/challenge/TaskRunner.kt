package com.github.bgalek.hackserver.application.challenge

import com.github.bgalek.hackserver.application.challenge.api.ChallengeDefinition
import com.github.bgalek.hackserver.application.challenge.api.TaskDefinition
import com.github.bgalek.hackserver.application.challenge.api.Scoring
import com.github.bgalek.hackserver.application.player.api.RegisteredPlayer
import com.github.bgalek.hackserver.infrastructure.client.TaskRunnerWebClient
import org.springframework.http.HttpStatusCode
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.util.LinkedMultiValueMap
import org.springframework.web.util.UriComponentsBuilder
import java.net.URI

data class TaskRunResult(
    val taskId: String,
    val score: Scoring,
    val responseBody: String?,
    val errorMessage: String?,
    val httpStatus: HttpStatusCode?
)

@Service
class TaskRunner(
    private val taskRunnerWebClient: TaskRunnerWebClient
) {
    fun run(challenge: ChallengeDefinition<*>, task: TaskDefinition<*>, player: RegisteredPlayer): TaskRunResult {

        val endpoint: URI = UriComponentsBuilder
            .newInstance()
            .scheme("http")
            .host(player.inetSocketAddress.address.toString())
            .port(player.inetSocketAddress.port)
            .path(challenge.challengeEndpoint)
            .queryParams(LinkedMultiValueMap(task.parameters))
            .build(task.parametersAreEncoded)
            .toUri()

        val result = taskRunnerWebClient
            .execute(endpoint)

        return convertToTaskRunResult(result, task)
    }

    private fun <SOLUTION> convertToTaskRunResult(
        response: ResponseEntity<String>?,
        task: TaskDefinition<SOLUTION>,
    ): TaskRunResult {
        val errorMessage =
            if (response?.statusCode?.is2xxSuccessful == true) null else "Got error: ${response?.statusCode}"
        val solution: SOLUTION? = response?.body as? SOLUTION
        val score: Scoring = if (solution != null) task.scoreSolution(solution) else Scoring.ZERO

        return TaskRunResult(
            taskId = task.name,
            score = score,
            responseBody = response?.body,
            errorMessage = errorMessage,
            httpStatus = response?.statusCode
        )
    }
}
