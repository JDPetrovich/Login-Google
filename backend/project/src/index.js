import Servidor from "./plugins/server/server.js";
import "./app/jobs/invalidarCodigosExpirados.js";

const apiServidor = new Servidor();
apiServidor.Rodar();