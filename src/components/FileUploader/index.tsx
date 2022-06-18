import React, {useEffect, useState} from 'react'
import {read, utils} from "xlsx";
import {AnswerType} from "../StudentsDisplay";

export const FileUploader = ({ onUpload }: {onUpload: (rowObj: AnswerType[]) => void}) => {

    const importData = (file: any) => {
        const reader = new FileReader()
        reader.onload = function () {

            const fileData = reader.result
            const wb = read(fileData, { type: 'binary' })

            wb.SheetNames.forEach(function (sheetName) {
                const rowObj: AnswerType[] = utils.sheet_to_json(wb.Sheets[sheetName])

                if (rowObj.length) {
                    onUpload(rowObj)
                }
            })
        }
        reader.readAsBinaryString(file)
    }


    return  <div>
        <input type={'file'} onChange={(e)=> {
            if (e.target.files){
                const file = e.target.files[0]
                e.target.files[0].type.includes('sheet') && importData(file)
            }
        }}/>
    </div>

}
