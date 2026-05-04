"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function QuizRedirect() {
  const params = useParams();
  const router = useRouter();
  const level = params.level as string;
  const moduleId = params.moduleId as string;
  
  useEffect(() => {
    router.replace(`/courses/${level}/${moduleId}/exam`);
  }, [level, moduleId, router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}
