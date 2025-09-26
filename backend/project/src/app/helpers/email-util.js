import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Envia um e-mail
 * @param {string} para - E-mail do destinatário
 * @param {string} assunto - Assunto do e-mail
 * @param {string} texto - Corpo do e-mail (texto simples)
 */
export async function enviarEmail(para, assunto, texto) {
    try {
        const info = await transport.sendMail({
            from: `"Equipe Patinhas Unidas" <${process.env.EMAIL_USER}>`,
            to: para,
            subject: assunto,
            text: texto
        });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        throw error;
    }
}
