import HAL from 'hal';
import XMLParser from 'js2xmlparser';
import { ServicoInterface } from '../interfaces/servico-interface.js';

export class InicialService extends ServicoInterface {
    #representacao;
    #urlRecurso;

    constructor(urlRecurso) {
        super();
        this.#representacao = {
            content: "Bem-vindo a Web API - Template Web API NodeJs"
        };
        this.#urlRecurso = urlRecurso;
    }

    HalJson() {
        return HAL.Resource(this.#representacao, this.#urlRecurso).toJSON();
    }

    HalXml() {
        return HAL.Resource(this.#representacao, this.#urlRecurso).toXML();
    }

    Json() {
        return JSON.stringify(this.#representacao);
    }

    Xml() {
        return XMLParser.parse("resource", this.#representacao);
    }

    Html() {
        return `<html><body><h1>${this.#representacao.content}</h1></body></html>`;
    }
}