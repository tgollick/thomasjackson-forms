import * as React from "react";
import tjLogo from "../../public/tj-logo.svg";

interface EmailTemplateProps {
  verificationCode: string;
  email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  verificationCode,
  email,
}) => (
  <div
    style={{
      fontFamily:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: "#333",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      border: "1px solid #eaeaea",
    }}
  >
    {/* Header with logo */}
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "24px",
        padding: "16px 0",
        borderBottom: "1px solid #eaeaea",
      }}
    >
      <img
        src={tjLogo}
        alt="Thomas Jackson logo"
        style={{ maxHeight: "40px" }}
      />
    </div>

    {/* Main content */}
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "32px",
        borderRadius: "6px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "600",
          color: "#1a1a1a",
          marginTop: "0",
          marginBottom: "16px",
        }}
      >
        Verify your login
      </h1>

      <p
        style={{
          fontSize: "16px",
          lineHeight: "1.5",
          marginBottom: "24px",
          color: "#444",
        }}
      >
        Hi {email},
      </p>

      <p
        style={{
          fontSize: "16px",
          lineHeight: "1.5",
          marginBottom: "24px",
          color: "#444",
        }}
      >
        Please use the following verification code to complete your login:
      </p>

      {/* Verification code box */}
      <div
        style={{
          backgroundColor: "#f0f7ff",
          padding: "16px",
          borderRadius: "6px",
          textAlign: "center",
          marginBottom: "24px",
          borderLeft: "4px solid #3b82f6",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "32px",
            fontWeight: "bold",
            letterSpacing: "4px",
            color: "#1e40af",
          }}
        >
          {verificationCode}
        </div>
      </div>

      <p
        style={{
          fontSize: "14px",
          color: "#666",
          marginBottom: "24px",
        }}
      >
        This code will expire in 5 minutes. If you didn't request this code,
        please ignore this email.
      </p>

      <p
        style={{
          fontSize: "16px",
          lineHeight: "1.5",
          marginBottom: "0",
          color: "#444",
        }}
      >
        Thank you,
        <br />
        Thomas Jackson
      </p>
    </div>

    {/* Footer */}
    <div
      style={{
        marginTop: "24px",
        padding: "16px 0",
        borderTop: "1px solid #eaeaea",
        textAlign: "center",
        fontSize: "12px",
        color: "#666",
      }}
    >
      <p>© {new Date().getFullYear()} Thomas Jackson. All rights reserved.</p>
      <p>This is an automated message, please do not reply.</p>
    </div>
  </div>
);
