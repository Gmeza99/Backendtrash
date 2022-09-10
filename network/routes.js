import express from 'express';







import BackAuth from '../components/Auth/NewAuth/Auth_network'
const router = express.Router();


router.use('/Auth', BackAuth)


module.exports = router;
