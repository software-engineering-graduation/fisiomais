import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Form, Input, Button, Select, message, Upload, Divider, Tooltip, Space } from 'antd';

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

const NewMidia = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Submitted values:', values);
    };

    const fileDraggerProps = {
        accept: '.mp4, .gif, .jpg, .png',
        name: 'file',
        multiple: false,
        maxCount: 1,
        rules: [
            {
                required: false,
            },
        ],
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'Carregando...') {
                console.log(info.file, info.fileList);
            }
            if (status === 'Finalizado') {
                message.success(`${info.file.name} Arquivo carregado com sucesso.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} Erro ao carregar arquivo.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };


    return (
        <>
            <h1>Cadastrar Mídia</h1>
            <Form
                form={form}
                name="media-form"
                onFinish={onFinish}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 15 }}
            >
                <Form.Item label="Tipo" name="tipo">
                    <Select defaultValue="Imagem">
                        <Option value="Vídeo">Vídeo</Option>
                        <Option value="GIF">GIF</Option>
                        <Option value="Imagem">Imagem</Option>
                    </Select>
                </Form.Item>


                <Form.Item label="Título" name="titulo" rules={[{ required: true, message: 'Por favor, digite um título' }]}>
                    <Input size='large' />
                </Form.Item>

                <Form.Item label="Descrição" name="descricao" rules={[{ required: true, message: 'Por favor, digite uma descrição' }]}>
                    <Input.TextArea rows={10} placeholder="Tamanho máximo de 1000 caracteres" maxLength={1000} />
                </Form.Item>

                <Divider />

                <Space>
                    <Tooltip
                        title="Apenas utilize um link ou selecione um arquivo"
                        color={'#0bd980'}
                        key={'#0bd980'}
                        placement='right'
                    >
                        <h1 style={{
                            cursor: 'help'
                        }}>Arquivo</h1>
                    </Tooltip>
                </Space>

                <Form.Item label="Link Arquivo" name="link_arquivo" rules={[{ required: true, message: 'Por favor digite um link válido' }]}>
                    <Input size='large' />
                </Form.Item>

                <DraggerContainer >
                    <Dragger {...fileDraggerProps}
                        style={{
                            width: '500px',
                        }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Clique ou arraste o arquivo para esta área para fazer upload</p>
                        <p className="ant-upload-hint">
                            Suporte para upload único. Tipos de arquivos: .mp4, .gif, .jpg, .png
                        </p>
                    </Dragger>
                </DraggerContainer>

                <Form.Item style={{
                    textAlign: 'center',
                    margin: '20px auto 0 auto',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <SubmitMidiaButtonContainer>
                        <Button htmlType="submit" size='large'>
                            Finalizar
                        </Button>
                    </SubmitMidiaButtonContainer>
                </Form.Item>
            </Form>
        </>
    );
};
export default NewMidia;