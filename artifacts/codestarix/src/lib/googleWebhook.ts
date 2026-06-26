export interface WebhookPayload {
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  createdAt: string;
}

export async function sendWebhookBackup(payload: WebhookPayload): Promise<boolean> {
  const webhookUrl = import.meta.env.VITE_WAITLIST_WEBHOOK || "https://script.google.com/macros/s/AKfycbxe2U24MzjWT61m5cwrkUdQ91FurvNlfMpEPII_Pi3_FtnzFsPznzKYgzqqw-7pYedV/exec";

  if (!webhookUrl) {
    console.warn("Google Sheets Webhook URL is not configured. Webhook backup skipped.");
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors", // Crucial for Google Apps Script web apps to prevent CORS blockages
      body: JSON.stringify(payload),
    });
    
    return true;
  } catch (error) {
    // Log silently, do not crash or interrupt the user registration flow
    console.error("Silent Webhook Backup Error:", error);
    return false;
  }
}
