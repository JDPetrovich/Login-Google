import Constantes from '../constants/constantes.js';

export class BaseController {
    /**
     * Formata a resposta conforme o tipo informado no header accept da requisição.
     * @param {import('express').Request} req - Objeto Requisição.
     * @param {import('express').Response} res - Objeto Resposta.
     * @param {import('../../../app/interfaces/servico-interface.js').ServicoInterface} objetoDados - Instância contendo os dados dados que serão formatados.
     */
    FormatarResposta(req, res, objetoDados) {
        const accepts = req.headers.accept;
        if(accepts.includes(Constantes.MIME.HALJSON)) {
            res.type(Constantes.MIME.HALJSON);
            return objetoDados.HalJson();

        } else if(accepts.includes(Constantes.MIME.JSON) || accepts.includes(Constantes.MIME.TODOS)) {
            res.type(Constantes.MIME.JSON);
            return objetoDados.Json();

        } else if(accepts.includes(Constantes.MIME.HALXML)) {
            res.type(Constantes.MIME.HALXML);
            return objetoDados.HalXml();

        } else if(accepts.includes(Constantes.MIME.XML)) {
            res.type(Constantes.MIME.XML);
            return objetoDados.Xml();

        } else if(accepts.includes(Constantes.MIME.HTML)) {
            res.type(Constantes.MIME.HTML);
            return objetoDados.Html();

        } else {
            res.type(Constantes.MIME.TEXTO);
            res.status(Constantes.CodigoHTTP.NAO_ACEITAVEL);
            return Constantes.Mensagens.ACCEPT_INVALIDO;
        }
    }
}