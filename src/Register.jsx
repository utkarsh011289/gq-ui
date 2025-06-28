import React, { useState } from 'react'
import { SAVE_STUDENT } from './graphql/mutations/SAVE_STUDENT.js'
import { useMutation } from '@apollo/client'

const data = [
    {
        lbl: "Name",
        name: "name",
        type: "text",
        error: "Enter user id",
        hasError: false,
        value: ''
    },
    {
        lbl: "Rno",
        name: "rno",
        type: "number",
        error: "Enter Roll no",
        hasError: false,
        value: ''
    },
    {
        lbl: "Location",
        name: "loc",
        type: "text",
        error: "Enter Location",
        hasError: false,
        value: ''
    }
]

const Input = ({ lbl, name, value, type, hasError, error, handleChange }) => {
    return <div className='row mb-3'>
        <div className='col-sm-5 text-end'>
            <b>{lbl}:</b>
        </div>
        <div className='col-sm-3'>
            <input type={type} name={name} onChange={handleChange} className='form-control' />
        </div>
        <div className='col-sm-4'>
            {hasError && <b className='text-danger'>{error}</b>}
        </div>
    </div>
}

const Register = () => {
    const [fnSave,{ loading, data, error }] = useMutation(SAVE_STUDENT)
    const [inputControls, setInputControls] = useState(data)


    const handleChange = (eve) => {
        const { name, value } = eve.target;
        const clonedInputControls = JSON.parse(JSON.stringify(inputControls))
        const inputObj = clonedInputControls.find((obj) => obj.name === name)
        inputObj.value = value;
        inputObj.hasError = false
        if (!value) {
            inputObj.hasError = true
        }
        setInputControls(clonedInputControls)
    }


    const fnRegister = async () => {
        const clonedInputControls = JSON.parse(JSON.stringify(inputControls))
        const dataObj = {}

        clonedInputControls.forEach((obj) => {
            dataObj[obj.name] = obj.value
            if (!obj.value) {
                obj.hasError = true
            }
        })

        const isInvalid = clonedInputControls.some((obj) => obj.hasError)

        if (isInvalid) {
            setInputControls(clonedInputControls)
            return;
        }

        const res = await fnSave({
            variables: {
                data: dataObj
            }
        })
        console.log(res);
    }

    return (
        <div className='container-fluid'>
            <h5 className='text-center my-3'>Register</h5>

            {
                inputControls.map((obj) => {
                    return <Input {...obj} handleChange={handleChange} />
                })
            }
            <div className='row mb-3'>
                <div className='offset-sm-5 col-sm-7'>
                    <button onClick={fnRegister} className='btn btn-primary'>Register</button>
                </div>
            </div>
        </div>
    )
}


export default Register
