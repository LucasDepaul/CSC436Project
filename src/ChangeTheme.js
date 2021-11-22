import React, {useState, useEffect} from 'react'
import { useResource } from 'react-request-hook'
import { NavDropdown } from 'react-bootstrap'


function ThemeItem ({ theme, active, onClick }) {
    return (
       <span onClick={onClick} style={{ cursor: 'pointer', paddingLeft: 8, fontWeight: active ? 'bold' : 'normal' }}>
           <span style={{ color: theme.primaryColor }}>{theme.name}</span>
        </span>
    )
 } 

export default function ChangeTheme ({ theme, setTheme }) {

    const [ themes, getThemes ] = useResource(() => ({
        url: '/themes/',
        method: 'get'
    }))

    useEffect(getThemes, [])
    var{ data, isLoading } = {}
    if (themes.data)
     data= themes.data.themes


    function isActive (t) { return t.primaryColor === theme.primaryColor && t.secondaryColor === theme.secondaryColor }
    return ( 
        <>
            {isLoading && ' Loading themes...'}
            <NavDropdown title="ChangeTheme" id="basic-nav-dropdown">
                {data && data.map((t, i) =>
                    <NavDropdown.Item>
                        <ThemeItem key={'theme-' + i} theme={t} active={isActive(t)} onClick={() => setTheme(t)} />
                    </NavDropdown.Item>
                )}
                </NavDropdown>
         </>
    )
}
