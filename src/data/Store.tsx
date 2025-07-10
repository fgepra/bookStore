import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const user = createSlice({
  name: 'user',
  initialState: { id: 1, name: '김태우', job: '개발자' },
  reducers: {
    changeName(state) {
      state.name = '김태우';
    },
    increase(state, action) {
      state.id += action.payload;
    }
  }
});

export const { changeName, increase } = user.actions;

export interface cartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface CartArray {
  cart: cartItem[];
}

const cart = createSlice({
  name: 'cart',
  initialState: {
    cart: [
      { id: 0, name: '백엔드', quantity: 1, price: 34000 },
      { id: 1, name: 'HTML', quantity: 1, price: 20000 }
    ]
  } as CartArray,
  reducers: {
    plusCount(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) item.quantity++;
    },
    minusCount(state, action) {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 0) item.quantity--;
    },
    addItem(state, action) {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push({
          id: action.payload.id,
          name: action.payload.name,
          quantity: 1,
          price: action.payload.price
        });
      }
    },
    resetCart(state) {
      state.cart = [];
    }
  }
});

export const { plusCount, minusCount, addItem, resetCart } = cart.actions;

const rootReducer = combineReducers({
  user: user.reducer,
  cart: cart.reducer
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
