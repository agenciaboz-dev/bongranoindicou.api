import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

const transporter = nodemailer.createTransport({
    host: "agencyboz.com",
    port: 587,
    secure: false,
    auth: {
        user: "bongrano@agencyboz.com",
        pass: "u5uJ!jDNdh1Ofpce"
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
})

export const sendMail = async (destination: string, subject: string, text?: string, html?: string, attachments?: Mail.Attachment[]) => {
    const mailOptions: Mail.Options = {
        from: "Bongrano <bongrano@agenciaboz.com.br>",
        to: destination,
        subject,
        html,
        text,
        attachments
    }

    const response = await transporter.sendMail(mailOptions)
    return response
}
