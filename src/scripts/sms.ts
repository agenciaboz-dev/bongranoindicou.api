import axios from "axios";

export async function sendSMS(to: string, message: string) {
  try {
    const smsData = {
      messages: [
        {
          to: `+55${to}`,
          source: "sdk",
          body: message,
        },
      ],
    };

    const response = await axios.post(
      "https://rest.clicksend.com/v3/sms/send",
      smsData,
      {
        auth: {
          username: "lucasboz",
          password: "843DD057-2CC7-6DEA-E964-A847CAD0F8B3",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SMS sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
}
