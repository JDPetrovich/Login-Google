"use client";

import '@ant-design/v5-patch-for-react-19';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, message } from "antd";
import styles from "./login.module.css";
import RecuperarSenhaModal from "./components/recuperarSenha/RecuperarSenhaModal";
import GoogleLogin from './components/loginGoogle/GoogleLogin';

export default function LoginPage() {
  const URL_API = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalRecuperarAberto, setModalRecuperarAberto] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await fetch(`${URL_API}/api/usuario/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok && data.content?.token) {
        sessionStorage.setItem("token", data.content.token);

        const tokenSalvo = sessionStorage.getItem("token");
        if (tokenSalvo) {
          message.success("Login feito com sucesso!");
          router.push("/admin");
        } else {
          message.error("Erro ao salvar token, tente novamente.");
        }
      } else {
        message.error(data.message || "Usuário ou senha inválidos");
      }
    } catch (err) {
      console.error(err);
      message.error("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Login Admin" className={styles.card}>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Digite seu email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Senha"
            name="senha"
            rules={[{ required: true, message: "Digite sua senha" }]}
          >
            <Input.Password />
          </Form.Item>
          <div className={styles.forgot}>
            <Button type="link" onClick={() => setModalRecuperarAberto(true)} style={{ color: '#ff7434' }}>
              Esqueci minha senha
            </Button>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className={styles.btnEntrar}
            >
              Entrar
            </Button>
          </Form.Item>
          <GoogleLogin />
        </Form>
      </Card>
      <RecuperarSenhaModal
        aberta={modalRecuperarAberto}
        aoFechar={() => setModalRecuperarAberto(false)}
        urlAPI={URL_API}
      />
    </div>
  );
}