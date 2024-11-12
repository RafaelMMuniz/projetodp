import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "users.json");

export async function GET() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(data);
    return NextResponse.json(users);
  } catch (error) {
    console.error("Erro ao ler o arquivo JSON:", error);
    return NextResponse.json({ error: "Erro ao carregar usuários" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newUser = await request.json();
    const data = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(data);

    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Erro ao salvar o usuário:", error);
    return NextResponse.json({ error: "Erro ao salvar usuário" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { email, updatedUser } = await request.json();
    const data = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(data);

    const userIndex = users.findIndex((user: any) => user.email === email);

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUser };
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      return NextResponse.json(users[userIndex]);
    } else {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }
  } catch (error) {
    console.error("Erro ao editar o usuário:", error);
    return NextResponse.json({ error: "Erro ao editar usuário" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { email } = await request.json();
    const data = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(data);

    const filteredUsers = users.filter((user: any) => user.email !== email);

    if (filteredUsers.length !== users.length) {
      fs.writeFileSync(filePath, JSON.stringify(filteredUsers, null, 2));
      return NextResponse.json({ message: "Usuário deletado com sucesso" });
    } else {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }
  } catch (error) {
    console.error("Erro ao deletar o usuário:", error);
    return NextResponse.json({ error: "Erro ao deletar usuário" }, { status: 500 });
  }
}
