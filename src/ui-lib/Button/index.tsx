import React from 'react'
import './style.css'

export const Button = ({hidden, style, label, onClick}: {style?: React.CSSProperties, label: string, onClick: ()=> void, hidden?: boolean}) => {
    return <button className={'ui-button'} style={{...style, display: hidden ? 'none' : 'inline-block'}} onClick={onClick}>{label}</button>
}
