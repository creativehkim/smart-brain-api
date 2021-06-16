// const { restart } = require("nodemon");

const handleRegister = (req, res, db, bcrypt, saltRounds, cors) => {
  const { email, name, password } = req.body

  if(!email || !name || !password) {
    return res.status(400).json('incorrect form submission')
  }
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: emails
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name, 
            joined: new Date(),
          })
          .then(user => {
            res.json(user[0])
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register....'))}

    module.exports = {
      handleRegister: handleRegister
    }