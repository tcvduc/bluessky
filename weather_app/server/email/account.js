const sgMail = require("@sendgrid/mail");
const apiKey = process.env.SENDGRID_API_KEY;

let log = console.log;
sgMail.setApiKey(apiKey);

const sendWelcomeMail = (email, name) => {
  const msg = {
    to: email,
    from: "caovanducs@gmail.com",
    subject: "Test sending mail from node",
    text: "Can send mail with node",
    html: `<h1>Hello ${name}, Im Duc</h1>`,
  };
  sgMail
    .send(msg)
    .then((rs) => log(rs))
    .catch((er) => log(er));
};

module.exports = { sendWelcomeMail };
