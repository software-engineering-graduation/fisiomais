import { createSlice } from '@reduxjs/toolkit';

// todo - remove these mocks
const mockPaciente = {
    id: 2,
    nome: "Jane Smith",
    email: "jane.smith@example.com",
    password: "securePwd456",
    data_nascimento: "1985-08-22",
    cpf: "98765432109",
    telefone: "555-987-6543",
    genero: "Mulher",
    endereco: "456 Elm St, Town",
    role: 'paciente'
}
const mockFisio = {
    id: 1,
    nome: "Dr. Sarah PT",
    email: "sarah.pt@example.com",
    password: "ptSecurePwd",
    telefone: "555-333-4444",
    endereco: "456 Birch St, Town",
    controle_automatico: true,
    role: 'fisioterapeuta'
}

// const mockUser = mockFisio
// const mockUser = mockPaciente
// const mockId = mockUser.id;

const mockUser = null
const mockId = null

export const currentUser = createSlice({
    name: 'currentUser',
    initialState: {
        value: {
            user: mockUser,
            token: null,
        }
    },
    reducers: {
        login: async (state, action) => {
            console.log('login action:', action.payload)
            state.value.user = action.payload.user;
            state.value.token = action.payload.token;
            localStorage.setItem('user', JSON.stringify(state.value.user.id));
        },
        logout: (state) => {
            state.value.user = null;
            localStorage.removeItem('user');
        },
    }
});

// Action creators are generated for each case reducer function
export const { login, logout } = currentUser.actions;

export default currentUser.reducer;