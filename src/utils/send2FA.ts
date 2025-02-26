import { EmailTemplate } from "@/components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  verificationCode: string,
  email: string
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "thomasgollick@gmail.com",
      subject: "Thomas Jackson - Verification Code",
      react: await EmailTemplate({ verificationCode, email }),
    });

    if (error) {
      return {
        success: false,
        message: "There was an error sending 2FA email",
        code: error,
      };
    }

    return {
      success: true,
      message: "Verification Email has been sent to " + email,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "There was an error sending 2FA email",
      code: error,
    };
  }
};
