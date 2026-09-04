const DOMAIN = "interviewdj.com";
const WWW_DOMAIN = `www.${DOMAIN}`;

const EXPECTED_A_RECORD = "216.150.1.1";
const EXPECTED_CNAME =
  "6e76209e71e52cb4.vercel-dns-017.com.";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const problems: string[] = [];

  // Check A record
  try {
    const aRecords = await getARecords(DOMAIN);

    console.log("A records:", aRecords);

    if (!aRecords.includes(EXPECTED_A_RECORD)) {
      problems.push(
        `A record incorrect. Current: ${aRecords.join(", ")}`
      );
    }
  } catch (error) {
    console.error("A record check failed:", error);
    problems.push("Unable to check A record.");
  }

  // Check CNAME
  try {
    const cnameRecords = await getCnameRecords(WWW_DOMAIN);

    console.log("CNAME records:", cnameRecords);

    if (!cnameRecords.includes(EXPECTED_CNAME)) {
      problems.push(
        `CNAME incorrect. Current: ${cnameRecords.join(", ")}`
      );
    }
  } catch (error) {
    console.error("CNAME check failed:", error);
    problems.push("Unable to check CNAME.");
  }

  // Check website
  try {
    const response = await fetch(`https://${DOMAIN}`, {
      cache: "no-store",
    });

    console.log("Website status:", response.status);

    if (!response.ok) {
      problems.push(
        `Website returned HTTP ${response.status}.`
      );
    }
  } catch (error) {
    console.error("Website check failed:", error);
    problems.push("Website is unreachable.");
  }

  // Alert Slack if anything is wrong
  if (problems.length > 0) {
    await sendSlackAlert(
      `🚨 DPD Marketing website issue detected!\n\n${problems.join("\n")}`
    );

    return Response.json(
      {
        healthy: false,
        problems,
      },
      { status: 500 }
    );
  }

  return Response.json({
    healthy: true,
  });
}

async function getARecords(domain: string): Promise<string[]> {
  const response = await fetch(
    `https://dns.google/resolve?name=${domain}&type=A`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`DNS lookup failed: ${response.status}`);
  }

  const data = await response.json();

  return (
    data.Answer
      ?.filter((record: { type: number }) => record.type === 1)
      .map((record: { data: string }) => record.data) ?? []
  );
}

async function getCnameRecords(domain: string): Promise<string[]> {
  const response = await fetch(
    `https://dns.google/resolve?name=${domain}&type=CNAME`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`DNS lookup failed: ${response.status}`);
  }

  const data = await response.json();

  return (
    data.Answer
      ?.filter((record: { type: number }) => record.type === 5)
      .map((record: { data: string }) => record.data) ?? []
  );
}

async function sendSlackAlert(message: string) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("SLACK_WEBHOOK_URL is missing");
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: message,
    }),
  });

  if (!response.ok) {
    console.error(`Slack webhook failed: ${response.status}`);
  }
}