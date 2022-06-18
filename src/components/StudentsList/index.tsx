import React, {useState} from 'react';
import {StudentType} from "../StudentsDisplay";
import {Button} from "../../ui-lib/Button";

type Props = {
    students: StudentType[]
    studentsCross: number[][]
    questionsCount: number
}

export const StudentsList = ({students = [], studentsCross = [], questionsCount = 1}:Props ) => {
    const [minPercent, setMinPercent] = useState<number>(-1)
    const [list, setList] = useState<Map<string, number>>()
    const getStudentsList = () => {
        const result = new Map<string, number>()
        for (let currentStudentId = 0; currentStudentId < studentsCross.length -1; currentStudentId++){
           const currentStudentRow = studentsCross[currentStudentId]
            for (let checkedStudentId = currentStudentId+1; checkedStudentId < studentsCross.length; checkedStudentId++ ){
                const percent = Math.floor((currentStudentRow[checkedStudentId] / questionsCount) * 100)
                if (percent >= minPercent){
                    result.set(`${students[currentStudentId].fullName} - ${students[checkedStudentId].fullName}`,percent )
                }
            }
        }
        setList(result)
    }
    if (!studentsCross.length){
        return <></>
    }
    return <>
        <div style={{columnGap: 10, display: 'flex', alignItems: 'center'}}>
            <input
                style={{width: 200}}
                type={'number'}
                placeholder={'Введите число в процентах'}
                min={0}
                max={100}
                onChange={(e)=> setMinPercent(+e.target.value)}
            />
            <Button hidden={minPercent === -1 || !!list?.size} onClick={()=> getStudentsList()} label={'Отобразить список'}/>
            <Button hidden={!list?.size} onClick={()=> {
                const clearList = new Map()
                setList(clearList)
            }} label={'Очистить список'}/>
        </div>
        <div>
            {Array.from(list || []).map((item)=><div>
                {`${item[0]}: ${item[1]}%`}
            </div>)
            }
        </div>
    </>
}
