import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import TodoTable from "./TodoTable";
import AddTodo from "./AddTodo";

const Home = () => {
  return (
    <div className="md:px-20 mt-10 h-[90vh] md:h-[75vh] overflow-scroll">
      <Card>
        <CardHeader>
          <CardTitle>Your todos</CardTitle>
          <CardDescription>Do it now!</CardDescription>
        </CardHeader>
        <CardContent>
          <AddTodo />
          <TodoTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
