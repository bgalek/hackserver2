package com.github.bgalek.hackserver.application.challenge.definitions

import com.github.bgalek.hackserver.application.challenge.api.ChallengeDefinition
import com.github.bgalek.hackserver.application.challenge.api.ChallengeDefinition.QueryParam
import com.github.bgalek.hackserver.application.challenge.api.Scoring
import com.github.bgalek.hackserver.application.challenge.api.TaskWithFixedResult
import org.springframework.stereotype.Component
import java.net.URLEncoder
import java.nio.charset.StandardCharsets

@Component
class HostnameChallengeDefinition : ChallengeDefinition<String> {
    override val name: String =
        "Hostname Madness"
    override val description: String =
        "Your task is to extract hostname from given url, simple as that."
    override val challengeEndpoint: String =
        "/hostname"
    override val challengeParameters: List<QueryParam> =
        listOf(QueryParam("url", "url to get hostname from"))

    override val example = TaskWithFixedResult(
        name = "Should return wp.pl from https://wp.pl",
        parameter = "url" to "https://wp.pl",
        expectedSolution = "wp.pl",
        score = Scoring(4),
    )
    override val tasks =
        listOf(
            TaskWithFixedResult(
                "Should return simple hostname",
                "url" to "https://allegro.pl",
                "allegro.pl",
                Scoring(6)
            ),
            TaskWithFixedResult(
                "Should return simple hostname (but not simplest)",
                "url" to "https://some_host.org",
                "some_host.org",
                Scoring(6)
            ),
            TaskWithFixedResult(
                "Should return unix file hostname",
                "url" to "file://localhost/etc/fstab",
                "localhost",
                Scoring(6)
            ),
            TaskWithFixedResult(
                "Should return local file hostname",
                "url" to "file:///c:/WINDOWS/file.mp3",
                "localhost",
                Scoring(6)
            ),
            TaskWithFixedResult(
                "Should return simple basic-auth hostname",
                "url" to "http://username:password@example.com/",
                "example.com",
                Scoring(6)
            ),
            TaskWithFixedResult(
                "Should return simple ip based hostname",
                "url" to "ftp://192.168.0.1",
                "192.168.0.1",
                Scoring(6)
            ),
            TaskWithFixedResult(
                "Should return simple hostname with subdomain",
                "url" to "http://archiwum.allegro.pl",
                "archiwum.allegro.pl",
                Scoring(6)
            ),
            TaskWithFixedResult(
                "Should return simple hostname with more subdomains",
                "url" to "https://nowe.archiwum.allegro.pl",
                "nowe.archiwum.allegro.pl",
                Scoring(6)
            ),
            TaskWithFixedResult(
                "Should return simple hostname from url with another url in query",
                "url" to "https://site.com/?url=https://other.com",
                "site.com",
                Scoring(6)
            ),
            TaskWithFixedResult(
                "Emoji domains are a thing!",
                "url" to URLEncoder.encode("http://💩.la#yep-it-is-real", StandardCharsets.UTF_8),
                "💩.la",
                Scoring(6),
                parametersAreEncoded = true
            )
        )
}
