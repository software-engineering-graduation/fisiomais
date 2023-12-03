import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Select,
  Checkbox,
  Table,
  message,
  Modal,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const NovoTratamento = () => {
  const currentUser = useSelector((state) => state.currentUser.value);
  const { token } = currentUser;
  const [form] = Form.useForm();
  const [pacientes, setPacientes] = useState([]);
  const [midias, setMidias] = useState([]);
  const [midiasSelecionadas, setMidiasSelecionadas] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [exercicios, setExercicios] = useState([]);
  const [exerciciosSelecionados, setExerciciosSelecionados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPacientes = await axios.get(
          "http://localhost:8081/api/paciente",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const resMidias = await axios.get("http://localhost:8081/api/midia", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const resExercicios = await axios.get(
          "http://localhost:8081/api/exercicio/available",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setExercicios(resExercicios.data);
        setPacientes(resPacientes.data);
        setMidias(resMidias.data);
      } catch (error) {
        message.error("Erro ao carregar dados");
      }
    };
    fetchData();
  }, [token]);

  const columns = [
    { title: "Exercício", dataIndex: "nome", key: "nome" },
    { title: "Descrição", dataIndex: "descricao", key: "descricao" },
    {
      title: "Mídia",
      key: "midia",
      render: (_, record) => (
        <a
          href={record.midias[0]?.linkArquivo}
          target="_blank"
          rel="noopener noreferrer"
        >
          {record.midias[0]?.titulo}
        </a>
      ),
    },
    {
      title: "",
      key: "acao",
      render: (_, record) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => removerExercicio(record.id)}
        >
          Remover
        </Button>
      ),
    },
  ];

  const onFinish = async (values) => {
    try {
      const { pacienteId, titulo, observacoes, feedback, endDate } = values;
      const fisioterapeutaId = currentUser.user.id;

      for (const exercicio of exerciciosSelecionados) {
        const payload = {
          pacienteId,
          fisioterapeutaId,
          titulo,
          observacoes,
          feedback,
          endDate: endDate.toISOString(),
          exercicioId: exercicio.id,
        };

        await axios.post("http://localhost:8081/api/tratamento/novo", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      message.success("Plano de tratamento salvo com sucesso!");
      form.resetFields();
      setExerciciosSelecionados([]);
    } catch (error) {
      message.error("Erro ao salvar tratamento");
    }
  };
  const adicionarExercicio = (exercicioId) => {
    const exercicio = exercicios.find((e) => e.id === exercicioId);
    if (exercicio) {
      setExerciciosSelecionados((prevExercicios) => [
        ...prevExercicios,
        exercicio,
      ]);
    }
  };

  const removerExercicio = (exercicioId) => {
    setExerciciosSelecionados(
      exerciciosSelecionados.filter((e) => e.id !== exercicioId)
    );
  };

  const onCancel = () => {
    form.resetFields();
  };

  return (
    <div>
      <h1>Criar Tratamento</h1>
      <Form
        form={form}
        name="tratamento"
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          label="Paciente"
          name="pacienteId"
          rules={[
            { required: true, message: "Por favor, selecione um paciente!" },
          ]}
        >
          <Select placeholder="Selecione um paciente">
            {pacientes.map((paciente) => (
              <Select.Option key={paciente.id} value={paciente.id}>
                {paciente.nome}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Título do Tratamento"
          name="titulo"
          rules={[
            {
              required: true,
              message: "Por favor, insira o título!",
              max: 100,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Observações"
          name="observacoes"
          rules={[
            { required: true, message: "Por favor, insira a observação!" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Exercícios">
          <Select
            style={{ width: "100%" }}
            placeholder="Selecione um exercício"
            onSelect={adicionarExercicio}
          >
            {exercicios.map((exercicio) => (
              <Select.Option key={exercicio.id} value={exercicio.id}>
                {exercicio.nome}
              </Select.Option>
            ))}
          </Select>
          <Form.Item label="Exercícios">
            <Table
              columns={columns}
              dataSource={exerciciosSelecionados}
              rowKey="id"
            />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="Feedback"
          name="feedback"
          rules={[
            { required: true, message: "Por favor, insira um feedback!" },
          ]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>

        <Form.Item
          label="Data de Término"
          name="endDate"
          rules={[
            {
              required: true,
              message: "Por favor, selecione a data de término!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#0BD980", borderColor: "#0BD980" }}
          >
            Salvar Tratamento
          </Button>
          <Button style={{ margin: "0 8px" }} onClick={onCancel}>
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NovoTratamento;
