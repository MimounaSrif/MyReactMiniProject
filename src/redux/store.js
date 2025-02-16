import { createSlice, configureStore } from '@reduxjs/toolkit';
import requestsReducer from '../redux/requestsSlice'
// État initial
const initialState = {
  nom: '',
  prenom: '',
  age: '',
  admin: false,
  MotDePasse: '',
  pseudo: '',
  couleur: '',
  Devise: '',
  Pays: '',
  avatar: '',
  email: '',
  photo: '',
  id: '',
};

// Création du slice Redux
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => {
      return initialState;
    },
    updateColor: (state, action) => {
      state.couleur = action.payload;
    },
  },
});

// Configuration du store Redux
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    requests: requestsReducer,
  },
});

// Export des actions et du store
export const { setUser, clearUser, updateColor } = userSlice.actions;
export default store;
