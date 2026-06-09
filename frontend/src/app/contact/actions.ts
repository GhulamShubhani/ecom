"use server";

import { BRAND } from "@/constants/brand";
import { z } from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().optional().or(z.literal("")),
  subject: z.string().trim().min(2, "Please add a subject"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<
    Record<"name" | "email" | "phone" | "subject" | "message", string>
  >;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: ContactFormState["errors"] = {};

    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<
        ContactFormState["errors"]
      >;

      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }

    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      errors: fieldErrors,
    };
  }

  const { name, email, phone, subject, message } = parsed.data;

  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS ||
    !process.env.CONTACT_TO_EMAIL
  ) {
    console.error("Missing contact form SMTP environment variables");

    return {
      status: "error",
      message:
        "Contact form is temporarily unavailable. Please email us directly.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${BRAND.name} Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New contact message: ${subject}`,
      text: `
    New contact form message
    
    Name: ${name}
    Email: ${email}
    Phone: ${phone || 'Not provided'}
    Subject: ${subject}
    
    Message:
    ${message}
      `.trim(),
      html: `
        <div style="margin:0; padding:0; background-color:#0b0b0b;">
          <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            style="background-color:#0b0b0b; margin:0; padding:24px 0; width:100%;"
          >
            <tr>
              <td align="center">
                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="max-width:680px; background-color:#141414; border:1px solid #2a2a2a; border-radius:18px; overflow:hidden; font-family:Arial, Helvetica, sans-serif;"
                >
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg, #0f0f0f 0%, #1b1b1b 70%, #220000 100%); padding:32px 36px; border-bottom:1px solid #2a2a2a;">
                      <div style="font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#ff8a8a; font-weight:700; margin-bottom:10px;">
                        ${BRAND.name}
                      </div>
                      <div style="font-size:30px; line-height:38px; font-weight:700; color:#ffffff; margin:0 0 8px 0;">
                        New Contact Message
                      </div>
                      <div style="font-size:15px; line-height:22px; color:#bdbdbd;">
                        Someone submitted the contact form from your website.
                      </div>
                    </td>
                  </tr>
    
                  <!-- Summary cards -->
                  <tr>
                    <td style="padding:24px 24px 8px 24px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding:8px;">
                            <div style="background-color:#191919; border:1px solid #2a2a2a; border-radius:14px; padding:16px;">
                              <div style="font-size:11px; color:#8a8a8a; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px;">Name</div>
                              <div style="font-size:16px; color:#ffffff; font-weight:600;">${escapeHtml(name)}</div>
                            </div>
                          </td>
                          <td style="padding:8px;">
                            <div style="background-color:#191919; border:1px solid #2a2a2a; border-radius:14px; padding:16px;">
                              <div style="font-size:11px; color:#8a8a8a; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px;">Subject</div>
                              <div style="font-size:16px; color:#ffffff; font-weight:600;">${escapeHtml(subject)}</div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
    
                  <!-- Contact info -->
                  <tr>
                    <td style="padding:8px 32px 0 32px;">
                      <div style="font-size:18px; font-weight:700; color:#ffffff; margin-bottom:14px;">
                        Contact Details
                      </div>
    
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                        <tr>
                          <td style="padding:14px 0; border-top:1px solid #262626; width:140px; color:#8f8f8f; font-size:14px;">Email</td>
                          <td style="padding:14px 0; border-top:1px solid #262626; color:#ffffff; font-size:14px;">
                            <a href="mailto:${escapeHtml(email)}" style="color:#ff4d4f; text-decoration:none;">
                              ${escapeHtml(email)}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:14px 0; border-top:1px solid #262626; width:140px; color:#8f8f8f; font-size:14px;">Phone</td>
                          <td style="padding:14px 0; border-top:1px solid #262626; color:#ffffff; font-size:14px;">
                            ${escapeHtml(phone || 'Not provided')}
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:14px 0; border-top:1px solid #262626; width:140px; color:#8f8f8f; font-size:14px;">Reply To</td>
                          <td style="padding:14px 0; border-top:1px solid #262626; color:#ffffff; font-size:14px;">
                            Reply directly to this email to contact the sender.
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
    
                  <!-- Message -->
                  <tr>
                    <td style="padding:28px 32px 12px 32px;">
                      <div style="font-size:18px; font-weight:700; color:#ffffff; margin-bottom:14px;">
                        Message
                      </div>
                      <div style="background-color:#101010; border:1px solid #2a2a2a; border-left:4px solid #e30000; border-radius:14px; padding:20px; color:#d7d7d7; font-size:15px; line-height:26px; white-space:pre-wrap;">
                        ${escapeHtml(message).replaceAll('\n', '<br />')}
                      </div>
                    </td>
                  </tr>
    
                  <!-- CTA -->
                  <tr>
                    <td style="padding:20px 32px 12px 32px;">
                      <a
                        href="mailto:${escapeHtml(email)}?subject=Re:%20${encodeURIComponent(subject)}"
                        style="display:inline-block; background-color:#e30000; color:#ffffff; text-decoration:none; font-size:14px; font-weight:700; padding:14px 24px; border-radius:999px;"
                      >
                        Reply to ${escapeHtml(name)}
                      </a>
                    </td>
                  </tr>
    
                  <!-- Footer -->
                  <tr>
                    <td style="padding:24px 32px 32px 32px;">
                      <div style="border-top:1px solid #262626; padding-top:18px; font-size:12px; line-height:20px; color:#7f7f7f;">
                        This message was sent from the <span style="color:#ffffff;">${BRAND.name}</span> website contact form.
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    return {
      status: "success",
      message:
        "Thanks for reaching out! We'll get back to you within 24 hours.",
    };
  } catch (error) {
    console.error("Contact email error:", error);

    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again.",
    };
  }
}
