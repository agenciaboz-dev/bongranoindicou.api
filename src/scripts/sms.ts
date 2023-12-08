import * as ClickSendAPI from "clicksend";

export async function sendSMS(to: string, message: string) {
  const smsApi = new ClickSendAPI.SMSApi(
    "lucasboz",
    "843DD057-2CC7-6DEA-E964-A847CAD0F8B3"
  );

  const smsMessage = new ClickSendAPI.SmsMessage();

  smsMessage.source = "sdk";
  smsMessage.to = to;
  smsMessage.body = message;

  const smsCollection = new ClickSendAPI.SmsMessageCollection();

  smsCollection.messages = [smsMessage];

  try {
    const response = await smsApi.smsSendPost(smsCollection);
    console.log(response.body);
  } catch (err) {
    console.error(err);
  }
}

// Example usage
sendSMS("+0451111111", "test message");
