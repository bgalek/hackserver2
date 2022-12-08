import { IScoutAction, IScoutSectionAction, ScoutBar } from "scoutbar";
import React from "react";
import { useNavigate } from "react-router-dom";

export function Commands() {
    const navigate = useNavigate();
    return (
        <ScoutBar
            actions={({
                createScoutAction,
            }: {
                createScoutAction: (action: IScoutAction) => IScoutAction;
                createScoutSection: (
                    action: IScoutSectionAction
                ) => IScoutSectionAction;
                createScoutPage: (
                    action: IScoutSectionAction
                ) => IScoutSectionAction;
            }) => {
                return [
                    createScoutAction({
                        label: "Challenges",
                        description: "See challenges",
                        action: () => navigate("/challenges"),
                    }),
                    createScoutAction({
                        label: "Admin",
                        description: "Admin",
                        action: () => navigate("/admin"),
                    }),
                ];
            }}
        />
    );
}
