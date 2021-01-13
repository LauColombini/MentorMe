/* eslint-disable no-param-reassign */
const _ = require("lodash")
const User = require("../models/user")
const Objective = require("../models/objective")

const getUsers = (req, res) => {
  if (!_.isEmpty(req.query)) {
    const pageOptions = {
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
    }
    User.find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err))
  } else {
    User.find({})
      .lean()
      .then((data) => res.status(200).send(data))
      .catch((err) => console.log(err))
  }
}

const getUser = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .select("-_id -__v")
    .then((data) => res.status(200).send(data))
    .catch((err) => console.log(err))
}

// TODO
// router.get("/:userId/mentors/match", matchMentors)
const matchMentors = async (req, res) => {
  try {
    const pageOptions = {
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 999,
    }
    const selectedUser = await User.findOne({ _id: req.params.userId }).select("-__v").lean()
    const skillsToLearnArr = selectedUser.skillsToLearn.map((e) => e._id)
    const users = await User.aggregate([
      { $unwind: "$skillsToTeach" },
      { $match: { "skillsToTeach._id": { $in: skillsToLearnArr } } },
      {
        $group: {
          _id: "$_id",
          firstName: { $first: "$firstName" },
          lastName: { $first: "$lastName" },
          country: { $first: "$country" },
          skillsToTeach: { $push: { _id: "$skillsToTeach._id", name: "$skillsToTeach.name" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: 1 } },
      { $skip: pageOptions.page * pageOptions.limit },
      { $limit: pageOptions.limit },
    ])
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send({ error })
  }
}

const uploadAvatar = (req, res, next) => {
  const _id = req.params.userId
  const url = `${req.protocol}://${req.get("host")}`
  User.findOne({ _id })
    .select("-__v")
    .then((user) => {
      user.avatar = `${url}/images/${req.file.filename}`
      return user
    })
    .then((user) => user.save())
    .then((user) => res.status(201).send(user))
    .catch((error) => res.status(400).send({ error }))
}

// router.post("/:userId/mentors/:mentorId/add", postUserMentor)
const postUserMentor = async (req, res, next) => {
  const { userId, mentorId } = req.params
  const { learningSkills } = req.body // ejemplo para mandar por axios: {"learningSkills": [{ "_id": "5fb818a7ae6e9a634901711b", "name": "mongo" }, { "_id": "5fb818a7ae6e9a634901711c", "name": "sequelize" }] }

  try {
    const user = await User.findOne({ _id: userId })
    // console.log("user", user)
    const mentor = await User.findOne({ _id: mentorId })
    // If the mentor is not in the users's mentors list or the teaching is inactive, we add the mentor to the user.
    const idx = user.mentors.findIndex((e) => e._id.toString() === mentorId)
    console.log("idx", idx)
    if (idx === -1 || !user.mentors[idx].active) {
      console.log("CONDITION ", idx === -1)
      console.log("ENTRO A AGREGAR")
      const { _id, email, firstName, lastName, country, phoneNumber, languages, avatar } = mentor

      user.mentors.push({
        _id,
        email,
        firstName,
        lastName,
        country,
        phoneNumber,
        languages,
        avatar,
        learningSkills,
        meetings: [],
        objectives: [],
        active: true,
      })
      user.save()
    } else {
      return res.status(403).send({ error: "user already has an active relationship with mentor!" })
    }

    // If the user is not in the mentor's mentees list or the teaching is inactive, we add user to the mentor.
    const idy = mentor.mentees.findIndex((e) => e._id.toString() === userId)
    if (idy === -1 || !mentor.mentees[idy].active) {
      const { _id, email, firstName, lastName, country, phoneNumber, languages, avatar } = user
      mentor.mentees.push({
        _id,
        email,
        firstName,
        lastName,
        country,
        phoneNumber,
        languages,
        avatar,
        learningSkills,
        meetings: [],
        objectives: [],
        active: true,
      })
      mentor.save()
    } else {
      return res.status(403).send({ error: "mentor already has an active relationship with user!" })
    }

    return res.status(201).send("mentor added succesfully!")
  } catch (error) {
    return res.status(500).send({ error })
  }
}

// router.post("/:userId/mentees/:menteeId/add", postUserMentee)
const postUserMentee = async (req, res, next) => {
  const { userId, menteeId } = req.params
  const { learningSkills } = req.body

  try {
    const user = await User.findOne({ _id: userId })
    // console.log("user", user)
    const mentee = await User.findOne({ _id: menteeId })

    const idx = user.mentees.findIndex((e) => e._id.toString() === menteeId)
    console.log("idx", idx)
    if (idx === -1 || !user.mentees[idx].active) {
      console.log("CONDITION ", idx === -1)
      console.log("ENTRO A AGREGAR")
      const { _id, email, firstName, lastName, country, phoneNumber, languages, avatar } = mentee

      user.mentees.push({
        _id,
        email,
        firstName,
        lastName,
        country,
        phoneNumber,
        languages,
        avatar,
        learningSkills,
        meetings: [],
        objectives: [],
        active: true,
      })
      user.save()
    } else {
      return res.status(403).send({ error: "user already has an active relationship with mentee!" })
    }

    const idy = mentee.mentors.findIndex((e) => e._id.toString() === userId)
    if (idy === -1 || !mentee.mentors[idy].active) {
      const { _id, email, firstName, lastName, country, phoneNumber, languages, avatar } = user
      mentee.mentors.push({
        _id,
        email,
        firstName,
        lastName,
        country,
        phoneNumber,
        languages,
        avatar,
        learningSkills,
        meetings: [],
        objectives: [],
        active: true,
      })
      mentee.save()
    } else {
      return res.status(403).send({ error: "mentor already has an active relationship with user!" })
    }

    res.status(201).send("mentor added succesfully!")
  } catch (error) {
    return res.status(500).send({ error })
  }
}

// PUT
const putSkillsToTeach = (req, res) => {
  console.log(req.body.null)
  const _id = req.params.userId
  User.findOne({ _id })
    .then((user) => {
      user.skillsToTeach = req.body.null
      user.save()
      res.status(201).send(user.skillsToTeach)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({ error })
    })
}

const putSkillsToLearn = (req, res) => {
  console.log(req.body.null)
  const _id = req.params.userId
  User.findOne({ _id })
    .then((user) => {
      user.skillsToLearn = req.body.null
      user.save()
      res.status(201).send(user.skillsToLearn)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({ error })
    })
}

// /:userId/mentees/:menteeId/objectives/add
const postObjective = async (req, res) => {
  const { userId, menteeId } = req.params
  const objective = await Objective.create(req.body) // {name:"estudiar react", isCompleted: false}
  User.findOne({ _id: userId })
    .then((user) => {
      const idx = user.mentees.findIndex((e) => e._id.toString() === menteeId) // busca el indice donde esta el mentee con id "menteeId"
      if (idx === -1)
        res.status(403).send({
          error: `User does not have the mentee with id ${menteeId}, please add the mentee before adding an objective`,
        })
      user.mentees[idx].objectives.push(objective) // {name: "nombre del objetivo", isCompleted: false}
      user.save()
      res.status(200).send(user.mentees[idx].objectives)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({ error })
    })
}

// TODO no cambia de true a false
// router.patch("/:userId/mentors/:mentorId/objectives/:objectiveId/changeStatus")
const patchObjectiveStatus = async (req, res) => {
  const { userId, objectiveId, mentorId } = req.params

  try {
    const user = await User.findOne({ _id: userId })
    const idx = user.mentors.findIndex((e) => e._id.toString() === mentorId)
    console.log(idx)
    const { objectives } = user.mentors[idx]

    for (let i = 0; i < objectives.length; i++) {
      if (objectives[i]._id.toString() === objectiveId) {
        console.log("OBJECTIVES", objectives[i]._id.toString())
        console.log("BEFORE", objectives)
        user.mentors[idx].objectives[i].isCompleted = !user.mentors[idx].objectives[i].isCompleted
        console.log("AFTER", objectives)
        return user.save().then((data) => res.status(200).send(data.mentors[idx].objectives))
      }
    }
    return res.status(403).send({ error: "No objective by that id found" })
  } catch (error) {
    return res.status(500).send({ error })
  }
}

// const patchObjectiveStatusDos = (req, res) => {
//   // findOneAndUpdate
//   // User.findOneAndUpdate(
//   //   { 'mentors': "Jon Snow" },
//   //   { title: "King in the North" },
//   //   // If `new` isn't true, `findOneAndUpdate()` will return the
//   //   // document as it was _before_ it was updated.
//   //   { new: true }
//   // ).then((objective) => res.status(200).send(objective))

//   User.findOneAndUpdate({ "_id": { $in: teamIds } })
//   // Aggregate
//   // User.aggregate([

//   // ])
// }

// const patchObjectiveStatusTres = async (req, res) => {
//   const objective = await User.findOne({ _id: req.body.id }).select("-__v").lean()
//   const skillsToLearnArr = selectedUser.skillsToLearn.map((e) => e._id)
//   const users = await User.aggregate([
//     { $unwind: "$skillsToTeach" },
//     { $match: { "skillsToTeach._id": { $in: skillsToLearnArr } } },
//     {
//       $group: {
//         _id: "$_id",
//         firstName: { $first: "$firstName" },
//         lastName: { $first: "$lastName" },
//         country: { $first: "$country" },
//         skillsToTeach: { $push: { _id: "$skillsToTeach._id", name: "$skillsToTeach.name" } },
//         count: { $sum: 1 },
//       },
//     },
//     { $sort: { count: 1 } },
//   ])
//   res.send(users)
// }

module.exports = {
  getUsers,
  getUser,
  matchMentors,
  uploadAvatar,
  postUserMentor,
  postUserMentee,
  putSkillsToLearn,
  putSkillsToTeach,
  postObjective,
  patchObjectiveStatus,
}

/* ruta setear objetivo mentor/mentee
ruta setear reunion mentor/mentee
ruta setear notificacion mentor/mentee
ruta setear notificacion "leido" true
*/

/*
  // const _id = req.params.userId
  // let skillsToLearnArr = []//va a contener los skills a matchear del usuario seleccionado.
  // const selectedUser = await User.findOne({_id}).select('-__v').lean()

  // const users = await User.find({}).select('-__v').lean()
  
  // selectedUser.skills.forEach(e => skillsToLearnArr.push(e._id.toString()))

  //itera sobre el array de users y pushea a un nuevo array resultado los usuarios que cumplan la condición de búsqueda
  // let user, skillToLearnId, userSkillId, aux = false, result = [];
  // for (let i = 0; i < users.length; i++) {
  //   user = users[i]

  //   for (let j = 0; j < user.skills.length; j++) {
  //     userSkillId = user.skills[j]._id.toString()

  //     for (let k = 0; k < skillsToLearnArr.length; k++) {
  //       skillToLearnId = skillsToLearnArr[k]

  //       let condition = userSkillId === skillToLearnId

  //       //conditions filters
  //       if (req.query.country) condition = condition && user.country === req.query.country
  //       if (req.query.type) condition = condition && user.type === req.query.type

  //       //construction of send
  //       if (condition) {
  //         result.push(users[i]);
  //         aux = true
  //         break;
  //       }
  //     }
  //     if (aux) {
  //       aux = false
  //       break;
  //     }
  //   }
  // }


*/
