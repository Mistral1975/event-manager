// src/app/register/page.js
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

// Definizione dello schema di validazione con Zod
const schema = z.object({
  name: z.string().min(2, "Il nome deve avere almeno 2 caratteri"),
  email: z.string().email("Inserisci un'email valida"),
  password: z.string().min(6, "La password deve avere almeno 6 caratteri"),
});

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        /* body: JSON.stringify({
            displayName: input.displayName,
            email: input.email,
            password: input.password
        }) */
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Registrazione fallita");
      }

      setSuccess(
        "Registrazione avvenuta con successo! Verrai reindirizzato al login..."
      );
      setTimeout(() => router.push("/login"), 3000);
      //setTimeout(() => router.push("/register/confirm"), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Registrazione</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input {...register("name")} className="w-full p-2 border rounded" />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input {...register("email")} className="w-full p-2 border rounded" />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 border-2 border-white rounded-full border-t-transparent"
                viewBox="0 0 24 24"
              ></svg>
              Registrazione in corso...
            </>
          ) : (
            "Registrati"
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
