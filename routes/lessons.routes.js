
const {Router} = require('express')
const Lesson = require('../models/Lesson')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const router = Router()

router.post('/create', auth, async(req,res) => {
    try {
        const {beginDate, endDate, subject, about, location, teacher} = req.body
        const begT = new Date(beginDate);
        const endT = new Date(endDate);
        if (begT>endT) {
            return res.status (400).json({message: 'Некорректно заданы параметров дата/время'})
        }
        const lesson = new Lesson ({
            owner: req.user.userId,
            beginDate: begT,
            endDate: endT,
            subject,
            about,
            location,
            teacher})

        await lesson.save()

        res.status(201).json({message: 'Новая запись успешно добавлена!', lesson})

    } catch (e) {
        res.status(500).json({ message: 'Упс! Что-то пошло не так... Попробуйте снова'})
    }
})


router.get('/', auth, async (req,res) => {
    try {
        const lessons = await Lesson.find({owner:await User.findById(req.user.userId)}).sort({"beginDate": 1})
        res.json(lessons)
    } catch(e) {
        res.status(500).json({ message: 'Упс! Что-то пошло не так... Попробуйте снова'})
    }
})

router.get('/:id', auth, async (req,res) => {
    try {
        const lesson = await Lesson.findById(req.params.id)
        res.json(lesson)
    } catch(e) {
        res.status(500).json({ message: 'Упс! Что-то пошло не так... Попробуйте снова'})
    }
})

module.exports = router



