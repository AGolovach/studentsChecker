import React, {useEffect, useState} from 'react'
import {FileUploader} from "../FileUploader";
import {StudentsTable} from "../StudentsTable";
import {StudentsList} from "../StudentsList";
import {Button} from "../../ui-lib/Button";


export type AnswerType = {
    [key: string]: string
}

export type StudentType = {fullName: string, email: string}
export type State = {
    students: StudentType[]
    answers: Map<string, string>[]
}

export const StudentsDisplay = () => {
    const [showTable, setShowTable] = useState(false)
    const [state, setState] = useState<State>({students: [], answers: []})
    const [displayedData, setDisplayedData] = useState<number[][]>([])
    const onFileUpload = (rowObj: AnswerType[]) => {
        const res = rowObj.map((row: AnswerType)=> Object.keys(row).reduce((acc: Map<string, string>, title: string)=> {
            if (title.includes('Ответ')){
                acc.set(title, row[title])
            }
            return acc
        }, new Map()))

        setState({...state,
            students: rowObj.map(item=> ({
                fullName:  item['Фамилия'] + ' ' + item['Имя'] ,
                email: item['Адрес электронной почты']
            })),
            answers: res
        })
    }

    const calculateRats = ()=> {
        const {answers} = state
        const result = new Array(answers.length);

        for(let i = 0; i < result.length; i++){
            const row: number[] = []
            row.length = result.length
            row.fill(0)
            result[i] = new Array(...row);

        }

        for (let currentIndex = 0; currentIndex < answers.length - 1; currentIndex++) {
            const currentStudent = answers[currentIndex]
            for (let indexForCheck = currentIndex + 1; indexForCheck < answers.length; indexForCheck++){
                const checkedStudent = answers[indexForCheck]

                // @ts-ignore
                for (let answer of currentStudent.keys()) {
                    if (currentStudent.get(answer) === checkedStudent.get(answer)){
                        result[currentIndex][indexForCheck] += 1
                        result[indexForCheck][currentIndex] += 1
                    }
                }
            }
        }
        setDisplayedData(result)
    }

    useEffect(()=>{
        if(state.answers.length){
            // @ts-ignore
            calculateRats()
        }
    },[state])

    return <div>
        <FileUploader onUpload={onFileUpload} />

        {state.answers.length ? <Button style={{marginTop: 15}} onClick={()=> setShowTable(prev=> !prev)} label={showTable ? 'Скрыть таблицу': 'Показать таблицу'}/> : <></>}
        <div className={`students-table ${showTable ? '' : 'students-table-hidden'}`}>
            <StudentsTable
                students={state.students}
                studentsCross={displayedData}
                questionsCount={state.answers[0]?.size}
            />
        </div>
        <StudentsList
            students={state.students}
            studentsCross={displayedData}
            questionsCount={state.answers[0]?.size}
        />
    </div>
}
