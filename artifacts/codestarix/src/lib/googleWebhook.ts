export interface WebhookPayload {
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  createdAt: string;
}

export async function sendWebhookBackup(payload: WebhookPayload): Promise<boolean> {
  const webhookUrl = import.meta.env.VITE_WAITLIST_WEBHOOK;

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
