import { createContext, ReactNode, useContext, useEffect, useState } from "react"; 
import { UserProps } from "../utils/Types";
import api from "../services/api";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert } from "react-native";

interface AuthContextProps {
    token: string | null;
    isAuthenticated: boolean;
    user: UserProps | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
    token:null,
    isAuthenticated: false,
    user:null,
    login: async () => {},
    logout: ()=> {}
})

function AuthProvider ({children}: AuthProviderProps) {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [token, setToken] = useState<string|null>(null);
    const [user, setUser] = useState <UserProps|null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const login = async (email: string, senha: string) => {
        try {
            const response = await api.post('usuarios/login',{email, senha});
            
            const data = await response.data.token;

            const userResponse = await api.get('/usuarios')
            const users = userResponse.data.usuarios;

            const thisUser = users.find(u=> u.email === email)
            if(response) {
                await AsyncStorage.setItem('token', data.toString());
                setUser(thisUser);
                const jsonValue = JSON.stringify(thisUser);
                await AsyncStorage.setItem('user',jsonValue)
                setToken(data);
                setIsAuthenticated(true)
                navigation.navigate('Auth', {screen: 'Home'})
            }
        } catch (err) { 
            console.log(err.response.data)
            Alert.alert("Credenciais Inválidas!")
        }
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token')
            setToken(null);
            setIsAuthenticated(false);
            setUser(null);
        } catch (err) {
            console.log(err)
        }
       
    }

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
}

export default AuthProvider;