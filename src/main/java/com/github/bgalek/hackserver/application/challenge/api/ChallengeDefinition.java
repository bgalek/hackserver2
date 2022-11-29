package com.github.bgalek.hackserver.application.challenge.api;

import com.github.slugify.Slugify;

import java.util.List;
import java.util.Objects;

public interface ChallengeDefinition {

    Slugify slugify = Slugify.builder().build();

    String getName();

    String getDescription();

    String getChallengeEndpoint();

    List<QueryParam> getChallengeParams();


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

    class QueryParam {
        private final String name;
        private final String desc;

        public QueryParam(String name, String desc) {
            this.name = name;
            this.desc = desc;
        }

        public String getName() {
            return name;
        }

        public String getDesc() {
            return desc;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof QueryParam)) {
                return false;
            }
            QueryParam that = (QueryParam) o;
            return Objects.equals(name, that.name) &&
                    Objects.equals(desc, that.desc);
        }

        @Override
        public int hashCode() {
            return Objects.hash(name, desc);
        }
    }
}
