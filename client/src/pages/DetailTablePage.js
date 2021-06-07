import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {Loader} from "../components/Loader";
import {LessonsList} from "../components/LessonsList";

export const DetailTablePage = () => {
    const [form, setForm] = useState({
        dateFrom:'',dateTo:''
    })
    const [lessons, setLessons] = useState([])
    const [filtered, setFiltered] = useState([])
    const {loading, request} = useHttp()
    const {token}  = useContext(AuthContext)

    const fetchLessons = useCallback(async () => {
        try {
            const fetched = await request('/api/lessons/', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLessons(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect( () => {
        fetchLessons()
    }, [fetchLessons])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    //каждый раз, когда изменяется поле ввода, перезаписывать элементы формы
    const changeHandler = event => {
        setForm ({...form, [event.target.name]: event.target.value})
    }

    //поиск с 00:00:00 раннего дня по 23:59:59 позднего дня
    const filterHandler = () => {
        var from = new Date(form.dateFrom)
        var to = new Date(form.dateTo)
        from.setHours(0,0,0)
        to.setHours(23,59,59)
        setFiltered( lessons.filter(lesson => (new Date(lesson.beginDate) >= from && new Date(lesson.beginDate) <= to) ) )
        if (filtered.length === 0) {
            window.M.toast({html:'Записей в заданный временной промежуток не обнаружено!'})
        }
    }

    if (loading) {
        return <Loader/>
    }
    return (
        <div>
            <h4>Поиск по дате</h4>
            <div className = "row">
                <div className="input-field col s4">
                    <input
                        className = "orange-input"
                        id = "dateFrom"
                        type = "date"
                        name = "dateFrom"
                        value = {form.dateFrom.value}
                        onChange = {changeHandler}
                    />
                    <label className="active" htmlFor="dateFrom">Искать с:</label>
                </div>
                <div className="input-field col s4">
                    <input
                        className = "orange-input"
                        id="dateTo"
                        type="date"
                        name = "dateTo"
                        value = {form.dateTo.value}
                        onChange = {changeHandler}
                    />
                    <label className="active" htmlFor="dateTo">Искать по:</label>
                </div>
                <button
                    className = "btn yellow darken-3"
                    disabled={loading}
                    style = {{marginTop:24} }
                    onClick = {filterHandler}
                >Показать
                </button>
            </div>
            <hr/>
            <div>
            {!loading && <LessonsList lessons = {filtered}/> }
            </div>
        </div>
    )
}
