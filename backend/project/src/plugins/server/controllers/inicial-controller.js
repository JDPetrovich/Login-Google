import Servico from "../../../app/services/servicos.js";
import Constantes from '../constants/constantes.js';
import { BaseController } from "./base-controller.js";

class InicialController extends BaseController {
    constructor() {
        super();
    }

    /**
     * Responde a solicitação com a página inicial
     * @param {import('express').Request} req - Objeto Requisição.
     * @param {import('express').Response} res - Objeto Resposta.
     */
    RetornaPaginaInicialAPI(req, res) {
        res.send( super.FormatarResposta(req, res, new Servico.INICIAL(Constantes.UrlRota.API)) );
    };

    RetornaHealthCheckAPI(req, res) {
        res.send( super.FormatarResposta(req, res, new Servico.HEALTH_CHECK(Constantes.UrlRota.API)) );
    };
}

export default InicialController;