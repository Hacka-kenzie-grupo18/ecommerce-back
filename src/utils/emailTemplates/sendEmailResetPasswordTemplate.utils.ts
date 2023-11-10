import Mailgen from "mailgen";

export const sendEmailResetPasswordTemplate = (userEmail: string, userName:string, token:string) => {
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Cultura Geek',
            link: 'http://localhost:3000/HomePage'
        }
    });

    const email = {
        body: {
            name:  userName,
            intro: 'Você recebeu esse email porque uma solicitação de alteração de senha foi solicitada.',
            action: {
                instructions: 'Clique no botão abaixo para criar uma nova senha.',
                button: {
                    color: '#DC4D2F',
                    text: 'Nova senha',
                    link: `http://localhost:3000/resetPassword/${token}`
                }
            },
            outro: 'Se você não solicitou uma alteração de senha, desconsidere essa mensagem.'
        }
    };

    const emailBody = mailGenerator.generate(email);
    const emailTemplate = ({
        to: userEmail,
        subject: "Recriar senha",
        text: emailBody
    })

    return emailTemplate
}