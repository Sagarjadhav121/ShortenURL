const shortedId= require('shortid');
const URL=require('../models/url');

const handleGenerateNewShortUrl = async (req,res) => {
    const body = req.body;
    if(!body.url) return res.status(400).json({error:'url is required'})
    const newShortID=shortedId();
    await URL.create({
        shortId:newShortID,
        redirectUrl:body.url,
        visitHistory:[],
    });
    res.json({success:true,ID:newShortID});
};
const handleRedirectURL = async (req, res) => {
  const Id = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId: Id },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectUrl);
};

const handleAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId: shortId });
  return res.json({
    totalClick:result.visitHistory.length,
    Analytics :result.visitHistory
})
};
module.exports = {
  handleGenerateNewShortUrl,
  handleRedirectURL,
  handleAnalytics
};
