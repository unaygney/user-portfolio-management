"use client";
import { AppRouter } from "@/server";
import { trpc } from "@/trpc/client";

import { inferProcedureOutput } from "@trpc/server";
import React, { useState } from "react";

type GetUserOutput = inferProcedureOutput<AppRouter["user"]["getUsers"]>;

export default function Users({ initialData }: { initialData: GetUserOutput }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [email, setEmail] = useState("");

  const users = trpc.user.getUsers.useQuery(undefined, {
    initialData: initialData,
  });

  const addUserMutation = trpc.user.addUser.useMutation({
    onSuccess: () => {
      users.refetch();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && age && email) {
      addUserMutation.mutate({ name, age: Number(age), email });
      setName("");
      setAge("");
      setEmail("");
    }
  };

  return (
    <div className="text-black">
      {users.data?.map((user) => (
        <div>{user.name}</div>
      ))}

      <h2>Yeni Kullanıcı Ekle</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Ad"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="number"
          placeholder="Yaş"
          value={age}
          onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
          className="border p-2"
          required
        />
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
          Kullanıcı Ekle
        </button>
      </form>
    </div>
  );
}
