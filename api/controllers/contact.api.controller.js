import * as contactService from '../../services/contact.service.js'

/*
async function sendEmail(req, res)
{
    const emailData = req.body

    await contactService.sendEmail(emailData)
        .then(function(){
            res.status(200).json({ msg: 'contact_success' })
        })
        .catch((err) => {
            res.status(500).json({ error: { msg: 'contact_error_server' } })
        })
}*/

async function sendEmail(req, res) {
  try {
    const emailData = req.body
    await contactService.sendEmail(emailData)
    res.status(200).json({ msg: 'contact_success' })
  } catch (err) {
    console.error("CONTACT API ERROR:", err)
    res.status(500).json({
      error: 'contact_error_server',
      detail: err.message
    })
  }
}

export{
    sendEmail
}