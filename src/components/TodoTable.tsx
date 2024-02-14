"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/store/atoms";
import { redirect } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface todosType {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TodoTable = () => {
  const { toast } = useToast();

  const user = useRecoilValue(userAtom);
  const [todos, setTodos] = useState<todosType[]>([]);

  const getTodos = () => {
    try {
      fetch("api/todos")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setTodos(data.todos);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = async (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const response = await fetch(`/api/todos?id=${id}`, {
        method: "PUT",
      });

      const data = await response.json();

      if (data.success && e.target.checked) {
        getTodos();
        toast({
          variant: "warning",
          description: data.message,
        });
      } else if (data.success && !e.target.checked) {
        getTodos();
        toast({
          variant: "success",
          description: data.message,
        });
      } else {
        toast({
          variant: "destructive",
          description: data.message,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          description: error.message,
        });
        toast({
          variant: "destructive",
          description: "Some internal error occured",
        });
      }
    }
  };

  const deleteHandler = async (id: string) => {
    try {
      const response = await fetch(`/api/todos?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        getTodos();
        toast({
          variant: "success",
          description: data.message,
        });
      } else {
        toast({
          variant: "destructive",
          description: data.message,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          description: error.message,
        });
        toast({
          variant: "destructive",
          description: "Some internal error occured",
        });
      }
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  if (!user.success) {
    {
      toast({
        variant: "destructive",
        description: "Please Login first!",
      });
    }
    redirect("/login");
  }
  return (
    <Table>
      <TableCaption>
        {todos.length > 0
          ? "A list of your todos."
          : "You don't have any todos yet"}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[20%]">Title</TableHead>
          <TableHead className="w-[70%]">Description</TableHead>
          <TableHead>Complete</TableHead>
          <TableHead className="w-[6rem]">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => {
          return (
            <TableRow key={todo._id}>
              <TableCell className="font-medium">{todo.title}</TableCell>
              <TableCell>{todo.description}</TableCell>
              <TableCell>
                <Input
                  type="checkbox"
                  height="h-6"
                  checked={todo.completed}
                  onChange={(e) => {
                    updateHandler(todo._id, e);
                  }}
                />
              </TableCell>
              <TableCell className="w-[6rem]">
                <Button
                  size="sm"
                  onClick={() => {
                    deleteHandler(todo._id);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TodoTable;
