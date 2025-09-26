export class ServicoInterface {
    constructor() {
        if (new.target === ServicoInterface) {
            throw new Error("Essa classe não deve ser instânciada. É uma interface apenas!");
        }
    }

    HalJson() {
        throw new Error("O método 'HalJson()' deve ser implementado.");
    }

    Json() {
        throw new Error("O método 'Json()' deve ser implementado.");
    }

    HalXml() {
        throw new Error("O método 'HalXml()' deve ser implementado.");
    }

    Xml() {
        throw new Error("O método 'Xml()' deve ser implementado.");
    }

    Html() {
        throw new Error("O método 'Html()' deve ser implementado.");
    }
}
