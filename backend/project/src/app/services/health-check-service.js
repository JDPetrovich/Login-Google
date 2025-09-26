import HAL from 'hal';
import XMLParser from 'js2xmlparser';
import Constantes from '../../plugins/server/constants/constantes.js';

export class HealthCheckService {
    #dadosWebApi;
    #dadosBD;
    #dadosExternalApi;
    #urlRecurso;

    constructor(urlRecurso) {
        this.#dadosWebApi = {
            content: "Template Web API NodeJs - HEALTH CHECK!",
            status: Constantes.HealthStatus.UP,
            timestamp: Date.now()
        };
        this.#dadosBD = {
            status: Constantes.HealthStatus.NO,
            latencyMs: -1
        };
        this.#dadosExternalApi = {
            status: Constantes.HealthStatus.NO,
            latencyMs: -1
        };
        this.#urlRecurso = urlRecurso;
    }

    HalJson() {
        const recursoWebApi = HAL.Resource(this.#dadosWebApi, this.#urlRecurso);
        const recursoBancoDeDados = HAL.Resource(this.#dadosBD, "");
        const recursoAPIExterna = HAL.Resource(this.#dadosExternalApi, "");
        recursoWebApi.embed("database", [recursoBancoDeDados]);
        recursoWebApi.embed("externalAPI", [recursoAPIExterna]);
        return recursoWebApi.toJSON();
    }

    HalXml() {
        const recursoWebApi = HAL.Resource(this.#dadosWebApi, this.#urlRecurso);
        const recursoBancoDeDados = HAL.Resource(this.#dadosBD, "");
        const recursoAPIExterna = HAL.Resource(this.#dadosExternalApi, "");
        recursoWebApi.embed("database", [recursoBancoDeDados]);
        recursoWebApi.embed("externalAPI", [recursoAPIExterna]);
        return recursoWebApi.toXML();
    }

    Json() {
        const representacao = this.#dadosWebApi;
        representacao.database = this.#dadosBD;
        representacao.externalapi = this.#dadosExternalApi;
        return JSON.stringify(representacao);
    }

    Xml() {
        const representacao = this.#dadosWebApi;
        representacao.database = this.#dadosBD;
        representacao.externalapi = this.#dadosExternalApi;
        return XMLParser.parse("resource", representacao);
    }

    Html() {
        return `<html><body>
                    <h1>${this.#dadosWebApi.content}</h1>
                    <table>
                        <tr><td>WEB API</td></tr>
                        <tr><td>Status</td><td>${this.#dadosWebApi.status}</td></tr>
                        <tr><td>TimeStamp</td><td>${this.#dadosWebApi.timestamp}</td></tr>
                        <tr><td>Database</td></tr>
                        <tr><td>Status</td><td>${this.#dadosBD.status}</td></tr>
                        <tr><td>LatencyMs</td><td>${this.#dadosBD.latencyMs}</td></tr>
                        <tr><td>External APIs</td></tr>
                        <tr><td>Status</td><td>${this.#dadosExternalApi.status}</td></tr>
                        <tr><td>LatencyMs</td><td>${this.#dadosExternalApi.latencyMs}</td></tr>
                    </table>
                </body></html>`;
    }
}