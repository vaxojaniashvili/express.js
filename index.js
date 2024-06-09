// import express from "express";
// import { port } from "./constants/common.js";

// const app = express();
// app.use(express.json());

// const users = [
//   { id: 1, name: "nika", email: "nika@gmail.com" },
//   { id: 2, name: "saba", email: "saba@gmail.com" },
//   { id: 3, name: "david", email: "david@gmail.com" },
// ];

// app.get("/api/users", (req, res) => {
//   if (!users | (users.length === 0)) {
//     return res
//       .status(404)
//       .json({ message: "user not found", success: false, data: null });
//   } else {
//     res.json({ success: true, data: users });
//   }
// });

// app.get("/api/users/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const user = users.find((i) => i.id === userId);
//   if (!user) {
//     return res
//       .status(404)
//       .json({ message: "user not found", success: false, data: null });
//   } else {
//     res.json({ success: true, data: user });
//   }
// });

// app.post("/api/auth/signup", (req, res) => {
//   const newUser = req.body;
//   const id = users.length + 1;
//   const newObjectUsers = { id, ...newUser };
//   users.push(newObjectUsers);
//   if (!users) {
//     return res
//       .status(404)
//       .json({ message: "user not found", success: false, data: null });
//   } else {
//     res.json({ success: true, data: users });
//   }
// });

// app.put("/api/users/update", (req, res) => {
//   const updatedUser = req.body;
//   const userId = updatedUser.id;
//   const indexUser = users.findIndex((u) => u.id === userId);
//   if (!userId) {
//     return res.status(404).json({ message: "error", data: null });
//   } else {
//     users[indexUser] = updatedUser;
//     res.json({ success: true, data: users });
//   }
// });

// app.listen(port, () => {
//   console.log(`App running port ${port}`);
// });

import express from "express";
import { port } from "./constants/common.js";
import url from "url";
import querystring from "querystring";

const app = express();

app.get("/api/users", (req, res) => {
  const parsedUrl = url.parse(req.url);
  const parsedQuery = querystring.parse(parsedUrl.query);
  const price = parseInt(parsedQuery.price);
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .json({ success: false, message: "user not found", data: null });
      } else {
        const filteredData = data.filter((item) => item.price < price);
        res.json({ success: true, data: filteredData });
      }
    });
});

app.listen(port, () => {
  console.log(`App running port ${port}`);
});
