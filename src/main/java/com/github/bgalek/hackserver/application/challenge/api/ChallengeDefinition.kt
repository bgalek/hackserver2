package com.github.bgalek.hackserver.application.challenge.api

import com.github.slugify.Slugify

object Slugifier {
    private val slug = Slugify.builder().build()

    fun slugify(text: String): String = slug.slugify(text)
}

interface ChallengeDefinition<SOLUTION> {
    val name: String
    val description: String
    val challengeEndpoint: String
    val challengeParameters: List<QueryParam>
    val example: TaskDefinition<SOLUTION>
    val tasks: List<TaskDefinition<SOLUTION>>

    fun getId(): String = Slugifier.slugify(name)
    fun getMaxPoints() = tasks.sumOf { it.score.points }

    @JvmRecord
    data class QueryParam(val name: String, val desc: String)
}
