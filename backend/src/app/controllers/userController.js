const User = require('../models/user')

exports.login = async (req, res) => {
  const { email, name } = req.body

  try {
    
      const user = await User.findOne({ email })
    
      if(user){
        return res.send(user)
      } else {
    
        const newUser = {
          name,
          email,
          challenges: 0,
          level: 1,
          currentExperience: 0
        }
    
        const response = await User.create(newUser)
    
        return res.send(response)

      }
  } catch (e) {
    res.status(400).send({ error: 'Error in user login.'})
  }
}

exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.find({})

    return res.send(users)

  } catch (e) {
    res.status(500).send({ error: 'Interval error acessing mongodb.'})
  }
}

exports.updateUser =  async (req, res) => {
  try {

    const { email, ...rest } = req.body

    const user = await User.findOneAndUpdate({ email },  { ...rest }, { new: true, useFindAndModify: false })

    return res.send(user)

  } catch {
    res.status(400).send({ error: 'Error updating user.'})
  }
}