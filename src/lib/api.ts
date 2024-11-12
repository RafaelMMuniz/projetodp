// Função para buscar usuários
export async function fetchUsers() {
  const response = await fetch("/api/users");
  if (!response.ok) throw new Error("Erro ao buscar usuários");
  return response.json();
}

// Função para criar um novo usuário
export async function createUser(user: { nome: string; senha: string; rm: string; profissao: string }) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Erro ao criar usuário");
  return response.json();
}

// Função para deletar um usuário
export const deleteUser = async (email: string) => {
  const res = await fetch('/api/users', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('Erro ao deletar usuário');
  return res.json();
};

// Função para editar um usuário
export const editUser = async (email: string, updatedUser: any) => {
  const res = await fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, updatedUser }),
  });
  if (!res.ok) throw new Error('Erro ao editar usuário');
  return res.json();
};
