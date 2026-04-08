"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { Card, Button } from "@/components/ui";

function ConfirmDeleteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Token no válido");
      setLoading(false);
      return;
    }

    async function confirmDelete() {
      try {
        const response = await fetch("/api/delete-account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Error al eliminar la cuenta");
        } else {
          setSuccess(true);
        }
      } catch (err) {
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    }

    confirmDelete();
  }, [token]);

  if (loading) {
    return (
      <Card className="text-center max-w-md">
        <Loader2 className="w-16 h-16 mx-auto mb-4 text-primary animate-spin" />
        <h1 className="text-2xl font-bold mb-2">Eliminando cuenta...</h1>
        <p className="text-gray-500">Por favor espera</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="text-center max-w-md">
        <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-500" />
        <h1 className="text-2xl font-bold mb-2">Error</h1>
        <p className="text-gray-500 mb-6">{error}</p>
        <Button onClick={() => router.push("/")}>Volver al inicio</Button>
      </Card>
    );
  }

  return (
    <Card className="text-center max-w-md">
      <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
      <h1 className="text-2xl font-bold mb-2">Cuenta eliminada</h1>
      <p className="text-gray-500 mb-6">
        Tu cuenta ha sido eliminada exitosamente. Gracias por usar Learn With Sena.
      </p>
      <Button onClick={() => router.push("/")}>Volver al inicio</Button>
    </Card>
  );
}

export default function ConfirmDeletePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense
        fallback={
          <Card className="text-center max-w-md">
            <Loader2 className="w-16 h-16 mx-auto mb-4 text-primary animate-spin" />
            <h1 className="text-2xl font-bold mb-2">Cargando...</h1>
          </Card>
        }
      >
        <ConfirmDeleteContent />
      </Suspense>
    </div>
  );
}