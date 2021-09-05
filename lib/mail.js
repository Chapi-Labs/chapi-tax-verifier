import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text) {
  return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hola!</h2>
      <p>${text}</p>
      <br>
      <p>Chapi Tax</p>
    </div>
  `;
}

export async function sendPasswordResetEmail(resetToken, to) {
  try {
    // email the user a token
    const info = await transport.sendMail({
      to,
      from: 'Chapi Labs<no-reply@email.chapilabs.com>',
      subject: 'Reinicio de contraseña!',
      html: makeANiceEmail(`Este es el link para reiniciar la contraseña!
        <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click aquí</a>
      `),
      headers: {
        'X-PM-Message-Stream': 'chapi-tax-sandbox',
      },
    });
    if (process.env.MAIL_USER.includes('ethereal.email')) {
      console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);
    }
  } catch (e) {
    console.log(e);
  }
}
