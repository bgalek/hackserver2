package com.github.bgalek.hackserver.application.challenge.api;

import com.github.slugify.Slugify;

import java.util.List;

public interface ChallengeDefinition {

    Slugify slugify = Slugify.builder().build();

    String getName();

    String getDescription();

    String getChallengeEndpoint();

    List<QueryParam> getChallengeParameters();

    Class<?> solutionType();

    TaskDefinition getExample();

    List<TaskDefinition> getTasks();

    default String getId() {
        return slugify.slugify(getName());
    }

    default int getMaxPoints() {
        return this.getTasks()
                .stream()
                .mapToInt(task -> task.getTaskScoring().getMaxPoints())
                .sum();
    }

    record QueryParam(String name, String desc) {}
}
