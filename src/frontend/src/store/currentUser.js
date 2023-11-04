import { createSlice } from '@reduxjs/toolkit';

// todo - remove this mock
const mockUser = {
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

export const currentUser = createSlice({
    name: 'currentUser',
    initialState: {
        value: {
            user: mockUser,
            userId: undefined
        }
    },
    reducers: {
        login: (state, action) => {
            state.value.user = action.payload;
            state.value.userId = action.payload.id;
            localStorage.setItem('user', JSON.stringify(state.value.user.id));
        },
        logout: (state) => {
            state.value.user = {};
            state.value.userId = undefined;
            localStorage.removeItem('user');
        },
    }
});

// Action creators are generated for each case reducer function
export const { login, logout } = currentUser.actions;

export default currentUser.reducer;