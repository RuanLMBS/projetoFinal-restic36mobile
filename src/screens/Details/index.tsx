import React, { useContext, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { 
    Wrapper,
    Container, 
    Header, 
    HeaderButtonContainer, 
    ButtonIcon, 
    ButtonText,
    ContentContainer,
    Title,
    Description
} from '../Details/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import { Button } from '../../components/Button';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { VagaProps } from '../../utils/Types';


export default function Details({route, navigation }) {

    const {id} = route.params;
    const {token} = useContext(AuthContext)
    const [isAvaible, setIsAvaible] = useState(true);
    const [vaga, setVaga] = useState<VagaProps | null>({});
    useEffect(()=> {
        const getVaga = async () => {
            try {
                const response = await api.get(`vagas/${id}`, {
                    headers: {
                      'Authorization': `Bearer ${token}`,
                    }
                  })
                  setVaga(response.data.job);
                } catch (error) {
                console.error(error);
            }
            
        }
        getVaga();
    }, [])

    const teste = () => {
        console.log(vaga)
    }

    return (
        <Wrapper>
            <Header>
                <HeaderButtonContainer onPress={() => navigation.goBack()}>
                    <ButtonIcon>
                        <Feather size={16} name="chevron-left" color={theme.COLORS.BLUE} />
                    </ButtonIcon>
                    <ButtonText>
                        Voltar
                    </ButtonText>
                </HeaderButtonContainer>
                <Logo />
            </Header>

            <Container>
                <ContentContainer>
                    <Title>ID da Vaga: {JSON.stringify(id)}</Title>
                    <Description>{vaga.titulo}</Description>
                    <Description>{vaga.descricao}</Description>
                    <Description>Empresa: {vaga.empresa}</Description>
                    <Description>Status: {vaga.status}</Description>
                </ContentContainer>
                {vaga.status === 'Ativo' && (
                    <Button 
                    title="Entrar em contato" 
                    noSpacing={true} 
                    variant='primary'
                    onPress={teste}
                    />
                )}
                
            </Container>
        </Wrapper>
    );
}
