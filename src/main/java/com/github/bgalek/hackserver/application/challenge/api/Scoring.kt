package com.github.bgalek.hackserver.application.challenge.api

@JvmInline
value class Scoring(val points: Int) {
    companion object {
        val ZERO = Scoring(0)
    }
}
