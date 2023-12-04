import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Form, Input, Button, Select, message, Upload, Divider, Tooltip, Space, notification, TimePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Option } = Select;

const NewDisp = () => {
    const [loadCreateMidia, setLoadCreateMidia] = useState(false);
    const [disponibilidades, setDisponibilidades] = useState([]);
    const [loadingDisponibilidades, setLoadingDisponibilidades] = useState('idle');
    const [timeSelectedStart, setTimeSelected] = useState(null);
    const [daySelected, setDaySelected] = useState(1); // [1, 2, 3, 4, 5, 6, 7]
    const [timeSelectedEnd, setTimeSelectedEnd] = useState(null);
    const [dateSelected, setDateSelected] = useState(null);

    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const navigate = useNavigate();

    const currentUser = useSelector(state => state.currentUser.value);
    const { token } = currentUser;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    if (currentUser.user.role === 'paciente') {
        return (
            <Result title="Usuário não tem permissão para acessar essa página"
                subTitle="Desculpe, ocorreu um erro ao buscar os detalhes de usuário">
            </Result>
        )
    }

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

    const fetchDisponibilidades = async (type = null) => {
        setLoadingDisponibilidades('loading');
        const apiRoute = `${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/agenda/fisioterapeuta/${currentUser.user.id}`
        axios.get(apiRoute)
            .then((response) => {
                setDisponibilidades(response.data);
                setLoadingDisponibilidades('succeeded');
            })
            .catch((error) => {
                // console.error(error);
                setLoadingDisponibilidades(false);
                setLoadingDisponibilidades('failed');
            })
    }

    useEffect(() => {
        fetchDisponibilidades();
    }, []);

    const handleMidiaCreation = (newMidia) => {
        setLoadCreateMidia(true);

        const mockNewMidia = {
            fisioterapeuta_id: 1,
            titulo: newMidia.titulo,
            descricao: newMidia.descricao,
            type: newMidia.type,
            createTime: new Date().toISOString(),
            isPublic: newMidia.publico,
        }

        const newMidiaOfficial = {
            fisioterapeutaId: currentUser.user.id,
            type: newMidia.type,
            linkArquivo: newMidia.linkArquivo,
            titulo: newMidia.titulo,
            descricao: newMidia.descricao,
            isPublic: newMidia.publico,
        }

        const body = process.env.API_TYPE === 'json' ? mockNewMidia : newMidiaOfficial;

        const apiRoute = process.env.API_TYPE === 'json' ?
            `${import.meta.env.VITE_API_BASE_ROUTE_JSON}/midia` :
            `${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/midia`;

        axios.post(apiRoute, body).
            then(response => {
                if (response.status !== 201) {
                    openNotification('error', 'Erro ao cadastrar nova disponibilidade!', response.message);
                }
            }
            ).catch(error => {
                openNotification('error', 'Erro ao cadastrar nova disponibilidade!', error.message);
            }).
            finally(() => {
                openNotification('success', 'Sucesso ao cadastrar nova disponibilidade!', 'Disponibilidade criada com sucesso!');
                setLoadCreateMidia(false);
                navigate('/midias');
            });
    }

    const notifyErrorField = (errorInfo) => {
        const { errorFields } = errorInfo;
        const message = errorFields[0].errors[0];
        const name = errorFields[0].name[0];

        openNotification('error', `Erro ao cadastrar nova disponibilidade!`, message);

        const input = document.getElementById("media-form_" + name)
        input.focus();
    }

    function range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    function disabledTimeStart() {
        const agenda_day = disponibilidades.filter((obj) => obj.dia === daySelected)
        let hoursDisabledFinal = [];
        let minutesDisabledFinal = [];

        if (agenda_day) {
            agenda_day.forEach(agenda => {
                const startHour = parseInt(agenda.horarioInicio.split(':')[0]);
                const endHour = parseInt(agenda.horarioFim.split(':')[0]);

                const hours = range(startHour, endHour);

                hoursDisabledFinal = hoursDisabledFinal.concat(hours);
            });

            // console.log('hoursDisabledFinal', hoursDisabledFinal);
        }

        return {
            disabledHours: () => hoursDisabledFinal,
            disabledMinutes: () => minutesDisabledFinal,
        };
    }

    function disabledTimeEnd() {
        const startDisabled = disabledTimeStart();

        // disable all before the timeSelectedStart
        const startHour = timeSelectedStart ? timeSelectedStart.hour() : 0;

        const hours = range(0, startHour + 1);
        const hoursDisabledFinal = startDisabled.disabledHours().filter(hour => hour <= startHour).concat(hours);
        // console.log('disabledHours already', startDisabled.disabledHours())
        // console.log('hoursDisabledFinal', hoursDisabledFinal);
        return {
            disabledHours: () => hoursDisabledFinal,
            disabledMinutes: () => [],
        };
    }

    const createNewDisp = async () => {
        const body = {
            dia: daySelected,
            horarioInicio: timeSelectedStart.format('HH:00:00'),
            horarioFim: timeSelectedEnd.format('HH:00:00'),
            disponivel: false,
            fisioterapeutaId: currentUser.user.id,
        }

        const apiRoute = `${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/agenda`;
        axios.post(apiRoute, body).
            then(response => {
                if (response.status !== 201) {
                    openNotification('error', 'Erro ao cadastrar nova disponibilidade!', response.message);
                    return
                }
                setLoadCreateMidia(false);
                openNotification('success', 'Sucesso ao cadastrar nova disponibilidade!', 'Disponibilidade criada com sucesso!');
                setTimeout(() => {
                navigate('/disponibilidade');
                }, 1500)
            }
            ).catch(error => {
                openNotification('error', 'Erro ao cadastrar nova disponibilidade!', error.message);
            })
    }

    return (
        <>
            {contextHolder}
            <h1>Cadastrar Indisponibilidade</h1>
            <Select
                value={daySelected}
                style={{
                    width: '100%',
                    marginBottom: '15px'
                }}
                onChange={(value) => { setDaySelected(value) }}
            >
                <Option value={1}>Segunda-feira</Option>
                <Option value={2}>Terça-feira</Option>
                <Option value={3}>Quarta-feira</Option>
                <Option value={4}>Quinta-feira</Option>
                <Option value={5}>Sexta-feira</Option>
                <Option value={6}>Sábado</Option>
                <Option value={7}>Domingo</Option>
            </Select>

            <TimesContainer>
                <DatePickerContainer>
                    <LabelTime>Inicio</LabelTime>
                    <TimePicker
                        value={timeSelectedStart}
                        hideDisabledOptions={true}
                        minuteStep={30}
                        disabled={loadingDisponibilidades !== 'succeeded'}
                        onChange={(time) => { setTimeSelected(time ?? null) }}
                        locale={locale}
                        size={'large'}
                        format={'HH'}
                        placeholder={'Horário'}
                        disabledTime={disabledTimeStart} />
                </DatePickerContainer>
                <VerticalBorder />
                <DatePickerContainer>
                    <LabelTime>Fim</LabelTime>
                    <TimePicker
                        value={timeSelectedEnd}
                        hideDisabledOptions={true}
                        minuteStep={30}
                        disabled={loadingDisponibilidades !== 'succeeded' || !timeSelectedStart}
                        onChange={(time) => { setTimeSelectedEnd(time ?? null) }}
                        locale={locale}
                        size={'large'}
                        format={'HH'}
                        placeholder={'Horário'}
                        disabledTime={disabledTimeEnd} />
                </DatePickerContainer>
            </TimesContainer>

            <SubmitMidiaButtonContainer>
                <Button htmlType="submit" size='large' loading={loadCreateMidia} onClick={createNewDisp}>
                    Finalizar
                </Button>
            </SubmitMidiaButtonContainer>
        </>
    );
};
export default NewDisp;

const CheckPublicMidia = styled(Form.Item)`
     .ant-form-item-label {
        display: flex;
        align-items: start;
        justify-content: start;
        width: 250px;
    }
    width: 100%;
    display: flex;
    align-items: start;
    justify-content: center;
`

const InputLabel = styled.span`
    font-weight: 500;
    font-size: 1.2rem;
    margin-right: 8px;
    text-align: center;
`;

const DatePickerContainer = styled(Space)`
    transition: all 0.5s ease-in;
    margin-bottom: 15px;
`

const VerticalBorder = styled.div`
    border-left: 1px solid #d9d9d9;
    height: 100%;
    margin: 0 15px;
`

const TimesContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const LabelTime = styled(InputLabel)`
    margin-bottom: 0;
`

const SubmitMidiaButtonContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .ant-btn-default {
        color: white !important;
        border-color: white !important;
        background-color: #0BD980 !important;
    }

    .ant-btn-default:hover {
        background-color: #70f5bb !important;
    }
`