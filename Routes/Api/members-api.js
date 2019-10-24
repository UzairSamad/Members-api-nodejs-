const express = require("express");
const router = express.Router();
const uuid = require("uuid");

//importing member.js in which we ave all data
const members = require("../../Members/Members");

//  Getting a single Members

router.get("/", (req, res) => {
  res.send(members);
});

//Getting  a single Member

router.get("/:id", (req, res) => {
  //checking if given id exist or not

  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    // matching the ids to render
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(404).json({
      id: `Invalid id ${req.params.id}`,
      msg: " Member not Found"
    });
  }
});

//Creating A new Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };

  if (!newMember.name || !newMember) {
    res.status(400).json({ msg: "Please include a name and email" });
  } else {
    members.push(newMember);
  }
  res.json(members);
});

// updating a member
router.put("/:id", (req, res) => {
  //checking if given id exist or not

  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : memeber.name;
        member.email = updMember.email ? updMember.email : member.email;
        res.json({ msg: "Member Updated", members });
      }
    });
  } else {
    res.status(400).json({ msg: `No Memeber with id of ${req.params.id}` });
  }
});

//Deleting A member
router.delete("/:id", (req, res) => {
  //checking if given id exist or not
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    // matching the ids to render
    res.json({
      msg: "Member Deleted",
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No Memeber with id of ${req.params.id}` });
  }
});

module.exports = router;
