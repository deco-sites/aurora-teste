import { AppContext } from "site/apps/site.ts";
import { Secret } from "apps/website/loaders/secret.ts";
import sendgrid from "sendgrid"; //assim tbm funcionou, basta usar sendgrid no lugar de sgMail, por exemplo sendgrid.setApiKey ou sengrid.send
//import sgMail from "sendgrid";      Esse aqui também funcionou, basta usar sgMail no lugar de sendgrid

export interface DataProps {
    name: string;
    email: string;
    tel: string;
    uf: string;
    city: string;
    whereMeetAurora: string;
}

export interface Attachment {
    name: string;
    type: string;
    content: string;
}

export interface Props {
    data: DataProps;
    recipientsEmail: string;
    subject: string;
    attachment?: Attachment | null;
}

const sendEmail = async (
    props: Props,
    req: Request,
    ctx: AppContext,
) => {
    const { sendgrid } = ctx;

    const msg = {
        "personalizations": [
            {
                "to": [
                    {
                        "email": props.recipientsEmail,
                    },
                ],
            },
        ],

        "subject": props.subject,
        "from": {
            "email": "naoresponda-site@souaurorasaude.com.br",
        },
        "content": [
            {
                "type": "text/plain",
                "value": props.data,
            },
        ],
    };

    if (props.attachment) {
        msg.attachments = [
            {
                "content": props.attachment.content,
                "filename": props.attachment.name,
                "type": props.attachment.type,
                "disposition": "attachment",
            },
        ];
    }

    {
        /*
    const msgWithattachments = {
        "personalizations": [
            {
                "to": [
                    {
                        "email": props.recipientsEmail,
                    },
                ],
            },
        ],

        "subject": props.subject,
        "from": {
            "email": "naoresponda-site@souaurorasaude.com.br",
        },
        "content": [
            {
                "type": "text/plain",
                "value": props.data,
            },
        ],
        "attachments": [
            {
                "content": props.attachment.content,
                "filename": props.attachment.name,
                "type": props.attachment.type,
                "disposition": "attachment",
            },
        ],
    };

    const msg2 = {
        to: "erick.nascim3nto@gmail.com",
        from: "naoresponda-site@souaurorasaude.com.br",
        subject: "Sending with SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
        */
    }

    try {
        const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sendgrid}`,
            },
            body: JSON.stringify(msg),
        });

        if (response.ok) {
            console.log("Email sent successfully");
        } else {
            const errorData = await response.json();
            console.error("SendGrid API error:", errorData);
        }
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export default sendEmail;
