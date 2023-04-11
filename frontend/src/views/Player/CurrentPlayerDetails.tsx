import React from "react";
import { collection, documentId, query, where } from "firebase/firestore";
import { firestore, registeredPlayerConverter } from "../../firebase";
import { useLocalUserSettings } from "@bgalek/react-contexts";
import { AppSettings } from "../../types/AppSettings";
import Loading from "../Loading";
import { PlayerDetails } from "../../components/PlayerDetails";
import { IconAlertCircle } from "@tabler/icons-react";
import { Alert } from "@mantine/core";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { RegisteredPlayer } from "../../types/RegisteredPlayer";

export function CurrentPlayerDetails() {
    const { settings } = useLocalUserSettings<AppSettings>();
    const ref = query(
        collection(firestore, "players"),
        where(documentId(), "==", settings.player.id)
    ).withConverter(registeredPlayerConverter);
    const {
        data: player,
        isLoading,
        isError,
        error,
    } = useFirestoreQuery<RegisteredPlayer>(
        ["players", settings.player.id],
        ref,
        { subscribe: true },
    );

    if (isError) {
        return (
            <Alert
                icon={<IconAlertCircle size={16}/>}
                title="Bummer!"
                color="red"
            >
                {error.message}
            </Alert>
        );
    }

    if (isLoading) {
        return <Loading/>;
    }

    if (!player || player.docs.length === 0) {
        return <p>error: wyloguj się</p>;
    }

    return <PlayerDetails player={player.docs[0].data() as RegisteredPlayer}/>;
}
