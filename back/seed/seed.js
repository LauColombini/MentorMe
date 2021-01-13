
const { Skill } = require("../models/skill");
const User = require("../models/user");
const chalk = require("chalk");
const usersObj = require("./usersObj")
const skillsObj = require("./skillsObj")
const bcrypt = require('bcrypt')
require("../config/index");
const log = (...args) => console.log(chalk.yellow(...args));
const _ = require('lodash');


async function seed() {
  await Promise.all([User.deleteMany({}), Skill.deleteMany({})])
  await Promise.all([
    User.insertMany(usersObj).then(() => log("Users generated!")).catch(err => console.log(err)),
    Skill.insertMany(skillsObj).then(() => log("Skills generated!")).catch(err => console.log(err))
  ])
  console.log("users and skills generated")

  // await Skill.findOne({name: "Salesforce"})
  //   .then(data => {
  //     const user = new User({
  //       firstName: "GERVASIO",
  //       lastName: "GONZALEZ",
  //       email: "caca@gmail.com",
  //       password: "1",
  //       country: "JAMAICA",
  //       isAdmin: false,
  //       skills: [data]
  //     });
  //     user.save();
  //   })

  const allUsers = await User.find({})
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].mentors.length) {
      console.log("MENTORSARR BEFORE CLONE: ", allUsers[i].mentors)
      let mentorsArr = _.cloneDeep(allUsers[i].mentors)
      while (mentorsArr.length) {
        const k = mentorsArr.length - 1
        const mentor = await User.findOne({ _id: mentorsArr[k]._id })
        if (mentor != null) {
          if (mentor.hasOwnProperty("mentees")) mentor["mentees"].push(mentorsArr[k])
          else mentor["mentees"] = mentorsArr[k]
          mentor.save()
        }
        mentorsArr.pop()
      }
    }
  }

  for (let i = 0; i < allUsers.length; i++) {
    const hash = await bcrypt.hash(allUsers[i].password, 10)
    allUsers[i].password = hash
    allUsers[i].save()
  }

}
seed()