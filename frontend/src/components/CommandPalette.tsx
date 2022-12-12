import { IScoutAction, ScoutBar } from "scoutbar";
import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../router";

export function CommandPalette() {
    const navigate = useNavigate();
    return (
        <ScoutBar
            showRecentSearch={false}
            acknowledgement={false}
            actions={({ createScoutAction, }: { createScoutAction: (action: IScoutAction) => IScoutAction; }) => {
                return [
                    createScoutAction({
                        label: "Challenges",
                        description: "See challenges",
                        action: (e, { close }) => {
                            navigate(routes.CHALLENGES_LIST);
                            if (close) {
                                close();
                            }
                        },
                    }),
                    createScoutAction({
                        label: "Admin",
                        description: "Admin",
                        action: (e, { close }) => {
                            navigate(routes.ADMIN_SIGN_UP);
                            if (close) {
                                close();
                            }
                        },
                    }),
                ];
            }}
        />
    );
}
