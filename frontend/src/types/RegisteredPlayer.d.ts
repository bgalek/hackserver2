export interface RegisteredPlayer {
    id: string;
    name: string;
    host: string;
    port: number;
    secret: string;
    status: HealthStatus;
}

export type HealthStatus = "UNKNOWN" | "HEALTHY" | "DEAD";
