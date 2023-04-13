import React from "react";
import {useLocalUserSettings} from "@bgalek/react-contexts";
import {AppSettings} from "../../types/AppSettings";
import {PlayerDetails} from "../../components/PlayerDetails";
import {useChallenges, usePlayer, usePlayerLogs} from "../../hooks/queries";
import Loading from "../Loading";

export function CurrentPlayerDetails() {
    const {settings} = useLocalUserSettings<AppSettings>();
    const player = usePlayer(settings.player.id);
    const logs = usePlayerLogs(settings.player.id);
    const challenges = useChallenges();

    if (player.isLoading) {
        return <Loading/>;
    }

    if (!player.data) {
        return <p>player not found</p>;
    }

    return (
        <PlayerDetails
            player={player.data}
            logs={logs}
            challenges={challenges}
        />
    );
}
