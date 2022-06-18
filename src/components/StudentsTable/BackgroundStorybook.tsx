import React from 'react'
import {getBackgroundClassNames} from "./index";

export const BackgroundStorybook = () => {
    const exampleList = [0, 10, 20, 30, 40,50,60, 70, 80, 90, 100]
    return <div style={{marginLeft: 15}}>
        Расшифровка таблицы
        <div style={{display: 'flex', fontSize: 12}}>
        {exampleList.map((val, index)=> {
            return <div
                style={{ width: 65, marginLeft: index ? 10 : 0}}
                key={'example_row'+index}
                className={`cell cross-value-${getBackgroundClassNames(val)}`}>
                {val ? `${val-9}%-${val}%` : 0}
            </div>
        })}
    </div>
    </div>
}
