const router = require('express').Router();
const express = require('express')
const users = express.Router()
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


users.post('/signup', (req, res) => {
  const today = new Date().toDateString()
  const newuserData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      datetime: today
  }

  User.findOne({
      where: {
          email: req.body.email
      }
  })
      .then(user => {
          if (!user) {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
              userData.password = hash
              User.create(newuserData)
                  .then(user => {
                      res.json({ status: user.email + 'REGISTERED' })
                  })
                  .catch(err => {
                      res.send('ERROR: ' + err)
                  })
              })
          } else {
              res.json({ error: "USER ALREADY EXISTS" })
          }
      })
      .catch(err => {
          res.send('ERROR: ' + err)
      })
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
