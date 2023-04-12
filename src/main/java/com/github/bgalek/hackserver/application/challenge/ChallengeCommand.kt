package com.github.bgalek.hackserver.application.challenge

import com.github.bgalek.hackserver.application.challenge.api.ChallengeDefinition
import com.github.bgalek.hackserver.application.challenge.api.Scoring
import com.github.bgalek.hackserver.application.logs.LogRepository
import com.github.bgalek.hackserver.application.player.api.PlayerId
import com.github.bgalek.hackserver.application.player.api.RegisteredPlayer
import org.springframework.stereotype.Service

@Service
class ChallengeCommand(
    private val challengeRepository: ChallengeRepository,
    private val logRepository: LogRepository,
    private val taskRunner: TaskRunner
) {

    fun run(challengeId: String, player: RegisteredPlayer): ChallengeRunResult {
        val challenge = challengeRepository.findAll()
            .find { it.getId() == challengeId }

        return run(challenge, player)
    }

    fun run(challenge: ChallengeDefinition<*>, player: RegisteredPlayer): ChallengeRunResult {
        val taskRunsResults = challenge.tasks
            .map { task -> taskRunner.run(challenge, task, player) }
        val runScore = Scoring(taskRunsResults.sumOf { it.score.points })

        logRepository.insert(ChallengeRunResult(
            player.id,
            challenge.getId(),
            taskRunsResults,
            runScore
        ))
    }
}

data class ChallengeRunResult(
    val playerId: PlayerId,
    val challengeId: String,
    val taskRunResults: List<TaskRunResult>,
    val score: Scoring
)
