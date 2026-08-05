import type { ActionFunctionArgs } from "react-router";
import nodemailer from "nodemailer";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to: "franeadriane10@gmail.com",
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; background: #ffffff;">
          <div style="padding: 24px 28px 20px; border-bottom: 1px solid #eaeaea;">
            <p style="margin: 0 0 4px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #999;">
              Portfolio Contact Form
            </p>
            <h1 style="margin: 0; font-size: 20px; color: #111;">New message from ${escapeHtml(name)}</h1>
          </div>

          <div style="padding: 24px 28px;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 6px 0; width: 90px; font-size: 13px; color: #888; vertical-align: top;">Name</td>
                <td style="padding: 6px 0; font-size: 14px; color: #111;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; width: 90px; font-size: 13px; color: #888; vertical-align: top;">Email</td>
                <td style="padding: 6px 0; font-size: 14px;">
                  <a href="mailto:${escapeHtml(email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(email)}</a>
                </td>
              </tr>
            </table>

            <p style="margin: 0 0 8px; font-size: 13px; color: #888;">Message</p>
            <div style="background: #f6f6f7; border: 1px solid #ececec; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #222; white-space: pre-wrap;">${escapeHtml(message)}</div>
          </div>

          <div style="padding: 16px 28px; border-top: 1px solid #eaeaea;">
            <p style="margin: 0; font-size: 12px; color: #aaa;">
              Sent via the contact form on <a href="https://adriane.dev" style="color: #999;">adriane.dev</a> — reply directly to this email to respond to ${escapeHtml(name)}.
            </p>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Contact form error:", err);
    return new Response(JSON.stringify({ error: "Failed to send" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}