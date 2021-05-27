import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {Loader} from "../components/Loader";
import {LessonsList} from "../components/LessonsList";

export const TablePage = () => {
    const [lessons, setLessons] = useState([])
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

    if (loading) {
        return <Loader/>
    }
    return (
        <div>
            {!loading && <LessonsList lessons = {lessons}/> }
        </div>
    )
}