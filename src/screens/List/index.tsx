import React, { useContext, useEffect, useState } from 'react';
import { Image, FlatList, View, Text } from 'react-native';
import { Wrapper,Container, ListContainer, TextVagas } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import VagaCard from '../../components/VagaCard';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

export default function List({navigate}) {
    const [vagas, setVagas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {token} = useContext(AuthContext);

    useEffect(()=> {
      const fetchVagas = async() => {
        try {
          const response = await api.get('vagas', {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          })
          setVagas(response.data.jobs)
        } catch (error) {
          console.log("Erro!: ",error.response.data)
        } finally {
          setIsLoading(false);
        }
      }
      fetchVagas();
    }, [])

    return (
        <Wrapper>
            <Image source={BGTop} style={{maxHeight: 86}}/>

            <Container>

                <Logo />
                <TextVagas>{vagas.length} vagas encontradas!</TextVagas>
                <ListContainer>
                    <FlatList
                        data={vagas}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => 
                            <VagaCard
                                id={item.id}
                                title={item.titulo} 
                                dataCreated={item.data_cadastro}
                                company={item.empresa}
                            />
                        }
                        showsVerticalScrollIndicator={true}
                        ListEmptyComponent={() => (
                            <View>
                                <Text>
                                    Você ainda não tem tarefas cadastradas
                                </Text>
                                <Text>
                                    Crie tarefas e organize seus itens a fazer.
                                </Text>
                            </View>
                        )}
                    />
                </ListContainer>

            </Container>
        </Wrapper>
    );
}
