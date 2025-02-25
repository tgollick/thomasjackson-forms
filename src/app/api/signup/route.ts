import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword } from "@/utils/auth"; // Adjust path if needed
import { prisma } from "@/utils/prisma"; // Adjust path if needed

const signUpSchema = z.object({
  email: z.string().min(1, "Email is required for signup"),
  password: z.string().min(1, "A password is required for signup"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedInput = signUpSchema.safeParse(body);

    if (!parsedInput.success) {
      return NextResponse.json(
        { error: parsedInput.error.message },
        { status: 400 }
      );
    }

    const { email, password } = parsedInput.data;
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Error signing user up: " + err },
      { status: 500 }
    );
  }
}
