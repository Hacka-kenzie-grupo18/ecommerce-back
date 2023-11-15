import "dotenv"
import { sendEmailType } from "../../interfaces/email.interfaces";
import AppError from "../../errors/app.errors";
import { transport } from "../emailTransport/emailTransport.utils";



export const sendEmail = async({to, subject, text}: sendEmailType) => {
    
       try {
          await transport.sendMail({
            from: process.env.EMAIL_ORIGIN_SEND_RESET_PASSWORD!,
            to,
            subject,
            html: text
          })

          console.log("Email sent successfully")

      } catch (error) {
        console.log(error)
        throw new AppError("Error when sending email, try again", 500)
      }

}