import React, {useCallback, useState, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {AuthContext} from '../context/auth.context';
import {useHttp} from '../hooks/http.hook';
import {Loader} from "../components/Loader";
import {LessonCard} from "../components/LessonCard";

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [lesson, setLesson] = useState(null)
    const lessonId = useParams().id

    const getLesson = useCallback( async () => {
        try {
            const fetched = await request(`/api/lessons/${lessonId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLesson(fetched)
        } catch (e) {}
    }, [token, lessonId, request])

    useEffect( () => {
        getLesson()
    }, [getLesson])


    if (loading) {
        return <Loader />
    }

    return (
        <div>
            {!loading && lesson && <LessonCard lesson = {lesson}/>}
        </div>
    )
}