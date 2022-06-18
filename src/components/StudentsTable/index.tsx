import React from 'react';
import {StudentType} from "../StudentsDisplay";
import {StudentsInfoRow} from "./StudentsInfoRow";
import {BackgroundStorybook} from "./BackgroundStorybook";

type Props = {
    students: StudentType[]
    studentsCross: number[][]
    questionsCount: number
}

export const getBackgroundClassNames = (percent: number)=>{
    const decPart = Math.floor(percent / 10)
    switch (decPart){
        case 0:
            return 'empty'
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            return 'xs';
        case 6:
            return 's';
        case 7:
            return 'm';
        case 8:
            return 'l';
        case 9:
            return 'xl';
        case 10:
            return 'xxl';
    }
}
export const StudentsTable = ({students = [], studentsCross = [], questionsCount = 1}:Props ) => {
    return <>
        <BackgroundStorybook />
        <div style={{margin: 15, border: '1px solid #ececec', width: 'fit-content', borderRadius: 8}}>
            <StudentsInfoRow students={students} direction={'row'}/>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <StudentsInfoRow students={students} direction={'column'}/>
                {studentsCross.map((crosses, rowStudentId)=> {
                   return <div key={'info_row'+rowStudentId}>
                       {crosses.map((val, columnStudentId)=> {
                           const crossPercent = Math.floor(val / questionsCount * 100)
                           return <div
                               key={'info_row'+columnStudentId}
                               className={`cell cross-value-${getBackgroundClassNames(crossPercent)}`}>
                               {crossPercent ? crossPercent+'%' : 0}
                           </div>
                       })}
                   </div>
                    })
                }
            </div>
        </div>
    </>
}
