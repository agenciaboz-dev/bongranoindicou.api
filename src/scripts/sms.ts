import exp from "constants";
import { send } from "process";
import twilio from "twilio";

const accountSid = "AC3ae8ebc7d541bf128fc621b8ca78fdde";
const authToken = "8f3605073dfa69c98ee416d401de3a54";
const twilioPhoneNumber = "+55041999815114";

const client = twilio(accountSid, authToken);

// Function to send an SMS
export async function sendSMS(recipientPhoneNumber: string, message: string) {
  try {
    await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: recipientPhoneNumber,
    });
    console.log("SMS sent successfully");
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
}

// Example usage
sendSMS("+1234567890", "Your authentication code is: 123456");
