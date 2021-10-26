import React from 'react';

export const ThemeContext = React.createContext({
	primaryColor: 'deepskyblue',
	secondaryColor: 'coral',
	color: 'blue',
	backgroundColor: 'powderblue',
	textAlign: 'center'
})

export const StateContext = React.createContext({
	state: {},
	dispatch: () => {}
})