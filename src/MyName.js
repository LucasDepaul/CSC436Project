import React, {useState} from 'react'

function MyName(){
	const [name, setName] use state('')

	function handleNameChange(evt){
		setName(evt.target.value)
	}

	return (
		<div>
			<h1> Hello {name} </h1>
			<input type = text value = {name} onChange={handleNameChange} />
		</div>
		)
}

Export default MyName