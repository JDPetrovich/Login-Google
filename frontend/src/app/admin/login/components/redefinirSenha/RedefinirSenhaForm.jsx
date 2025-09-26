import React, { useState, useEffect } from "react";
import { Input, Button, Typography } from "antd";
import { KeyOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import styles from "../../login.module.css";

function RedefinirSenhaForm({ carregando, aoRedefinirSenha, aoReenviarCodigo }) {
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [timer, setTimer] = useState(0);
  const [tentativas, setTentativas] = useState(0);

  useEffect(() => {
    let intervalo;
    if (timer > 0) {
      intervalo = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [timer]);

  const handleReenviar = () => {
    aoReenviarCodigo();

    const base = 30;
    const tempoBloqueio = Math.min(base * Math.pow(2, tentativas), 600);
    setTimer(tempoBloqueio);
    setTentativas((t) => t + 1);
  };

  const formatarTempo = (segundos) => {
    if (segundos < 60) return `${segundos}s`;
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    if (sec === 0) return `${min}min`;
    return `${min}min ${sec}s`;
  };

  return (
    <div>
      <Typography.Text>
        Digite o código recebido e escolha uma nova senha:
      </Typography.Text>
      <Input
        placeholder="Código"
        prefix={<KeyOutlined />}
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        style={{ marginBottom: 8, marginTop: 8 }}
        disabled={carregando}
      />
      <Input.Password
        placeholder="Nova senha"
        prefix={<LockOutlined />}
        value={novaSenha}
        onChange={(e) => setNovaSenha(e.target.value)}
        style={{ marginBottom: 8 }}
        disabled={carregando}
      />
      <Button
        type="primary"
        onClick={() => aoRedefinirSenha({ codigo, novaSenha })}
        loading={carregando}
        block
        icon={<LockOutlined />}
        style={{ marginBottom: 8, backgroundColor: '#ff7434' }}
      >
        Redefinir senha
      </Button>
      <Button
        type="default"
        onClick={handleReenviar}
        loading={carregando}
        block
        icon={<MailOutlined />}
        disabled={carregando || timer > 0}
        className={styles.btnReenviar}
      >
        {timer > 0 ? `Reenviar em ${formatarTempo(timer)}` : "Reenviar código"}
      </Button>

    </div>
  );
}

export default RedefinirSenhaForm;