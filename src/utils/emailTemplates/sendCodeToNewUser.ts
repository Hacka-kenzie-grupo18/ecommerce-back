import Mailgen from "mailgen";

export const sendCodeToNewUser = (userEmail:string, userName:string, code:string) => {
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
            intro: 'Obrigado por se cadastrar em nosso site!',
    
            outro: `Use o cupom para conseguir desconto em suas compras: ${code}`
        }
    };

    const emailBody = mailGenerator.generate(email)

    const emailTemplate = ({
        to: userEmail,
        subject: "Seja bem vindo!",
        text: emailBody
    })

    return emailTemplate
}