import { useMutation } from "react-query";
import { showNotification } from "@mantine/notifications";

export function usePlayerRegistration() {
    return useMutation({
        mutationFn: (params: { name: string, host: string, port: number }) =>
            fetch("/api/players", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(params),
            })
                .then(handleError)
                .then((response) => response.json())
                .catch((error) =>
                    showNotification({
                        title: "Error",
                        color: "red",
                        message: error.message || "",
                    })
                ),
    });
}

export function useAdminLogin() {
    return useMutation({
        mutationFn: (params: { password: string }) =>
            fetch("/api/admin/login", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(params),
            })
                .then(handleError)
                .then((response) => {
                    if (!response.ok) throw Error(response.statusText);
                    return response;
                })
                .then((response) => response.text())
                .catch((error) => {
                    showNotification({
                        title: "Error",
                        color: "red",
                        message: error.message || "",
                    });
                }),
    });
}

function handleError(response: Response) {
    if (!response.ok) throw Error(response.statusText);
    return response;
}