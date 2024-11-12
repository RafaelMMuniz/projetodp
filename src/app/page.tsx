'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/users');
    const users = await response.json();

    const user = users.find((user: { email: string; senha: string }) => user.email === email && user.senha === password);

    if (user) {
      router.push("/users");
    } else {
      alert("Credenciais inválidas");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <div className="p-8 bg-gray-600 shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-black">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border rounded text-black"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-black">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border rounded text-black"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => router.push("/register")}
            className="text-blue-500">Registrar-se</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
