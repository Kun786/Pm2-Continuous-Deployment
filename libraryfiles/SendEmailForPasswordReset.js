const nodemailer = require("nodemailer");

const SendEmailUsingNodeMailer = async (_Email, _Link, _CredentialsObject) => {
  try {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // create reusable transporter object using the default SMTP transport
    const _SmtpService = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'itismyworkspace@gmail.com', // generated ethereal user
        pass: 'mitlndcbonnoffev', // generated ethereal password
      },
    });
    //Email Object

    const _EmailObject = {
      from: 'itismyworkspace@gmail.com', // sender address
      to: _Email, // list of receivers
      subject: "Skillstitute", // Subject linea
      html: `<b>
      <h3>UserId: ${_CredentialsObject.UserId}</h3>
      <h3>UserId: ${_CredentialsObject.Token}</h3>
      <br>
      <br>
      <br>
      <h5>Note: This is One Time Link and will Expire in 5 minute You cannot Use it Once it Expired</h5>
      <a href="${_Link}">Click Me</a>
  
      </b>`, // html body
    };

    // Send Email 

    const _SendEmail = await _SmtpService.sendMail(_EmailObject);
    return {
      Message: `Important Information Has Sent Successfully from ${_SendEmail.envelope.from} To ${_SendEmail.envelope.to} Please Check Your Email!`,
      Data: _SendEmail.messageId,
      Result: _SendEmail.response,
    };
  } catch (error) {
    return {
      Message: error.message,
      Data: false,
      Result: null
    }

  }

}

module.exports = { SendEmailUsingNodeMailer };