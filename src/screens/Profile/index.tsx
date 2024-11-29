import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import { 
    Wrapper,
    Container, 
    Header, 
    HeaderButtonContainer, 
    ButtonIcon, 
    ButtonText,
    ContentContainer,
} from '../Profile/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import Input from '../../components/Input'
import { Button } from '../../components/Button';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import { Alert } from 'react-native';

export default function Profile({navigation}) {
    const { logout } = useContext(AuthContext);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [id, setID] = useState("");


    const handleEdit = async() => {
        try {
            const jsonValue = JSON.stringify({
                "id":id,
                "nome":nome,
                "email":email,
                "senha":senha
            })
            await AsyncStorage.setItem('user',jsonValue);

            await api.put(`/usuarios/${id}`, {
                "id":id,
                "nome":nome,
                "email":email,
                "senha":senha
            })
            Alert.alert("Ddados alterados com sucesso!")
            navigation.goBack();

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{
        const getData = async() => {
            try {
                const jsonValue = await AsyncStorage.getItem('user');
                let user = JSON.parse(jsonValue);

                setNome(user.nome);
                setEmail(user.email);
                setSenha(user.senha);
                setID(user.id);
            } catch (err) {
                console.log(err);
            }
        }
        getData()
    }, [])
    const logoutHandler = async() => {
        try {
            await logout();
            navigation.navigate('Login');
        } catch (error) {
            console.error("Erro no logout:", error);
        }
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
                    <Input label='Nome' placeholder='digite seu nome' value={nome} onChangeText={setNome}/>
                    <Input label='E-mail' placeholder='digite seu e-mail' value={email} onChangeText={setEmail}/>
                    <Input label='Senha' placeholder='digite sua nova senha' onChangeText={setSenha}/>
                </ContentContainer>

                <Button 
                    title="Salvar informações" 
                    noSpacing={true} 
                    variant='primary'
                    onPress={handleEdit}
                    />

                <Button 
                    title="Logout" 
                    noSpacing={true} 
                    variant='primary'
                    onPress={logoutHandler}
                    />
            </Container>
        </Wrapper>
    );
}
