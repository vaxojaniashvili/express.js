import { Router } from "express";

const router = Router();

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", date: "" },
];

router.get("/api/users", (req, res) => {
  if (!users | (users.length < 1)) {
    res
      .status(404)
      .send({ success: false, message: "Users not found", data: null });
  } else {
    res.send({ success: true, data: users });
  }
});

router.get("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const findUser = users.find((user) => user.id === parseInt(id));
  if (!findUser) {
    res
      .status(404)
      .send({ success: false, message: "User not found", data: null });
  } else {
    res.status(200).send({ success: true, data: findUser });
  }
});

router.post("/api/users", (req, res) => {
  const { body } = req;
  const newUserObject = body;
  const id = parseInt(users.length + 1);
  if (typeof id === NaN) {
    res
      .status(400)
      .send({ success: false, message: "Number type must be number" });
  } else {
    const userPostTime = new Date().toLocaleString();
    const newUser = { id, ...newUserObject, userPostTime };
    if (!newUser) {
      res
        .status(400)
        .send({ success: false, message: "User not found", data: null });
    } else {
      users.push(newUser);
      res.status(200).send({ success: true, data: users });
    }
  }
});

router.put("/api/users", (req, res) => {
  const { body } = req;
  const { id } = body;
  const findUserIndex = users.findIndex((user) => user.id === parseInt(id));
  if (id === NaN) {
    res
      .status(400)
      .send({ success: false, message: "Bed request", data: null });
  } else if (findUserIndex === -1) {
    res
      .status(404)
      .send({ success: false, message: "User not found", data: null });
  } else {
    const updatedUserTime = new Date().toLocaleString();
    const updatedUser = { id, ...body, updatedUserTime };
    users[findUserIndex] = updatedUser;
    res.status(200).send({ success: true, data: users });
  }
});

router.patch("/api/users", (req, res) => {
  const { body } = req;
  const { id } = body;
  const findUser = users.findIndex((user) => user.id === parseInt(id));
  if (findUser === -1) {
    res
      .status(400)
      .send({ success: false, message: "User not found", data: null });
  } else {
    users[findUser] = { ...users[findUser], ...body };
    res.status(200).send({ success: true, data: users });
  }
});

router.delete("/api/users", (req, res) => {
  const { body } = req;
  const { id } = body;
  const findUser = users.findIndex((user) => user.id === parseInt(id));
  if (findUser === -1) {
    res.status(200).send({ success: false, message: "User not found" });
  } else {
    users.splice(findUser, 1);
    res.status(200).send({
      success: true,
      message: "user successfully deleted",
      data: users,
    });
  }
});

export { router };
