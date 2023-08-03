// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();
// const PORT = 3000;

// app.use(express.json());
// app.use(cors());

// mongoose
//   .connect("mongodb://127.0.0.1:27017/blogDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await db.collection("users").findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ error: "Invalid password" });
//     }

//     const token = jwt.sign({ userId: user._id }, "secret-key");
//     res.json({ token });
//   } catch (error) {
//     console.error("Error in login:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.post("/signup", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the email is already registered
//     const existingUser = await db.collection("users").findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ error: "User already exists" });
//     }

//     // Hash the password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Store the user in the database
//     const newUser = { email, password: hashedPassword };
//     await db.collection("users").insertOne(newUser);

//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     console.error("Error in signup:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.get("/protected", (req, res) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, "secret-key");

//     res.json({ message: "Protected route accessed", user: decoded.userId });
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     res.status(401).json({ error: "Unauthorized" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
