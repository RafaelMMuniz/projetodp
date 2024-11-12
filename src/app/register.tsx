import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveUser } from "../lib/api"; // Função para salvar o usuário

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rm, setRm] = useState("");
  const [profession, setProfession] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = { name, password, rm, profession };
    await saveUser(newUser); // Chama a função para salvar o usuário
    router.push("/users"); // Redireciona para a página de usuários
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Registrar</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rm" className="block text-sm font-medium">RM</label>
            <input
              type="text"
              id="rm"
              value={rm}
              onChange={(e) => setRm(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profession" className="block text-sm font-medium">Profissão</label>
            <input
              type="text"
              id="profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
