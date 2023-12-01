import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Result, Divider, Layout, Image, Space, Skeleton, Button } from 'antd';
import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player'
import { getYouTubeVideoEmbedUrl } from 'utils';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const TratamentoDetail = () => {
    const navigate = useNavigate()
    const [tratamentoDetail, setTratamentoDetail] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const currentUser = useSelector(state => state.currentUser.value);
    const { token } = currentUser;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    let { id } = useParams()
    id = parseInt(id)

    useEffect(() => {
        const apiRoute = `${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/tratamento/${id}`

        axios.get(apiRoute)
            .then(response => {
                if (response.data) {
                    setTratamentoDetail(response.data) // FIXME - uncomment
                }
            })
            .catch(error => {
                setError(error.response)
                if (error.response.status === 400) {
                    setTratamentoDetail(undefined)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const currentUserIsOwner = () => {
        if (tratamentoDetail) {
            return (currentUser.user.id === tratamentoDetail.fisioterapeuta.id && currentUser.user.role === 'fisioterapeuta') ||
                currentUser.user.role === 'admin'
        }
        return false
    }

    if (loading) {
        return (
            <Space style={{
                width: '100%',
                maxWidth: 800,
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px 0px'
            }}>
                <Skeleton.Image active size='large' />
                <Skeleton.Input active size='default' />
                <Divider />
                <Skeleton.Input active size='large' />
                <Skeleton.Input active size='small' />
            </Space>
        )
    }

    if (error) {
        if (error.status === 403)
            return (
                <Result
                    status="500"
                    title="Erro ao buscar detalhes de tratamento"
                    subTitle={
                        <p>
                            Desculpe, você não tem permissão para acessar os detalhes deste tratamento.
                            <br />
                            Pode ser que você esteja tentando acessar um tratamento que não está vinculado a você.
                        </p>
                    }
                />
            )

        if (error.status === 404)
            return (
                <Result
                    status="404"
                    title="Erro ao buscar detalhes de tratamento"
                    subTitle="Desculpe, não conseguimos encontrar os detalhes do tratamento que você está procurando."
                />
            )
    }

    return (
        <>
            {
                tratamentoDetail == undefined &&
                <Result
                    status="404"
                    title="404"
                    subTitle="Desculpe, não conseguimos encontrar os detalhes do tratamento que você está procurando."
                />
            }

            {tratamentoDetail != undefined &&
                <TratamentoDetailsContainer>
                    <TratamentoHeader>
                        <GoBackButtonContainer>
                            <Button
                                size="large"
                                icon={<LeftOutlined />}
                                onClick={() => navigate('/tratamento')}
                            >
                                Voltar
                            </Button>
                        </GoBackButtonContainer>
                        <TratamentoTitle>{tratamentoDetail.titulo}</TratamentoTitle>
                    </TratamentoHeader>
                    <Divider />

                    {/* Datas */}
                    <RowContainer>
                        <RowShowItem>
                            <RowLabel>Data de início:</RowLabel>
                            <RowValue>{tratamentoDetail.startDate}</RowValue>
                        </RowShowItem>
                        <RowDivider />
                        <RowShowItem>
                            <RowLabel>Previsão de término:</RowLabel>
                            <RowValue>{tratamentoDetail.endDate}</RowValue>
                        </RowShowItem>
                    </RowContainer>

                    {/* Pessoas envolvidas */}
                    <RowContainer>
                        <RowShowItem>
                            <RowLabel>Nome do paciente:</RowLabel>
                            <RowValue>{tratamentoDetail.paciente.nome}</RowValue>
                        </RowShowItem>
                        <RowDivider />
                        <RowShowItem>
                            <RowLabel>Nome da(o) fisioterapeuta</RowLabel>
                            <RowValue>{tratamentoDetail.fisioterapeuta.nome}</RowValue>
                        </RowShowItem>
                    </RowContainer>
                    <RowContainer>
                        <RowShowItem>
                            <RowLabel>Observações:</RowLabel>
                            <RowValue>{tratamentoDetail.observacoes}</RowValue>
                        </RowShowItem>
                        <RowDivider />
                    </RowContainer>

                    {/* Feedback do tratamento */}
                    {tratamentoDetail.feedback && tratamentoDetail.feedback.length > 0 &&
                        <RowContainer>
                            <RowShowItem>
                                <RowLabel>Feedback:</RowLabel>
                                <RowValue>{tratamentoDetail.feedback}</RowValue>
                            </RowShowItem>
                        </RowContainer>
                    }

                    <Divider />

                    <MidiasContainer>
                        <MidiasTitle style={{
                            color: "#0BD980"
                        }}>Exercicios do tratamento</MidiasTitle>
                        <ExerciciosCardsContainers>
                            {tratamentoDetail.exercicios.map(exercicio => {
                                return (
                                    <ExercicioCardContainer key={exercicio.id}>
                                        <ExercicioCardTitle>{`Exercício ${tratamentoDetail.exercicios.findIndex(e => e.id === exercicio.id) + 1}: ${exercicio.nome}`}</ExercicioCardTitle>
                                        <RowContainer>
                                            <RowShowItem>
                                                <RowValue>{exercicio.descricao}</RowValue>
                                            </RowShowItem>
                                        </RowContainer>

                                        <Divider />

                                        <ExercicioMidiasContainer>
                                            <ExercicioMidiasTitle>Mídias do exercício</ExercicioMidiasTitle>
                                            <ExercicioMidiasCardsContainers>
                                                {exercicio.midias.map(midia => {
                                                    return (
                                                        <ExercicioMidiaCardContainer key={midia.id}>
                                                            <ExercicioMidiaCardTitle>{midia.titulo}</ExercicioMidiaCardTitle>
                                                            {/* descrição */}
                                                            <MediaDescription>
                                                                {midia.descricao}
                                                            </MediaDescription>
                                                            {midia.type === 'Video' || midia.type === 'GIF' ? (
                                                                <ReactPlayer
                                                                    url={getYouTubeVideoEmbedUrl(midia.linkArquivo)}
                                                                />
                                                            ) : (
                                                                <ExercicioMidiaCardImage
                                                                    width={500}
                                                                    src={midia.linkArquivo} alt={midia.titulo}
                                                                    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="

                                                                />
                                                            )}
                                                            {midia.type === 'Video' &&
                                                                <MediaLink href={midia.linkArquivo} target="_blank" rel="noopener noreferrer">
                                                                    Abrir no navegador
                                                                </MediaLink>
                                                            }
                                                        </ExercicioMidiaCardContainer>
                                                    )
                                                })}
                                            </ExercicioMidiasCardsContainers>
                                        </ExercicioMidiasContainer>
                                    </ExercicioCardContainer>
                                )
                            })}
                        export </ExerciciosCardsContainers>
                        {currentUserIsOwner() &&
                            <RowContainer>
                                <EditTratamentoButtonContainer>
                                    <Button
                                        size="large"
                                        icon={<EditOutlined />}
                                        onClick={() => navigate('/tratamento/editar/' + tratamentoDetail.id)}
                                    >
                                        Editar Tratamento
                                    </Button>
                                </EditTratamentoButtonContainer>
                            </RowContainer>
                        }
                    </MidiasContainer>
                </TratamentoDetailsContainer>
            }

        </>
    );
};
export default TratamentoDetail;

const EditTratamentoButtonContainer = styled.div`
margin-top: 16px;
    .ant-btn-default:hover {
        color: #0BD980 !important;
        border-color: #0BD980 !important;
    }
`

export const TratamentoTitle = styled.h2`
width: fit-content;
  font-size: 1.5rem;
  margin: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MediaLink = styled.a`
  font-size: 1rem;
  margin: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
`;

export const RowShowItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const RowLabel = styled.p`
    font-size: 1rem;
    margin-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
`;

export const RowValue = styled.p`
    font-size: 1rem;
    margin: 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const RowDivider = styled.div`
    width: 1px;
    height: 100%;
    background-color: #000;
`;

const TratamentoDetailsContainer = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`

const MidiasContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`

const MidiasTitle = styled.h2`
  font-size: 1.5rem;
  margin: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ExerciciosCardsContainers = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`

export const ExercicioCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 1px 0 #d9d9d9;
`

export const ExercicioCardTitle = styled.h2`
  font-size: 1.5rem;
  margin: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ExercicioMidiasContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    width: 100%;
    margin: 0 auto;
    `
export const ExercicioMidiasTitle = styled.h2`
    font-size: 1.5rem;
    margin: 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
    `
export const ExercicioMidiasCardsContainers = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    `

export const ExercicioMidiaCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0 1px 0 #d9d9d9;
    `

export const ExercicioMidiaCardTitle = styled.h2`
    font-size: 1.5rem;
    margin: 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    `

export const ExercicioMidiaCardImage = styled(Image)`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    `

export const MediaDescription = styled.p`
    font-size: 1rem;
    margin: 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    `
export const GoBackButtonContainer = styled.div`
    margin-top: 16px;
    margin-bottom: 16px;
    .ant-btn-default:hover {
        color: #0BD980 !important;
        border-color: #0BD980 !important;
    }
    `
export const TratamentoHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    `