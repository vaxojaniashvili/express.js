// filter by price

// import express from "express";
// import { port } from "./constants/common.js";
// import url from "url";
// import querystring from "querystring";

// const app = express();

// app.get("/api/users", (req, res) => {
//   const parsedUrl = url.parse(req.url);
//   const parsedQuery = querystring.parse(parsedUrl.query);
//   const price = parseInt(parsedQuery.price);
//   fetch("https://fakestoreapi.com/products")
//     .then((res) => res.json())
//     .then((data) => {
//       if (!data) {
//         res
//           .status(404)
//           .json({ success: false, message: "user not found", data: null });
//       } else {
//         const filteredData = data.filter((item) => item.price < price);
//         res.json({ success: true, data: filteredData });
//       }
//     });
// });

// app.listen(port, () => {
//   console.log(`App running port ${port}`);
// });

import express from "express";
import { port } from "./constants/common.js";

const app = express();
app.use(express.json());

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", date: "" },
];

app.get("/api/users", (req, res) => {
  if (!users | (users.length < 1)) {
    res
      .status(404)
      .send({ success: false, message: "Users not found", data: null });
  } else {
    res.send({ success: true, data: users });
  }
});

app.get("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const findUser = users.find((u) => u.id === parseInt(id));
  if (!findUser) {
    res
      .status(404)
      .send({ success: false, message: "User not found ", data: null });
  } else {
    res.status(200).send({ success: true, data: findUser });
  }
});

app.post("/api/users", (req, res) => {
  const { body } = req;
  const newUserObject = body;
  const id = users.length + 1;
  const date = new Date().toLocaleString();
  const newUser = { id, ...newUserObject, date };
  users.push(newUser);
  if (!users | (users.length < 1)) {
    res.status(400).send("Bad request!!!");
  } else {
    res.status(201).send({ success: true, data: users });
  }
});

app.put("/api/users", (req, res) => {
  const { body } = req;
  const { id } = body;
  const findUserIndex = users.findIndex((user) => user.id === id);
  if (findUserIndex === -1) {
    res.status(400).send("Bad request!!");
  } else {
    const updatedUser = { id, ...body };
    users[findUserIndex] = updatedUser;
    res.status(200).send({ success: true, data: users });
  }
});

app.patch("/api/users", (req, res) => {
  const { body } = req;
  const { id } = body;
  const findIndex = users.findIndex((user) => user.id === parseInt(id));
  if ((findIndex === 1) | isNaN(id)) {
    res.status(400).send("Bad request!!");
  } else {
    users[findIndex] = { ...users[findIndex], ...body };
    res.status(200).send({ success: true, data: users });
  }
});

app.delete("/api/users", (req, res) => {
  const { body } = req;
  const { id } = body;
  const findIndex = users.findIndex((user) => user.id === parseInt(id));
  if (findIndex === -1) {
    res.status(400).send("Bad request!!!");
  } else {
    users.splice(findIndex, 1);
    res.status(200).send({ message: "User is successfully deleted" });
  }
});

app.listen(port, () => {
  console.log(`App running port ${port}`);
});
