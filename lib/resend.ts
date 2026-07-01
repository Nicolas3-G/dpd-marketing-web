import { Resend } from "resend";

export type ContactPayload = {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
};

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendContactEmail(payload: ContactPayload) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "DPD Contact Form <onboarding@resend.dev>",
    to: process.env.RESEND_TO_EMAIL ?? "hello@dpding.com",
    replyTo: payload.email,
    subject: `New message from ${payload.firstName} ${payload.lastName}`,
    html: buildEmailHtml(payload),
  });

  if (error) throw new Error(error.message ?? "Failed to send email");
}

function buildEmailHtml(p: ContactPayload): string {
  return `
    <table style="font-family:sans-serif;font-size:15px;color:#1F2532;max-width:560px;width:100%">
      <tr><td style="padding-bottom:24px">
        <h2 style="margin:0;font-size:20px">New contact form submission</h2>
      </td></tr>
      <tr><td style="padding-bottom:12px"><strong>Name:</strong> ${p.firstName} ${p.lastName}</td></tr>
      <tr><td style="padding-bottom:12px"><strong>Email:</strong> <a href="mailto:${p.email}">${p.email}</a></td></tr>
      ${p.phone ? `<tr><td style="padding-bottom:12px"><strong>Phone:</strong> ${p.phone}</td></tr>` : ""}
    </table>
  `;
}
