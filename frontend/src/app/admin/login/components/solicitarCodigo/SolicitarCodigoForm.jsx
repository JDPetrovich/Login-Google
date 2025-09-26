import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { MailOutlined, KeyOutlined } from "@ant-design/icons";

function SolicitarCodigoForm({ carregando, aoSolicitarCodigo }) {
  const [email, setEmail] = useState("");

  const solicitar = () => {
    if (!email || !email.trim()) {
      message.error("O campo e-mail é obrigatório!");
      return;
    }
    aoSolicitarCodigo(email);
  };

  return (
    <>
      <p>Informe seu e-mail de cadastro:</p>
      <Input
        placeholder="E-mail"
        prefix={<MailOutlined />}
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={carregando}
        onPressEnter={solicitar}
      />
      <Button
        type="primary"
        onClick={solicitar}
        loading={carregando}
        block
        style={{ marginTop: 12, backgroundColor: '#ff7434' }}
        icon={<KeyOutlined />}
      >
        Enviar código
      </Button>
    </>
  );
}

export default SolicitarCodigoForm;