import { useEffect, useState } from "react";
import { getUsers } from "../lib/api"; // Função para obter os usuários

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers(); // Chama a função para pegar os dados
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Usuários Registrados</h2>
      <ul>
        {users.map((user: any, index: number) => (
          <li key={index} className="mb-2 p-2 border-b">
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>RM:</strong> {user.rm}</p>
            <p><strong>Profissão:</strong> {user.profession}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
