'use client';

import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    // Redireciona automaticamente para /raio-x
    window.location.replace('/raio-x');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-orange-800 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Redirecionando...</p>
      </div>
    </div>
  );
}