import { errorHandler } from "@/middlewares/error";
import User from "@/models/user";
import {
  generateToken,
  connectDB,
  hashPassword,
  setCookie,
} from "@/utils/features";
import { NextRequest } from "next/server";
import { z } from "zod";

const signinInput = z.object({
  name: z.string().min(5, "Username must contain atleast 5 characters"),
  email: z.string(),
  password: z.string().min(8, "Password must be atleast 8 characters long"),
});

export async function POST(req: NextRequest) {
  try {
    const input = await req.json();
    const parsedInput = signinInput.safeParse(input);

    if (!parsedInput.success) {
      return errorHandler(400, parsedInput.error.issues[0].message);
    }

    const name = parsedInput.data.name;
    const email = parsedInput.data.email;
    const password = parsedInput.data.password;

    if (!name || !email || !password) {
      return errorHandler(400, "Fill all the input fields");
    }

    await connectDB();

    let user = await User.findOne({ email });

    if (user) {
      return errorHandler(400, "Email already exists");
    }

    const hashedPassword = await hashPassword(password);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    user = await User.findOne({ email });

    const token = generateToken(user?._id);

    return Response.json(
      { success: true, user, message: "User created successfully" },
      {
        status: 200,
        headers: { "Set-Cookie": setCookie(token || "") },
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorHandler(500, error.message);
    } else {
      return errorHandler(500, "Internal server error");
    }
  }
}
