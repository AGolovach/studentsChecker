import React from 'react'
import {StudentType} from "../StudentsDisplay";
import './Students.css'
export const StudentsInfoRow = ({students, direction = 'row'}:{students: StudentType[], direction: 'row' | 'column'}) => {
    return <div className={`student-info-${direction}`}>
        {students.map(student=> (<div key={direction+student.email} className={'student-info-cell'}>
            {student.fullName}
        </div>)
        )}
    </div>
}
