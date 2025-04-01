// src/app/register/confirm/page.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ConfirmEmailPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Simulazione di verifica dell'email
    setTimeout(() => {
      router.push("/login");
    }, 5000);
  }, [router]);

  return (
    <div className="container mx-auto p-6 max-w-md text-center">
      <h1 className="text-2xl font-bold mb-4">Verifica la tua email</h1>
      <p className="text-gray-600">
        Abbiamo inviato un link di conferma alla tua email.
      </p>
      <p className="text-gray-600">
        Controlla la tua casella di posta e clicca sul link per completare la
        registrazione.
      </p>
      <p className="text-blue-500 mt-4">
        Reindirizzamento al login in 5 secondi...
      </p>
    </div>
  );
};

export default ConfirmEmailPage;
