import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, Select, Checkbox, Table, message, Modal } from 'antd';
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, OrderedListOutlined } from '@ant-design/icons';
import axios from 'axios';

const NovoTratamento = () => {
  const [form] = Form.useForm();
  const [pacientes, setPacientes] = useState([]);
  const [midias, setMidias] = useState([]);
  const [midiasSelecionadas, setMidiasSelecionadas] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPacientes = await axios.get('http://localhost:8081/api/paciente');
        const resMidias = await axios.get('http://localhost:8081/api/midia');
        setPacientes(resPacientes.data);
        setMidias(resMidias.data);
      } catch (error) {
        message.error('Erro ao carregar dados');
      }
    };

    fetchData();
  }, []);

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:8081/api/tratamento/novo', values);
      message.success('Plano de tratamento salvo com sucesso!');
      form.resetFields();
    } catch (error) {
      message.error('Erro ao salvar tratamento');
    }
  };
  const adicionarMidia = (midiaId) => {
    const midia = midias.find(m => m.id === midiaId);
    setMidiasSelecionadas(prevMidias => [...prevMidias, midia]);
    setIsModalVisible(false);
  };

  const removerMidia = (midiaId) => {
    setMidiasSelecionadas(midiasSelecionadas.filter(m => m.id !== midiaId));
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
          rules={[{ required: true, message: 'Por favor, selecione um paciente!' }]}
        >
          <Select placeholder="Selecione um paciente">
            {pacientes.map(paciente => (
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
            { required: true, message: 'Por favor, insira o título!', max: 100 }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Observações"
          name="observacoes"
          rules={[{ required: true, message: 'Por favor, insira a observação!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

  
        <Form.Item label="Formatação">
          <Button icon={<BoldOutlined />} />
          <Button icon={<ItalicOutlined />} />
          <Button icon={<UnderlineOutlined />} />
          <Button icon={<OrderedListOutlined />} />
        </Form.Item>

     
        <Form.Item label="Lista de Mídias">
          <Button onClick={() => setIsModalVisible(true)}>Adicionar Mídia</Button>
          <Table
            columns={[
              { title: 'Mídia', dataIndex: 'titulo', key: 'titulo' },
              {
                title: 'Ação',
                key: 'acao',
                render: (text, record) => (
                  <Button icon={<DeleteOutlined />} onClick={() => removerMidia(record.id)}>
                    Remover
                  </Button>
                ),
              },
            ]}
            dataSource={midiasSelecionadas}
            rowKey="id"
          />
        </Form.Item>

    
        <Form.Item
          label="Feedback"
          name="feedback"
          rules={[{ required: true, message: 'Por favor, insira um feedback!' }]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>

 
        <Form.Item
          label="Data de Término"
          name="end_date"
          rules={[{ required: true, message: 'Por favor, selecione a data de término!' }]}
        >
          <DatePicker />
        </Form.Item>
        
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#0BD980', borderColor: '#0BD980' }}>
            Salvar Tratamento
          </Button>
          <Button style={{ margin: '0 8px' }} onClick={onCancel}>
            Cancelar
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Selecione uma Mídia"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Select
          style={{ width: '100%' }}
          placeholder="Selecione uma mídia"
          onSelect={adicionarMidia}
        >
          {midias.map(midia => (
            <Select.Option key={midia.id} value={midia.id}>
              {midia.titulo}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
};

export default NovoTratamento;
