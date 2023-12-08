import twilio from "twilio";

// Replace these values with your Twilio Account SID and Auth Token
const accountSid = process.env.TWILIO_ACCOUNT_SID || "your_account_sid";
const authToken = process.env.TWILIO_AUTH_TOKEN || "your_auth_token";

// Create a Twilio client instance
const client = twilio(accountSid, authToken);

// Replace with your Verify service SID
const verifyServiceSid = "VA1f28bcbc51c26770786687207b2dc1b9";

// Function to send a verification code via SMS
export async function sendSMS(recipientPhoneNumber: string, message: string) {
  try {
    const sentMessage = await client.messages.create({
      body: message,
      from: "your_twilio_phone_number", // Replace with your Twilio phone number
      to: recipientPhoneNumber,
    });
    console.log("Custom SMS SID:", sentMessage.sid);
  } catch (error) {
    console.error("Error sending custom SMS:", error);
  }
}

// Example usage
sendSMS("+15017122661", "hello"); // Replace with the recipient's phone number
