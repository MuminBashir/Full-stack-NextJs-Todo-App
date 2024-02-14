import { errorHandler } from "@/middlewares/error";
import { setCookie } from "@/utils/features";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (token) {
      return Response.json(
        { success: true, message: `Logged out successfully` },
        {
          status: 200,
          headers: { "Set-Cookie": setCookie("") },
        }
      );
    } else {
      return errorHandler(401, "Not Logged-In");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorHandler(500, error.message);
    } else {
      return errorHandler(500, "Internal server error");
    }
  }
}
