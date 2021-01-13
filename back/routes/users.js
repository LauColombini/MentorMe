const express = require("express")

const router = express.Router()
const {
  getUsers,
  getUser,
  matchMentors,
  uploadAvatar,
  postUserMentor,
  postUserMentee,
  putSkillsToTeach,
  putSkillsToLearn,
  postObjective,
  patchObjectiveStatus,
} = require("../controllers/users")
const { auth } = require("../middleware/auth")
const multer = require("../middleware/multer-config")

// USER MENTEES
router.post("/:userId/mentees/:menteeId/add", postUserMentee)
router.post("/:userId/mentees/:menteeId/objectives/add", postObjective)
// router.get("/:userId/mentees/:menteeId/objectives", getMenteeObjectives)
// router.get("/:userId/mentees/:menteeId", getMenteeById)
// router.get("/:userId/mentees/", getMentees)

// USER MENTORS
router.get("/:userId/mentors/match", matchMentors) // __EN PROCESO
router.patch("/:userId/mentors/:mentorId/objectives/:objectiveId/changeStatus", patchObjectiveStatus)
// router.put("/:userId/mentors/:mentorId/objectives/:objectiveId/edit", putObjective)
// router.get("/:userId/mentors/:mentorId/objectives", getUserMentorObjectives)
// router.get("/:userId/mentors/:mentorId", getUserMentorById)
router.post("/:userId/mentors/:mentorId/add", postUserMentor) // __LISTA
// router.get("/:userId/mentors", getUserMentors)

// USER
router.post("/:userId/uploadAvatar", multer, uploadAvatar)
router.put("/:userId/putSkillsToTeach", putSkillsToTeach)
router.put("/:userId/putSkillsToLearn", putSkillsToLearn)
router.get("/:userId", getUser)
router.get("/", getUsers)

module.exports = router

router.get("/test", (req, res) => {
  // ruta para testear cositas
})

/*
/* fetch all users *
GET /users

/* fetch specific user *
GET /users/:userId

/* create new user *
POST /users

/* edit specific user
PUT /users/:userId

delete specific user
DELETE /users/:userId

convenciones de rutas
https://restfulapi.net/resource-naming/
*/
