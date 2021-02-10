
import createDataContext from './createDataContext';
import api from '../api/hotline';

const initialState = {
  list: [],
  byId: {},
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SIGHTINGS_LIST':
      return ({
        ...state,
        list: action.payload,
      });
    case 'FETCH_SIGHTING':
      return ({
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      });
    default:
      return state;
  }
};

const fetchSightingsList = dispatch => {
  return async () => {
    const response = await api.getList();

    dispatch({ type: 'FETCH_SIGHTINGS_LIST', payload: response });
  };
};

const fetchSighting = dispatch => {
  return async (id) => {
    const response = await api.getSighting(id);

    dispatch({ type: 'FETCH_SIGHTING', payload: response });
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { fetchSighting, fetchSightingsList },
  initialState,
);
