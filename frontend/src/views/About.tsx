import React from "react";
import { useLocalUserSettings } from "@bgalek/react-contexts";
import { AppSettings } from "../types/AppSettings";

export default function About() {
    const { settings } = useLocalUserSettings<AppSettings>();
    return (
        <div>
            <p>{JSON.stringify(settings)}</p>
        </div>
    );
}
