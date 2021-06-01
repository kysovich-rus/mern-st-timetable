import React, {useCallback, useState, useContext, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {AuthContext} from '../context/auth.context';
import {useHttp} from '../hooks/http.hook';
import {Loader} from "../components/Loader";
import {LessonCard} from "../components/LessonCard";
import {useMessage} from "../hooks/message.hook";


export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [lesson, setLesson] = useState(null)
    const message = useMessage()
    const lessonId = useParams().id
    const history = useHistory()

    const getLesson = useCallback( async () => {
        try {
            const fetched = await request(`/api/lessons/${lessonId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLesson(fetched)
        } catch (e) {}
    }, [token, lessonId, request])

    const deleteLesson = async () => {
        try {
            const data = await request(`/api/lessons/${lessonId}/delete`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            message(data.message)
            history.push('/table')
        } catch (e) {
            console.log(`Непредвиденная ошибка при удалении записи`)
        }
    }

    useEffect( () => {
        getLesson()
    }, [getLesson])


    if (loading) {
        return <Loader />
    }

    return (
        <div>
            {!loading && lesson && <LessonCard lesson = {lesson}/>}
            <button
                className = "btn yellow darken-3"
                disabled={loading}
                onClick={deleteLesson}
            >Удалить запись
            </button>
        </div>
    )
}