package com.github.bgalek.hackserver.application.challenge.api

import java.util.function.BiFunction

interface TaskDefinition<SOLUTION> {
    val name: String
    val expectedSolution: SOLUTION
    val score: Scoring
    val parametersAreEncoded: Boolean
    val parameters: Map<String, List<String>>

    fun scoreSolution(solution: SOLUTION): Scoring
}

class TaskWithValidableResult<TEST>(
    override val name: String,
    private val testcase: TEST,
    override val expectedSolution: Boolean,
    override val score: Scoring,

    private val verification: BiFunction<TEST, String, Boolean>,
) : TaskDefinition<Boolean> {

    override val parameters: Map<String, List<String>> = emptyMap()

    override val parametersAreEncoded: Boolean = false

    override fun scoreSolution(solution: Boolean): Scoring =
        if (verification.apply(testcase, solution.toString()) == expectedSolution) score else Scoring.ZERO
}

class TaskWithFixedResult<SOLUTION>(
    override val name: String,
    override val parameters: Map<String, List<String>>,
    override val expectedSolution: SOLUTION,
    override val score: Scoring,
    override val parametersAreEncoded: Boolean
) : TaskDefinition<SOLUTION> {

    override fun scoreSolution(solution: SOLUTION): Scoring =
        if (expectedSolution == solution) score else Scoring.ZERO
}

fun <SOLUTION> TaskWithFixedResult(
    name: String,
    parameter: Pair<String, String>,
    expectedSolution: SOLUTION,
    score: Scoring,
    parametersAreEncoded: Boolean = false
): TaskWithFixedResult<SOLUTION> = TaskWithFixedResult(
    name,
    mapOf(parameter.first to listOf(parameter.second)),
    expectedSolution,
    score,
    parametersAreEncoded
)


//class TaskWithDynamicResult internal constructor(
//    override val name: String,
//    private override val parameters: MultiValueMap<String, Supplier<String>>,
//    expectedSolution: Supplier<Any>,
//    override val taskScoring: TaskScoring,
//    private val encoded: Boolean
//) : TaskDefinition {
//    override val expectedSolution: Any
//
//    init {
//        this.expectedSolution = expectedSolution.get()
//    }
//
//    fun parametersAreEncoded(): Boolean {
//        return encoded
//    }
//
//    override fun getParameters(): MultiValueMap<String, String> {
//        val result = LinkedMultiValueMap<String, String>()
//        parameters.forEach(BiConsumer { key: String, value: List<Supplier<String?>> ->
//            result.add(key, value.stream().map { obj: Supplier<String?> -> obj.get() }
//                .collect(Collectors.joining()))
//        })
//        return result
//    }
//
//    override fun scoreSolution(solution: Any?): Int {
//        if (solution == null) {
//            return 0
//        }
//        return if (expectedSolution == solution) taskScoring.points else 0
//    }
//}

//companion object {
//    fun withFixedResult(
//        name: String,
//        params: MultiValueMap<String, String>,
//        expectedResult: Any,
//        taskScoring: TaskScoring
//    ): TaskWithFixedResult? {
//        return TaskWithFixedResult(name, params, expectedResult, taskScoring, false)
//    }
//
//
//    fun withDynamicResult(
//        name: String,
//        params: MultiValueMap<String, Supplier<String>>,
//        expectedResult: Supplier<Any>,
//        taskScoring: TaskScoring
//    ): TaskWithDynamicResult? {
//        return TaskWithDynamicResult(name, params, expectedResult, taskScoring, false)
//    }
//
//    fun withDynamicResult(
//        name: String,
//        params: MultiValueMap<String, Supplier<String>>,
//        expectedResult: Supplier<Any>,
//        taskScoring: TaskScoring,
//        encoded: Boolean
//    ): TaskWithDynamicResult? {
//        return TaskWithDynamicResult(name, params, expectedResult, taskScoring, encoded)
//    }
//
//    fun <T> withValidateResult(
//        name: String,
//        testcase: T,
//        verification: BiFunction<T, String, Boolean>,
//        expected: Boolean,
//        taskScoring: TaskScoring
//    ): TaskWithValidableResult<T>? {
//        return TaskWithValidableResult(name, testcase, verification, expected, taskScoring)
//    }
//}

