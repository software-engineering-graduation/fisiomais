import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Form, Input, Button, Select, message, Upload, Divider, Tooltip, Space, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Dragger } = Upload;
const { Option } = Select;

const DraggerContainer = styled.div`
    margin: 0 auto;
    width: 500px;
`;

const SubmitMidiaButtonContainer = styled.div`
    .ant-btn-default {
        color: white !important;
        border-color: white !important;
        background-color: #0BD980 !important;
    }

    .ant-btn-default:hover {
        background-color: #70f5bb !important;
    }
`

const NewExercicio = () => {
    const [loadCreateMidia, setLoadCreateMidia] = useState(false);
    const [midias, setMidias] = useState(undefined);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const navigate = useNavigate();

    const currentUser = useSelector(state => state.currentUser.value);
    const { token } = currentUser;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    if (currentUser.user.role !== 'fisioterapeuta') {
        return (
            <Result title="Usuário não tem permissão para acessar essa página"
                subTitle="Desculpe, ocorreu um erro ao buscar os detalhes de usuário">
            </Result>
        )
    }

    useEffect(() => {
        const apiRoute = `${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/midia/owner/${currentUser.user.id}`;

        axios.get(apiRoute)
            .then(response => {
                if (response.status !== 200) {
                    openNotification('error', 'Erro ao buscar mídias!', response.message);
                    setMidias(undefined);
                    return
                }
                setMidias(response.data);
            }
            ).catch(error => {
                openNotification('error', 'Erro ao buscar mídias!', error.message);
            });
    }, []);


    const openNotification = (type, title, description) => {
        api[type]({
            message: title,
            description: description,
            duration: 2,
            placement: 'bottomRight',
        });
    }

    const onFinish = (values) => {
        setLoadCreateMidia(true)
        handleMidiaCreation(values);
    };

    const handleMidiaCreation = (newMidia) => {
        setLoadCreateMidia(true);

        const newMidiaOfficial = {
            nome: newMidia.nome,
            descricao: newMidia.descricao,
            midias: newMidia.midias,
            owner: currentUser.user.id
        }

        const body = newMidiaOfficial;

        const apiRoute = process.env.API_TYPE === 'json' ?
            `${import.meta.env.VITE_API_BASE_ROUTE_JSON}/exercicio` :
            `${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/exercicio`;


        axios.post(apiRoute, body).
            then(response => {
                if (response.status !== 201) {
                    openNotification('error', 'Erro ao criar exercício!', response.message);
                }
            }
            ).catch(error => {
                openNotification('error', 'Erro ao criar exercício!', error.message);
            }).
            finally(() => {
                openNotification('success', 'Sucesso ao criar exercício!', 'Exercício criado com sucesso!');
                setLoadCreateMidia(false);
                navigate('/exercicio');
            });
    }

    const notifyErrorField = (errorInfo) => {
        const { errorFields } = errorInfo;
        const message = errorFields[0].errors[0];
        const name = errorFields[0].name[0];

        openNotification('error', `Erro ao criar exercício!`, message);

        const input = document.getElementById("media-form_" + name)
        input.focus();
    }

    const handleMidiaSelection = () => {
        // show values
        console.log(form.getFieldValue('midias'));
    }


    return (
        <>
            {contextHolder}
            <h1>Criar Exercício</h1>
            <Form
                form={form}
                name="media-form"
                onFinish={onFinish}
                onFinishFailed={notifyErrorField}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 15 }}
                disabled={loadCreateMidia}
            >
                <Form.Item label="Nome" name="nome" rules={[{ required: true, message: 'Por favor, digite um nome' }]} >
                    <Input size='large' maxLength={150} placeholder='Nome do Exercício' />
                </Form.Item>

                <Form.Item label="Descrição" name="descricao" rules={[{ required: true, message: 'Por favor, digite uma descrição' }]}>
                    <Input.TextArea rows={10} placeholder="Tamanho máximo de 1000 caracteres" maxLength={1000} />
                </Form.Item>

                <Divider />

                <Form.Item label="Midias" name="midias" >
                    <Select mode="multiple" placeholder="Selecione midias" disabled={midias === undefined}>
                        {
                            midias !== undefined && midias.map(midia => {
                                return (
                                    <Option key={midia.id} value={midia.id}>
                                        <OptionSpace>
                                            <FieldSelectBox>
                                                <span><strong>{midia.type}</strong> - </span>
                                                <span>{midia.titulo}</span>
                                            </FieldSelectBox>
                                            <FieldSelectBox>
                                                <Tooltip title={midia.descricao}>
                                                    <span>{
                                                        midia.descricao.length > 50 ?
                                                            midia.descricao.substring(0, 50) + '...' :
                                                            midia.descricao
                                                    }</span>
                                                </Tooltip>
                                            </FieldSelectBox>
                                        </OptionSpace>
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>

                <Form.Item style={{
                    textAlign: 'center',
                    margin: '20px auto 0 auto',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <SubmitMidiaButtonContainer>
                        <Button htmlType="submit" size='large' loading={loadCreateMidia}>
                            Finalizar
                        </Button>
                    </SubmitMidiaButtonContainer>
                </Form.Item>
            </Form>
        </>
    );
};
export default NewExercicio;

const FieldSelectBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const OptionSpace = styled(Space)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #d9d9d9;
`;