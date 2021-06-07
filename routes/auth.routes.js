const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')

const router = Router()

// /api/auth/register - регистрация пользователя
router.post(
    '/register',
    [
        check('email', 'Некорректное значение эл. почты').isEmail(),
        check('password', 'Пароль должен быть длиной не менее 6 символов').isLength({min: 6})
    ],
    async(req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Указаны некорректные данные при регистрации пользователя'
            })
        }

        const {email,password} = req.body
        const candidate = await User.findOne({ email })
        if (candidate) {
            return res.status(400).json({ message: 'Такой пользователь уже существует'})
        }

        const passwordHashed = await bcrypt.hash(password, 13)
        const user = new User({ email, password: passwordHashed })

        await user.save()

        res.status(201).json({ message: `Пользователь создан` })

    } catch(e) {
     res.status(500).json({ message: 'Упс! Что-то пошло не так... Попробуйте снова'})
    }
})

// /api/auth/login - авторизация
router.post('/login',
    [
        check( 'email', 'Введите корректный адрес электронной почты').normalizeEmail().isEmail(),
        check( 'password', 'Введите правильный пароль').exists()
    ],
    async(req, res) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Указаны некорректные данные при входе в систему'
                })
            }

            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: 'Неверные данные для входа (пароль)'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h'}
            )
            res.json({ token, userId: user.id, email: user.email})


        } catch(e) {
            res.status(500).json({ message: 'Упс! Что-то пошло не так... Попробуйте снова'})
        }
})

module.exports = router