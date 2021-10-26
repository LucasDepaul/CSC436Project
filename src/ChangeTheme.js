import React, {useState, useEffect} from 'react'
import { useResource } from 'react-request-hook'

function ThemeItem ({ theme, active, onClick }) {
    return (
       <span onClick={onClick} style={{ cursor: 'pointer', paddingLeft: 8, fontWeight: active ? 'bold' : 'normal' }}>
           <span style={{ color: theme.SecondaryColor }}>{theme.name}</span>
        </span>
    )
 } 

export default function ChangeTheme ({ theme, setTheme }) {

    const [ themes, getThemes ] = useResource(() => ({
        url: '/themes',
        method: 'get'
    }))

    useEffect(getThemes, [])

    const { data, isLoading } = themes


    function isActive (t) { return t.primaryColor === theme.primaryColor && t.secondaryColor === theme.secondaryColor }
    return ( <div>
         Change theme:
        
         {isLoading && ' Loading themes...'}

         {data && data.map((t, i) =>
                 <ThemeItem key={'theme-' + i} theme={t} active={isActive(t)} onClick={() => setTheme(t)} />
         )} </div>
    )
}
