import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("Vercel Webhook:", body);

    const secret = request.headers.get("x-vercel-signature");

    if (secret !== process.env.VERCEL_WEBHOOK_SECRET) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await fetch(process.env.SLACK_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "🚨 Vercel has detected an issue with the DPD Marketing website!",
      }),
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error in webhook api route",
      },
      {
        status: 400,
      },
    );
  }
}
