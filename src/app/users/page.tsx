'use client'
import { useEffect, useState } from "react";
import { fetchUsers, deleteUser, editUser } from "../../lib/api"; 
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { useRouter } from "next/navigation";
import { User } from "../../types/user";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editedUser, setEditedUser] = useState<User | null>(null); 
  const router = useRouter();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
    fetchUsersData();
  }, []);

  const handleDelete = async (email: string) => {
    try {
      await deleteUser(email);
      setUsers(users.filter((user) => user.email !== email)); 
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  const handleEdit = (user: User) => {
    setEditedUser(user); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      const { name, value } = e.target;
      setEditedUser({
        ...editedUser,
        [name]: value,
      });
    }
  };

  const handleSaveEdit = async () => {
    if (editedUser) {
      try {
        const updatedUser = await editUser(editedUser.email, editedUser);
        setUsers(users.map((user) => user.email === updatedUser.email ? updatedUser : user)); 
        setEditedUser(null); 
      } catch (error) {
        console.error("Erro ao editar usuário:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-center items-center p-8">
      <div className="max-w-4xl w-full p-8 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-4xl font-bold text-center text-gray-300 mb-6">Usuários Registrados</h2>
        
        {editedUser ? (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-200">Editar Usuário</h3>
            <form>
              <div>
                <label className="block text-gray-300">Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={editedUser.nome || ''}
                  onChange={handleInputChange}
                  className="p-3 mt-2 w-full bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300">RM:</label>
                <input
                  type="text"
                  name="rm"
                  value={editedUser.rm || ''}
                  onChange={handleInputChange}
                  className="p-3 mt-2 w-full bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300">Profissão:</label>
                <input
                  type="text"
                  name="profissao"
                  value={editedUser.profissao || ''}
                  onChange={handleInputChange}
                  className="p-3 mt-2 w-full bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300">Senha:</label>
                <input
                  type="password"
                  name="senha"
                  value={editedUser.senha || ''}
                  onChange={handleInputChange}
                  className="p-3 mt-2 w-full bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-6 mt-4">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition ease-in-out duration-300">
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setEditedUser(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition ease-in-out duration-300">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        ) : (
          <ul className="space-y-6">
            {users.map((user) => (
              <li key={user.email} className="p-6 bg-gray-700 border border-gray-600 rounded-lg shadow-md hover:bg-gray-600 transition ease-in-out duration-300">
                <p><strong>Nome:</strong> {user.nome}</p>
                <p><strong>RM:</strong> {user.rm}</p>
                <p><strong>Profissão:</strong> {user.profissao}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Senha:</strong> {user.senha}</p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <PencilIcon className="w-5 h-5" /> {/* Ícone de editar */}
                  </button>
                  
                  <button
                    onClick={() => handleDelete(user.email)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <TrashIcon className="w-5 h-5" /> {/* Ícone de deletar */}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 text-center">
          <button 
            onClick={() => router.push("/")} 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300">
            Voltar para o Login
          </button>
          
          <div className="mt-4">
            <button 
              onClick={() => router.push("/register")} 
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300">
              Nenhum usuário cadastrado? Registre um!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
