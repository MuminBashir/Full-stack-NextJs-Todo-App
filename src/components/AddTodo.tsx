"use client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const AddTodo = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();

      if (data.success) {
        router.push("/login");
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

  return (
    <form onSubmit={submitHandler}>
      <Input
        className="mb-4"
        label={"Title"}
        placeholder="Enter title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Textarea
        className="mb-4"
        label={"Description"}
        placeholder="Enter description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></Textarea>
      <Button className="mb-5" type="submit">
        Add Todo
      </Button>
    </form>
  );
};

export default AddTodo;
