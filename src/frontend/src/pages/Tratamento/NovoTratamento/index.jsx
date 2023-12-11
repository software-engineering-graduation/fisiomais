import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Select,
  Table,
  message,
  Result,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import locale from 'antd/es/date-picker/locale/pt_BR';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";

const NovoTratamento = ({ tratamento }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser.value);
  const { token } = currentUser;
  const [form] = Form.useForm();
  const [pacientes, setPacientes] = useState([]);
  const [midias, setMidias] = useState([]);
  const [exercicios, setExercicios] = useState([]);
  const [exerciciosSelecionados, setExerciciosSelecionados] = useState(tratamento ? tratamento.exercicios : []);
  const [fetchStatus, setFetchStatus] = useState("idle");
  const isEditing = tratamento !== undefined;
  const role = useSelector((state) => state.currentUser.value.user.role);

  if (role === 'paciente') {
    return (
        <Result title="Usuário não tem permissão para acessar essa página"
            subTitle="Desculpe, ocorreu um erro ao buscar os detalhes de usuário">
        </Result>
    );
}

  useEffect(() => {
    setFetchStatus("loading");
    const fetchData = async () => {
      try {
        const resPacientes = await axios.get(
          `${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/paciente`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const resMidias = await axios.get(`${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/midia`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const resExercicios = await axios.get(
          `${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/exercicio/available`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setExercicios(resExercicios.data);
        setPacientes(resPacientes.data);
        setMidias(resMidias.data);
        setFetchStatus("succeeded");
      } catch (error) {
        message.error("Erro ao carregar dados");
        setFetchStatus("failed");
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

  const onFinish = async (values, edit = false) => {
    try {
      const { pacienteId, titulo, observacoes, feedback, endDate } = values;
      const fisioterapeutaId = currentUser.user.id;

      for (const exercicio of exerciciosSelecionados) {
        const formatedDate = dayjs(endDate).format('DD/MM/YYYY');
        const payload = {
          pacienteId,
          fisioterapeutaId,
          titulo,
          observacoes,
          feedback,
          endDate: formatedDate,
          exercicioId: exercicio.id,
        };

        if (!edit) {
          await axios.post(`${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/tratamento/novo`, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          await axios.put(`${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/tratamento/${tratamento.id}`, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      }

      message.success(edit ? "Tratamento atualizado com sucesso!" : "Tratamento criado com sucesso!");
      form.resetFields();
      setExerciciosSelecionados([]);
      navigate("/tratamento")
    } catch (error) {
      message.error(edit ? "Erro ao atualizar tratamento" : "Erro ao criar tratamento");
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

  if (fetchStatus === 'loading') {
    return <Result
      title="Carregando dados do tratamento..."
    />
  }

  const handleFinish = async (values) => {
    onFinish(values, isEditing);
  }

  return (
    <>
      {fetchStatus === "succeeded" && (
        <div>
          <h1>{
            isEditing ? "Editar Tratamento" : "Novo Tratamento"
          }</h1>
          <Form
            form={form}
            name="tratamento"
            onFinish={handleFinish}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Form.Item
              initialValue={tratamento?.paciente.id}
              label="Paciente"
              name="pacienteId"
              rules={[
                { required: true, message: "Por favor, selecione um paciente!" },
              ]}
            >
              <Select placeholder="Selecione um paciente"
                disabled={isEditing}
              >
                {pacientes.map((paciente) => (
                  <Select.Option key={paciente.id} value={paciente.id}>
                    {paciente.nome}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              initialValue={tratamento?.titulo}
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
              initialValue={tratamento?.observacoes}
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
              <Form.Item>
                <Table
                  columns={columns}
                  dataSource={exerciciosSelecionados}
                  rowKey="id"
                />
              </Form.Item>
            </Form.Item>

            <Form.Item
              initialValue={tratamento?.feedback}
              label="Feedback"
              name="feedback"
              rules={[
                { required: true, message: "Por favor, insira um feedback!" },
              ]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>

            <Form.Item
              initialValue={tratamento ? dayjs(tratamento.endDate, 'DD/MM/YYYY', true) : null}
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
                {isEditing ? "Salvar Alterações" : "Salvar Tratamento"}
              </Button>
              <Button style={{ margin: "0 8px" }} onClick={onCancel}>
                Cancelar
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default NovoTratamento;
