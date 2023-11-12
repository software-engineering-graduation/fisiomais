import React, { useState } from 'react';
import '../../index.css'

const CadastroFisioterapeuta = () => {
  const [form, setForm] = useState({
    nome: '',
    celular: '',
    endereco: '',
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onFinish = (e) => {
    e.preventDefault();
    console.log('Formulário enviado com sucesso:', form);
    // Implemente a lógica de envio de formulário aqui.
  };

  const onCancel = () => {
    setForm({
      nome: '',
      celular: '',
      endereco: '',
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Cadastro de Fisioterapeuta</h1>

      <form onSubmit={onFinish} className="space-y-6">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleInputChange}
            required
            pattern="^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$"
            title="Por favor, insira o nome!"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="celular" className="block text-sm font-medium text-gray-700">Celular de Contato</label>
          <input
            type="text"
            name="celular"
            value={form.celular}
            onChange={handleInputChange}
            required
            title="Por favor, insira o número de celular!"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">Endereço</label>
          <textarea
            name="endereco"
            value={form.endereco}
            onChange={handleInputChange}
            rows={4}
            required
            title="Por favor, insira o endereço!"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end gap-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-md transition duration-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300"
          >
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroFisioterapeuta;
