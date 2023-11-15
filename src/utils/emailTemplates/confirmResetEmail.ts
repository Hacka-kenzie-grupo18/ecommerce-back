import Mailgen from "mailgen";

export const sendEmailResetPasswordSucess = (userEmail: string, userName:string) => {
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
            intro: 'Sua senha foi alterada com sucesso!',
        }
    };

    const emailBody = mailGenerator.generate(email);
    const emailTemplate = ({
        to: userEmail,
        subject: "Senha alterada!",
        text: emailBody
    })

    return emailTemplate
}