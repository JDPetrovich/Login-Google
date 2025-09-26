import React, { useState } from "react";
import { Modal, message } from "antd";
import SolicitarCodigoForm from "../solicitarCodigo/SolicitarCodigoForm";
import RedefinirSenhaForm from "../redefinirSenha/RedefinirSenhaForm";

function RecuperarSenhaModal({ aberta, aoFechar, urlAPI }) {
  const [etapa, setEtapa] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const [email, setEmail] = useState("");

  const solicitarCodigo = async (emailInformado) => {
    setCarregando(true);
    try {
      const parametros = { email: emailInformado };
      const resposta = await fetch(`${urlAPI}/api/usuario/admin/recuperar-senha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parametros)
      });
      if (!resposta.ok) {
        const corpoResposta = await resposta.json();
        throw new Error(corpoResposta.content || "Erro ao solicitar código. Verifique o e-mail informado.");
      }
      message.success("Código enviado para seu e-mail!");
      setEmail(emailInformado);
      setEtapa(2);
    } catch (e) {
      message.error(e.message);
    }
    setCarregando(false);
  };

  const redefinirSenha = async ({ codigo, novaSenha }) => {
    setCarregando(true);
    try {
      const resposta = await fetch(
        `${urlAPI}/api/usuario/admin/redefinir-senha`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, codigo, novaSenha })
        }
      );
      if (!resposta.ok) {
        const corpoResposta = await resposta.json();
        throw new Error(corpoResposta.content || "Erro ao redefinir senha. Código inválido ou expirado.");
      }
      message.success("Senha redefinida com sucesso!");
      fecharModal();
    } catch (e) {
      message.error(e.message);
    }
    setCarregando(false);
  };

  const reenviarCodigo = async () => {
    setCarregando(true);
    try {
      const parametros = { email };
      const resposta = await fetch(`${urlAPI}/api/usuario/admin/reenviar-codigo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parametros)
      });
      if (!resposta.ok) {
        const corpoResposta = await resposta.json();
        throw new Error(corpoResposta.content || "Erro ao reenviar código.");
      }
      message.success("Código reenviado para seu e-mail!");
    } catch (e) {
      message.error(e.message);
    }
    setCarregando(false);
  };

  const fecharModal = () => {
    setEtapa(1);
    setEmail("");
    setCarregando(false);
    aoFechar();
  };

  return (
    <Modal
      title="Recuperar senha"
      open={aberta}
      onCancel={fecharModal}
      footer={null}
      destroyOnHidden
    >
      {etapa === 1 ? (
        <SolicitarCodigoForm
          carregando={carregando}
          aoSolicitarCodigo={solicitarCodigo}
        />
      ) : (
        <RedefinirSenhaForm
          carregando={carregando}
          aoRedefinirSenha={redefinirSenha}
          aoReenviarCodigo={reenviarCodigo}
        />
      )}
    </Modal>
  );
}

export default RecuperarSenhaModal;