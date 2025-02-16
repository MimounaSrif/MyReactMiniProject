import { createSlice } from '@reduxjs/toolkit';

// État initial des demandes
const initialRequestsState = {
  demandes: [],
};

// Création du slice Redux pour les demandes
const requestsSlice = createSlice({
  name: 'requests',
  initialState: initialRequestsState,
  reducers: {
    addRequest: (state, action) => {
      state.demandes.push(action.payload);
    },
    updateRequest: (state, action) => {
      const { id, etat } = action.payload;
      const request = state.demandes.find((demande) => demande.id === id);
      if (request) {
        request.etat = etat;
      }
    },
    deleteRequest: (state, action) => {
      state.demandes = state.demandes.filter((demande) => demande.id !== action.payload);
    },
    setRequests: (state, action) => {
      state.demandes = action.payload;
    },
  },
});

// Export des actions et du reducer
export const { addRequest, updateRequest, deleteRequest, setRequests } = requestsSlice.actions;
export default requestsSlice.reducer;
