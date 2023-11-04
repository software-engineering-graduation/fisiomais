import React, { useEffect, useState } from 'react';
import { Layout, Card, Typography, Divider, Button, Result, Select, Space, DatePicker, notification, TimePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import { ButtonContainer, NextStepButton } from '..';

const { Content } = Layout;
const { Title } = Typography;

const DadosConsulta = () => {
    const [fisioterapeutas, setFisioterapeutas] = useState([]);
    const [selectedFisioterapeuta, setSelectedFisioterapeuta] = useState(null);
    const [agenda, setAgenda] = useState([]);
    const [consultas, setConsultas] = useState([]);
    const [dateSelected, setDateSelected] = useState(null);
    const [timeSelected, setTimeSelected] = useState(null);

    const [fisioFetchStatus, setFisioFetchStatus] = useState('idle');
    const [agendaFetchStatus, setAgendaFetchStatus] = useState('idle');

    const [api, contextHolder] = notification.useNotification();

    const isLoadingFisio = fisioFetchStatus === 'loading';
    const isErroredFisio = fisioFetchStatus === 'error';
    const isSuccessFisio = fisioFetchStatus === 'success';

    const isLoadingAgenda = agendaFetchStatus === 'loading';
    const isErroredAgenda = agendaFetchStatus === 'error';
    const isSuccessAgenda = agendaFetchStatus === 'success';

    const openNotification = (type, title, description) => {
        api[type]({
            message: title,
            description: description,
            duration: 2,
            placement: 'bottomRight',
        });
    };

    const fetchAllFisioterapeutas = async () => {
        setFisioFetchStatus('loading');
        await axios.get(`${import.meta.env.VITE_API_BASE_ROUTE}/fisioterapeuta`)
            .then((res) => {
                setFisioterapeutas(res.data);
            })
            .catch((err) => {
                setFisioFetchStatus('error');
                openNotification('error', 'Erro ao buscar profissionais', err.message);
            })
            .finally(() => {
                setFisioFetchStatus('success');
            })
    }

    const fetchAgendaFromFisioterapeuta = async () => {
        setAgendaFetchStatus('loading');
        await axios.get(`${import.meta.env.VITE_API_BASE_ROUTE}/agenda?fisioterapeuta__id=${selectedFisioterapeuta.id}`)
            .then((res) => {
                setAgenda(res.data);
                // console.log(`Agenda do fisioterapeuta ${selectedFisioterapeuta.nome}:`, res.data);
            })
            .catch((err) => {
                setAgendaFetchStatus('error');
                openNotification('error', 'Erro ao buscar agenda', err.message);
            })
            .finally(() => {
                // setAgendaFetchStatus('success');
            })
    }

    const fetchConsultasFromFisioterapeuta = async () => {
        setAgendaFetchStatus('loading');
        await axios.get(`${import.meta.env.VITE_API_BASE_ROUTE}/consulta?fisioterapeuta__id=${selectedFisioterapeuta.id}`)
            .then((res) => {
                setConsultas(res.data)
                // console.log(`Consultas do fisioterapeuta ${selectedFisioterapeuta.nome}:`, res.data);
            })
            .catch((err) => {
                setAgendaFetchStatus('error');
                openNotification('error', 'Erro ao buscar consultas', err.message);
            })
            .finally(() => {
                setAgendaFetchStatus('success');
            })
    }

    useEffect(() => {
        fetchAllFisioterapeutas();
    }, []);

    useEffect(() => {
        if (selectedFisioterapeuta !== null) {
            fetchAgendaFromFisioterapeuta();
            fetchConsultasFromFisioterapeuta();
            // console.log('Fisioterapeuta selecionado:', selectedFisioterapeuta);
            // console.log('Consultas:', consultas);
            // console.log('Agenda:', agenda);
        }
    }, [selectedFisioterapeuta])

    useEffect(() => {
        // console.log('Data selecionada:', dateSelected);
    }, [dateSelected])

    const handleDatePicker = (date) => {
        setDateSelected(date.$d);
    }

    const updateFisioSelected = (value) => {
        const fisio = fisioterapeutas.find((fisio) => fisio.id === value);
        setSelectedFisioterapeuta(fisio);
    }

    const convertConsultasDateTime = () => {
        const consultasObj = consultas.map((consulta) => {
            const date = consulta.data_e_hora.split(' ')[0];
            const time = consulta.data_e_hora.split(' ')[1];
            const dateObj = dayjs(date).hour(time.split(':')[0]).minute(time.split(':')[1]).second(time.split(':')[2]);
            return {
                dateObj,
                fisioterapeuta: consulta.fisioterapeuta,
                paciente: consulta.paciente,
            }
        });

        return consultasObj;
    }

    const handleHourPicker = (time) => {
        // check if the selected time is not in disabledDateTime
        const { disabledHours, disabledMinutes } = disabledTime();
        const disabledHoursArray = disabledHours();
        const disabledMinutesArray = disabledMinutes();
        const consultasObj = convertConsultasDateTime();

        if (disabledHoursArray.includes(time.hour())) {
            openNotification('error', 'Horário indisponível', `Por favor, selecione outro horário`);
            setTimeSelected(null);
            return;
        }

        if (disabledMinutesArray.includes(time.minute())) {
            openNotification('error', 'Horário indisponível', 'Por favor, selecione outro horário');
            setTimeSelected(null);
            return;
        }

        if (consultasObj.length > 0) {
            const dateSelectedObj = dayjs(dateSelected);

            // verifica se a data é a mesma
            const consultasObjFiltered = consultasObj.filter((obj) => {
                return obj.dateObj.isSame(dateSelectedObj, 'day')
            });

            // verifica se o horário é o mesmo use, $H and $m
            const consultasObjFiltered2 = consultasObjFiltered.filter((obj) => {
                return obj.dateObj.$H === time.hour() && obj.dateObj.$m === time.minute();
            });

            if (consultasObjFiltered2.length > 0) {
                openNotification('error', 'Horário já utilizado', 'Por favor, selecione outro horário');
                setTimeSelected(null);
                return;
            }
        }

        setTimeSelected(time);
    }

    const disabledDate = (current) => {
        // Can not select days before today and today
        const disabeld = current && current < dayjs().endOf('day');

        // also disable days that are disabled in the agenda
        const filteredObjects = agenda.filter(obj => obj.dia === current.$W && obj.disponivel === 0);
        const disabledInAgenda = filteredObjects.length > 0;

        return disabeld || disabledInAgenda;
    };

    function range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    function disabledTime() {
        let hoursDisabledFinal = [];
        let minutesDisabledFinal = [];

        // disable all hours before now if date is today
        const hoursDisabled = dateSelected && dayjs(dateSelected).isSame(dayjs(), 'day') ? range(0, moment().hour() + 1) : [];
        const minutesDisabled = dateSelected && dayjs(dateSelected).isSame(dayjs(), 'day') ? range(0, moment().minute() + 1) : [];

        const dayNumber = dateSelected.getDay();
        const agenda_day = agenda.find((obj) => obj.dia === dayNumber);

        if (agenda_day) {
            const startHour = parseInt(agenda_day.horario_inicio.split(':')[0]);
            const endHour = parseInt(agenda_day.horario_fim.split(':')[0]);

            let hours1 = range(0, startHour);
            let hours2 = range(endHour, 24);
            const hours = hours1.concat(hours2).concat(hoursDisabled);

            hoursDisabledFinal = hoursDisabledFinal.concat(hours);
            minutesDisabledFinal = minutesDisabledFinal.concat(minutesDisabled);
        }

        // disable times that are already booked
        const dateSelectedObj = dayjs(dateSelected);

        // verifica se a data é a mesma
        const consultasObjFiltered = convertConsultasDateTime().filter((obj) => {
            return obj.dateObj.isSame(dateSelectedObj, 'day')
        });

        let consultasHoursArr = consultasObjFiltered.map((obj) => {
            return obj.dateObj.$H;
        })

        const remapedHousArr = consultasHoursArr.map((hour) => {
            const isBookedAt00 = consultasObjFiltered.find((obj) => obj.dateObj.$H === hour && obj.dateObj.$m === 0);
            const isBookedAt30 = consultasObjFiltered.find((obj) => obj.dateObj.$H === hour && obj.dateObj.$m === 30);
            if (isBookedAt00 && isBookedAt30) {
                return hour;
            }
        });

        hoursDisabledFinal = hoursDisabledFinal.concat(remapedHousArr);

        return {
            disabledHours: () => hoursDisabledFinal,
            disabledMinutes: () => minutesDisabledFinal,
        };
    }

    if (isErroredFisio) {
        return (
            <Content>
                {contextHolder}
                <Result
                    status="error"
                    title="Erro ao buscar profissionais"
                    subTitle="Tente novamente mais tarde"
                />
            </Content>
        )
    }

    return (
        <Content>
            {contextHolder}
            <Title level={2}>Dados Consulta</Title>
            <Divider />
            <Space>
                <FisioInputLabel>Selecione um profissional:</FisioInputLabel>
                <Select
                    loading={fisioFetchStatus === 'loading'}
                    disabled={fisioFetchStatus !== 'success'}
                    showSearch
                    style={{
                        width: 200,
                    }}
                    onChange={(value) => { updateFisioSelected(value) }}
                    placeholder="Pesquise por nome"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={fisioterapeutas.map((fisio) => {
                        return {
                            value: fisio.id,
                            label: fisio.nome,
                        }
                    })}
                />
            </Space>

            {selectedFisioterapeuta &&
                <BottomInputsContainer direction='vertical'>
                    <DatePickerContainer>
                        <FisioInputLabel>Data da consulta:</FisioInputLabel>
                        <DatePicker
                            disabled={!isSuccessAgenda}
                            onChange={handleDatePicker}
                            locale={locale}
                            size={'large'}
                            format={'DD/MM/YYYY'}
                            disabledDate={disabledDate}
                        />
                    </DatePickerContainer>

                    {dateSelected &&
                        <DatePickerContainer>
                            <FisioInputLabel>Horário da consulta:</FisioInputLabel>
                            <TimePicker
                                value={timeSelected}
                                hideDisabledOptions={true}
                                minuteStep={30}
                                disabled={!isSuccessAgenda}
                                onChange={(time) => { handleHourPicker(time) }}
                                locale={locale}
                                size={'large'}
                                format={'HH:mm'}
                                placeholder={'Horário'}
                                disabledTime={disabledTime}
                            />
                        </DatePickerContainer>
                    }

                    {timeSelected &&
                        <ButtonContainer>
                            <NextStepButton size="large"
                                onClick={() => console.log('clicou em confirmar')}>
                                Enviar solicitação de agendamento
                            </NextStepButton>
                        </ButtonContainer>
                    }
                </BottomInputsContainer>
            }
        </Content >
    )
};

export default DadosConsulta;

const FisioInputLabel = styled.span`
    font-weight: 500;
    font-size: 1.2rem;
    margin-right: 8px;
    text-align: center;
`;

const DatePickerContainer = styled(Space)`
    transition: all 0.5s ease-in;
    margin-bottom: 15px;
`

const BottomInputsContainer = styled(Space)`
    margin-top: 25px;
    width: 100%;
    justify-content: flex-end;
`;