const express=require('express');
const router=express.Router();
const {handleGenerateNewShortUrl,handleRedirectURL,handleAnalytics}=require('../controllers/url')

router.post('/',handleGenerateNewShortUrl);
router.get('/:shortId',handleRedirectURL)
router.get('/analytics/:shortId',handleAnalytics)
module.exports=router;