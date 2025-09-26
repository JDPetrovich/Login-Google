import { UsuarioRepo } from "../context/repositories/repositorios.js";

async function rodarJobInvalidarCodigos() {
    const repo = new UsuarioRepo();
    try {
        await repo.invalidarCodigosExpirados();
    } catch (erro) {
        console.error("Erro ao invalidar códigos expirados:", erro);
    }
}

setInterval(rodarJobInvalidarCodigos, 60 * 1000);