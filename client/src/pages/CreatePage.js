import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from '../context/auth.context'
import {useMessage} from "../hooks/message.hook";
import {useHistory} from "react-router-dom";



export const CreatePage = () => {
    const [form, setForm] = useState({
        beginDate:'',endDate:'', subject:'',about:'',location:'',teacher:''
    })
    const history = useHistory()
    const message = useMessage()
    const auth = useContext(AuthContext)
    const {loading,request,error, clearError } = useHttp()

    useEffect(() => {
        message(error)
        clearError()
    },[error, message, clearError])

    const changeHandler = event => {
        setForm ({...form, [event.target.name]: event.target.value})
    }

    const createHandler = async () => {
        try {
            const data = await request('/api/lessons/create', 'POST', {...form},{
                Authorization: `Bearer ${auth.token}`
            })
            history.push(`/detail/${data.lesson._id}`)
            message(data.message)
        } catch (e) {}
    }


    return (

        <div className = "row">

            <div className="col s8 offset-s2" style = {{paddingTop: '2rem'}}>
                <h3>Создание новой записи</h3>
                <br/>
                <div className="input-field">
                    <input
                        id="subject"
                        type="text"
                        name = "subject"
                        value ={form.subject}
                        onChange = {changeHandler}
                    />
                    <label className="active" htmlFor="subject">Наименование</label>
                </div>
                <div className="input-field">
                    <input placeholder="Корпус-Аудитория" type="text" id="location" name = "location" value = {form.location} onChange = {changeHandler}/>
                    <label className="active" htmlFor="location">Место проведения</label>
                </div>
                <div className="input-field">
                    <input placeholder="ФИО преподавателя" type="text" id="teacher" name = "teacher" value = {form.teacher} onChange = {changeHandler}/>
                    <label className="active" htmlFor="teacher">Преподаватель</label>
                </div>
                <div className="input-field">
                    <input type="datetime-local" id ="beginDate" name = "beginDate" value = {form.beginDate.valueAsNumber} onChange = {changeHandler}/>
                    <label className="active" htmlFor="beginDate">Дата и время начала</label>
                </div>
                <div className="input-field">
                    <input type="datetime-local" id="endDate" name = "endDate" value = {form.endDate.valueAsNumber} onChange = {changeHandler}/>
                    <label className="active" htmlFor="endDate">Дата и время окончания</label>
                </div>
                <div className="input-field">
                    <textarea id="about" name = "about" value={form.about} onChange = {changeHandler} className="materialize-textarea" data-length="250"></textarea>
                    <label htmlFor="about">Описание</label>
                </div>

                <div align = "right" className="card-action">
                    <button
                        className = "btn yellow darken-3"
                        disabled={loading}
                        onClick={createHandler}
                    >Создать запись</button>

                </div>
            </div>



        </div>

    )
}