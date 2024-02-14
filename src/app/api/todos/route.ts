import { checkToken } from "@/middlewares/auth";
import { errorHandler } from "@/middlewares/error";
import Todo from "@/models/todo";
import User from "@/models/user";
import { connectDB } from "@/utils/features";
import { isObjectIdOrHexString } from "mongoose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { z } from "zod";

const todoInput = z.object({
  title: z.string().min(3, "Title must contain atleast 3 characters"),
  description: z
    .string()
    .min(10, "Description must contain atleast 10 characters"),
});

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return errorHandler(401, "Please login first!");
    }

    const userId = checkToken(token.value);

    if (!isObjectIdOrHexString(userId)) {
      return errorHandler(400, "Invalid Token Id");
    }

    connectDB();

    const user = await User.findById(userId).populate("todos");

    if (!user) {
      return errorHandler(401, "Token validation failed! Please login again");
    }

    return Response.json({ success: true, todos: user.todos }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorHandler(500, error.message);
    } else {
      return errorHandler(500, "Internal server error");
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return errorHandler(401, "Please login first!");
    }

    const input = await req.json();
    const parsedInput = todoInput.safeParse(input);

    if (!parsedInput.success) {
      return errorHandler(400, parsedInput.error.issues[0].message);
    }

    const title = parsedInput.data.title;
    const description = parsedInput.data.description;

    if (!title || !description) {
      return errorHandler(400, "Please provide title and description");
    }

    const userId = checkToken(token.value);

    if (!isObjectIdOrHexString(userId)) {
      return errorHandler(400, "Invalid Token Id");
    }

    connectDB();

    const user = await User.findById(userId);

    if (!user) {
      return errorHandler(401, "Token validation failed! Please login again");
    }

    const newTodo = {
      title,
      description,
      owner: userId,
    };

    const todo = await Todo.create(newTodo);

    user?.todos.unshift(todo._id);
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Todo added successfully!",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorHandler(500, error.message);
    } else {
      return errorHandler(500, "Internal server error");
    }
  }
}

export async function PUT(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return errorHandler(401, "Please login first!");
    }

    const params = req.nextUrl.searchParams;

    const todoId = params.get("id");

    if (!isObjectIdOrHexString(todoId)) {
      return errorHandler(400, "Invalid Todo Id");
    }

    const userId = checkToken(token.value);

    if (!isObjectIdOrHexString(userId)) {
      return errorHandler(400, "Invalid Token Id");
    }

    connectDB();

    const user = await User.findById(userId);

    if (!user) {
      return errorHandler(401, "Token validation failed! Please login again");
    }

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return errorHandler(404, "Todo not found");
    }

    if (todo.owner.toString() !== userId.toString()) {
      return errorHandler(401, "Unauthorized Access!");
    }

    todo.completed = !todo.completed;
    await todo.save();

    return Response.json(
      {
        success: true,
        message: `Todo marked as ${
          todo.completed ? "complete" : "incomplete"
        }!`,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorHandler(500, error.message);
    } else {
      return errorHandler(500, "Internal server error");
    }
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return errorHandler(401, "Please login first!");
    }

    const params = req.nextUrl.searchParams;

    const todoId = params.get("id");

    if (!isObjectIdOrHexString(todoId)) {
      return errorHandler(400, "Invalid Todo Id");
    }

    const userId = checkToken(token.value);

    if (!isObjectIdOrHexString(userId)) {
      return errorHandler(400, "Invalid Token Id");
    }

    connectDB();

    const todo = await Todo.findById(todoId);

    const user = await User.findById(userId);

    if (!user) {
      return errorHandler(401, "Token validation failed! Please login again");
    }

    if (!todo) {
      return errorHandler(404, "Todo not found");
    }

    if (todo.owner.toString() !== userId.toString()) {
      return errorHandler(401, "Unauthorized Access!");
    }

    await todo.deleteOne();
    const index = user.todos.indexOf(todoId as any);
    user.todos.splice(index, 1);
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Todo deleted successfully!",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorHandler(500, error.message);
    } else {
      return errorHandler(500, "Internal server error");
    }
  }
}
