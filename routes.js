const express = require('express')
const router = express.Router()
const db= require('./db')
const { route } = require('./app')

router.post(('/getRole'), async (req, res) => {
    const { id } = req.body

    if(!id) return res.status(401).json({mess: "Введите ID"})

    const user = await db('users').where( { id} ).first()
    if(!user) return res.status(401).json({mes: "Пользователь не найден"})


    if(user.role == 'user'){
        var newRole = 'admin'
    } else if(user.role == 'admin') {
        var newRole = 'superadmin'
    } else if(user.role == 'superadmin'){
        return res.status(200).json({mess: "У пользователя уже лучшая роль"})
    }

    await db('users')
        .where( { id } )
        .update({ role: newRole })

    return res.status(200).json({mes: `Роль успешно изменена на ${newRole}`})
})


module.exports = router;
