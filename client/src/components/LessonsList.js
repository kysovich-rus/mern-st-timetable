import React from 'react'
import {Link} from 'react-router-dom'
export const LessonsList = ({ lessons}) => {

        if (!lessons.length) {
            return (<p className="center">Здесь пусто... <Link className = "orange-link" to ="/create">Добавить!</Link></p>)
        }
        return (
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Начало</th>
                    <th>Конец</th>
                        <th>Наименование</th>
                        <th>Аудитория</th>
                    <th>Преподаватель</th>
                    <th>Перейти</th>
                </tr>
                </thead>

                <tbody>
                {
                    lessons.map((lesson, index) => {
                        return (
                            <tr key = {lesson._id}>
                                <td>{index+1}</td>
                                <td>{new Date(lesson.beginDate).toLocaleString()}</td>
                                <td>{new Date(lesson.endDate).toLocaleString()}</td>
                                <td>{lesson.subject}</td>
                                <td>{lesson.location}</td>
                                <td>{lesson.teacher}</td>
                                <td>
                                    <Link className = "orange-link" to={`/detail/${lesson._id}`}>Открыть</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
}