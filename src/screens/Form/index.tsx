import { Alert, Image } from 'react-native';
import { Wrapper,Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import { useState } from 'react';
import api from '../../services/api';

export default function FormScreen({navigation}) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('')

    const handleRegister = async() => {
        try {
            const user = {
                nome, email, senha
            }
            const request = await api.post('usuarios/register',user);
            if(request) {
                Alert.alert("Sucesso! Agora faça login!")
                navigation.goBack();
            } else {
                Alert.alert("Houve um erro!")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Wrapper>
            <Image source={BGTop}  />

            <Container>

                <Form>
                    <Logo />
                    <Input label='Nome' placeholder='digite seu nome'
                        value={nome}
                        onChangeText={setNome}
                    />
                    <Input label='E-mail' placeholder='digite seu e-mail'
                    value={email}
                    onChangeText={setEmail}
                    />
                    <Input label='Senha' placeholder='digite sua senha'
                    value={senha}
                    onChangeText={setSenha}
                    />
                    <Button title="Registrar" noSpacing={true} variant='primary'
                        onPress={handleRegister}
                    />
                    <TextContainer>
                        <TextBlack>Já tem uma conta?</TextBlack>
                        <TextLinkContainer onPress={() => navigation.navigate('Login')}>
                            <TextLink>
                                    Faça seu login.
                            </TextLink>
                        </TextLinkContainer>
                    </TextContainer>
                </Form>

            </Container>
        </Wrapper>
    );
}
