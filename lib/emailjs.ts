import emailjs from "@emailjs/nodejs";

export type ContactPayload = {
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  phone: string;
  company: string;
};

function getConfig() {
  return {
    publicKey: process.env.EMAILJS_PUBLIC_KEY ?? "",
    privateKey: process.env.EMAILJS_PRIVATE_KEY ?? "",
    serviceId: process.env.EMAILJS_SERVICE_ID ?? "",
    templateId: process.env.EMAILJS_TEMPLATE_ID ?? "",
  };
}

export function isEmailjsConfigured(): boolean {
  const { publicKey, privateKey, serviceId, templateId } = getConfig();
  return Boolean(publicKey && privateKey && serviceId && templateId);
}

export function getEmailjsConfigStatus(): {
  configured: boolean;
  missing: string[];
} {
  const { publicKey, privateKey, serviceId, templateId } = getConfig();
  const missing: string[] = [];
  if (!publicKey) missing.push("EMAILJS_PUBLIC_KEY");
  if (!privateKey) missing.push("EMAILJS_PRIVATE_KEY");
  if (!serviceId) missing.push("EMAILJS_SERVICE_ID");
  if (!templateId) missing.push("EMAILJS_TEMPLATE_ID");
  return { configured: missing.length === 0, missing };
}

export async function sendContactEmail(payload: ContactPayload) {
  const { publicKey, privateKey, serviceId, templateId } = getConfig();

  return emailjs.send(
    serviceId,
    templateId,
    {
      from_name: `${payload.firstName} ${payload.lastName}`,
      email: payload.email,
      reply_to: payload.email,
      first_name: payload.firstName,
      last_name: payload.lastName,
      job_title: payload.jobTitle,
      phone: payload.phone,
      company: payload.company,
    },
    { publicKey, privateKey },
  );
}
