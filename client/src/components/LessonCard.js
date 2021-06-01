import React from 'react'

export const LessonCard = ({lesson}) => {
    return (
        <div className = "row">

            <div className="col s12 m6">
                <h2>Занятие</h2>
                <p>Название: <strong>{lesson.subject}</strong></p>
                <p>Аудитория: <strong>{lesson.location}</strong></p>
                <p>Преподаватель: <strong>{lesson.teacher}</strong></p>
                <p>Начало занятия: <strong>{new Date(lesson.beginDate).toLocaleString()}</strong></p>
                <p>Конец занятия: <strong>{new Date(lesson.endDate).toLocaleString()}</strong></p>
            </div>
            <div style = {{whiteSpace:"pre-line"}} className = "col s12 m6" >
                <h2 className="header">Описание:</h2>
                <strong>{lesson.about}</strong>
            </div>
       </div>
    )
}