"use client";

import React, { useState } from 'react';
import { createUser } from '../../lib/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",        
    rm: "",
    profession: "",
    email: "",       
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedData = {
        nome: formData.name,
        senha: formData.password,
        rm: formData.rm,
        profissao: formData.profession,
        email: formData.email,
      };

      await createUser(formattedData); 
      alert("Usuário registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar o usuário:", error);
      alert("Erro ao registrar o usuário");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-700 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Registro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-black">Nome</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full p-2 border rounded text-black" 
            required 
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full p-2 border rounded text-black" 
            required 
          />
        </div>
        <div>
          <label htmlFor="rm" className="block text-sm font-medium">RM</label>
          <input 
            type="text" 
            id="rm" 
            name="rm" 
            value={formData.rm} 
            onChange={handleChange} 
            className="w-full p-2 border rounded text-black" 
            required 
          />
        </div>
        <div>
          <label htmlFor="profession" className="block text-sm font-medium">Profissão</label>
          <input 
            type="text" 
            id="profession" 
            name="profession" 
            value={formData.profession} 
            onChange={handleChange} 
            className="w-full p-2 border rounded text-black" 
            required 
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">Senha</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            className="w-full p-2 border rounded text-black" 
            required 
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
          Registrar
        </button>
        <button className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
          <a href="/">Já tem uma conta? entre com ela!</a>
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
