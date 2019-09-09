

const customChannel = async (assistantSid, channel, text, twilioClient) => {

    const request = require('request-promise');
  
    return await Promise.resolve()
  
      //remove samples and fields
      .then( async () => {
  
        const userpass = `${twilioClient.username}:${twilioClient.password}`;
        const options = {
            method : "POST",
            uri : `https://channels.autopilot.twilio.com/v1/${twilioClient.accountSid}/${assistantSid}/custom/${channel}`,
            headers : {
                authorization : `Basic ${Buffer.from(userpass).toString('base64')}`
            },
            form : {
                text : text,
                user_id : twilioClient.accountSid
            },
            json : true
        }

        return request(options)
            .then(response => {
                return response;
            })
            .catch(err => {
                throw err;
            })
      })
      
      .catch(err => {
        throw err;
      })
  
  }
  
  module.exports = { customChannel };