import React, {useContext} from 'react'
import { ThemeContext } from './Context'
import {Link} from 'react-navi'

const Header = ({text}) => {
	const theme = useContext(ThemeContext)
	return <Link style={{textDecoration: 'none'}} href="/"><h1 style={ { color: theme.primaryColor }}>{text}</h1></Link>
}
export default Header