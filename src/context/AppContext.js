import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const AppReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return {
				...state,
				expenses: [...state.expenses, action.payload],
			};
		case 'DELETE_EXPENSE':
			return {
				...state,
				expenses: state.expenses.filter(
					(expense) => expense.id !== action.payload
				),
			};
		case 'SET_BUDGET':
			return {
				...state,
				budget: action.payload,
			};

		default:
			return state;
	}
};

const initialState = {
	budget: 5000,
	expenses: [
		{ id: uuidv4(), name: 'Netflix', date: '19/12/2021', cost: 100 },
		{ id: uuidv4(), name: 'Holiday', date: '15/7/2021', cost: 300 },
		{ id: uuidv4(), name: 'Entertainment', date: '22/2/2021', cost: 80 },
		{ id: uuidv4(), name: 'Insurance', date: '14/01/2002', cost: 600 },
	],
};

export const AppContext = createContext();

export const AppProvider = (props) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	return (
		<AppContext.Provider
			value={{
				expenses: state.expenses,
				budget: state.budget,
				dispatch,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};