const {Router} = require('express')
const router =Router()

router.get('/', (req,res)=>{
    res.render('stories')
})

module.exports = router