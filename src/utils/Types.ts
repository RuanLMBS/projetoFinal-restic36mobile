export type VagaProps = {
    id: number;
    titulo: String;
    descricao: String;
    dataCadastro: Date;
    telefone: String
    status: String;
    empresa: String;
};

export type UserProps = {
    id:number;
    nome: String;
    email: String;
    senha: String;
    createdAt: Date;
    updatedAt: Date;
}

export type RootStackParamList = {
    Login: undefined;
    FormScreen: undefined;
    Home: undefined;
    Profile: undefined;
    Details: {id: number};
};