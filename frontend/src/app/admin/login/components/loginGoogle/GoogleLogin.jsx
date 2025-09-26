"use client";

import '@ant-design/v5-patch-for-react-19';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";

export default function GoogleLogin() {
    const router = useRouter();
    const URL_API = process.env.NEXT_PUBLIC_API_URL;
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    useEffect(() => {
        const interval = setInterval(() => {
            if (window.google?.accounts?.id) {
                window.google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: handleCredentialResponse,
                });

                window.google.accounts.id.renderButton(
                    document.getElementById("googleBtn"),
                    {
                        theme: "filled_blue",
                        size: "medium",
                        text: "signin_with",
                        shape: "rectangular",
                        logo_alignment: "left"
                    }
                );

                clearInterval(interval);
            }
        }, 300);

        return () => clearInterval(interval);
    }, []);

    async function handleCredentialResponse(response) {
        try {
            const res = await fetch(`${URL_API}/api/usuario/login/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: response.credential })
            });

            const data = await res.json();

            if (res.ok && data.content?.token) {
                sessionStorage.setItem("token", data.content.token);
                message.success(data.content.mensagem || "Login feito com sucesso!");
                router.push("/admin");
            } else {
                message.error(data.mensagem || data.error || "Erro ao fazer login com Google");
            }
        } catch (err) {
            console.error(err);
            message.error("Erro ao fazer login com Google");
        }
    }

    return <div id="googleBtn"></div>;
}