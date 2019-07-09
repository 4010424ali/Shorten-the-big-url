const express = require('express');
const router = express.Router();

const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');

const Url = require('../models/Url');

// @route    POST /api/url/shorten
// @desc     Create Short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  if (!validUrl.isUri(baseUrl)) {
    res.status(401).json({ message: 'Invalid base URL' });
  }

  // Create Url Code
  const urlCode = shortId.generate();

  // Check the long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        return res.json({ url });
      } else {
        const shortUrl = baseUrl + '/' + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          data: new Date()
        });

        await url.save();

        return res.json({ url });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: 'Server Error' });
    }
  } else {
    return res.status(401).json({ error: 'Url is not valid' });
  }
});

module.exports = router;
