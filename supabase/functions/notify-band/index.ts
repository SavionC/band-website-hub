import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RECIPIENT_EMAIL = "teamstagefright@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { type, name, email, phone, message, eventType, venueLocation, eventDate, budget, requirements } = await req.json();

    let subject = "";
    let htmlBody = "";

    if (type === "booking") {
      subject = `🎸 New Booking Request from ${name}`;
      htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a0a0f; color: #f5f5f5; padding: 30px; border-radius: 12px;">
          <h1 style="color: #c4244a; font-size: 28px; border-bottom: 2px solid #c4244a; padding-bottom: 15px;">🎸 New Booking Request</h1>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 10px; color: #c4244a; font-weight: bold; width: 140px;">Name:</td><td style="padding: 10px;">${name}</td></tr>
            <tr style="background: rgba(196,36,74,0.1);"><td style="padding: 10px; color: #c4244a; font-weight: bold;">Email:</td><td style="padding: 10px;"><a href="mailto:${email}" style="color: #e85580;">${email}</a></td></tr>
            <tr><td style="padding: 10px; color: #c4244a; font-weight: bold;">Phone:</td><td style="padding: 10px;"><a href="https://wa.me/${phone?.replace(/[^0-9]/g, '')}" style="color: #e85580;">${phone}</a></td></tr>
            <tr style="background: rgba(196,36,74,0.1);"><td style="padding: 10px; color: #c4244a; font-weight: bold;">Event Type:</td><td style="padding: 10px;">${eventType}</td></tr>
            <tr><td style="padding: 10px; color: #c4244a; font-weight: bold;">Venue:</td><td style="padding: 10px;">${venueLocation}</td></tr>
            <tr style="background: rgba(196,36,74,0.1);"><td style="padding: 10px; color: #c4244a; font-weight: bold;">Event Date:</td><td style="padding: 10px;">${eventDate}</td></tr>
            <tr><td style="padding: 10px; color: #c4244a; font-weight: bold;">Budget:</td><td style="padding: 10px;">${budget}</td></tr>
            ${requirements ? `<tr style="background: rgba(196,36,74,0.1);"><td style="padding: 10px; color: #c4244a; font-weight: bold;">Requirements:</td><td style="padding: 10px;">${requirements}</td></tr>` : ''}
          </table>
          <p style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #333; color: #999; font-size: 12px;">Sent from Stage Fright website booking form.</p>
        </div>
      `;
    } else if (type === "contact") {
      subject = `📩 New Contact Message from ${name}`;
      htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a0a0f; color: #f5f5f5; padding: 30px; border-radius: 12px;">
          <h1 style="color: #c4244a; font-size: 28px; border-bottom: 2px solid #c4244a; padding-bottom: 15px;">📩 New Contact Message</h1>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 10px; color: #c4244a; font-weight: bold; width: 140px;">Name:</td><td style="padding: 10px;">${name}</td></tr>
            <tr style="background: rgba(196,36,74,0.1);"><td style="padding: 10px; color: #c4244a; font-weight: bold;">Email:</td><td style="padding: 10px;"><a href="mailto:${email}" style="color: #e85580;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 10px; color: #c4244a; font-weight: bold;">Phone:</td><td style="padding: 10px;"><a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #e85580;">${phone}</a></td></tr>` : ''}
          </table>
          <div style="margin-top: 20px; padding: 20px; background: rgba(196,36,74,0.1); border-radius: 8px; border-left: 4px solid #c4244a;">
            <p style="color: #c4244a; font-weight: bold; margin-bottom: 10px;">Message:</p>
            <p style="line-height: 1.6;">${message}</p>
          </div>
          <p style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #333; color: #999; font-size: 12px;">Sent from Stage Fright website contact form.</p>
        </div>
      `;
    } else {
      return new Response(JSON.stringify({ error: "Invalid type" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Send via Resend if API key is available
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Stage Fright <notifications@stagefright.band>",
          to: [RECIPIENT_EMAIL],
          subject,
          html: htmlBody,
        }),
      });

      if (!emailRes.ok) {
        console.error("Resend error:", await emailRes.text());
      }
    } else {
      console.log(`Email notification to ${RECIPIENT_EMAIL}: ${subject}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
