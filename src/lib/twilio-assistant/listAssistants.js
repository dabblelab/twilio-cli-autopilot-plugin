/**
 * Function is use to get list of assistant
 * @access private
 * @return json
 * Created Date 08/30/2019
 */

const listAssistants = async (twilioClient) => {
  return twilioClient.autopilot.assistants.list();
}

module.exports = {listAssistants};