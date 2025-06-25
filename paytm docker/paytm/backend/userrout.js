const express = require("express");
const router = express.Router();
const {user,account}=require("./mongo") 
const bcrypt = require("bcrypt"); // Import bcrypt for hashing
const z = require("zod");
const jwt = require("jsonwebtoken");
const jwtpassword = "1234"; 
const {authMiddleware}=require("./midd")

const signupshema=z.object({
  username:z.string().email(),
  password:z.string().min(6)
})
router.post("/signup", async (req, res)=> {
  const { username, password } = req.body; // Destructure for cleaner access
  // Validate password using Zod schema
 const oop=signupshema.safeParse(req.body)
 if (!oop.success) {
  return res.status(400).json({
    error: "Password should be at least 6 characters long",
    issues: validation.error.errors, // optional: send Zod issues for debugging
  });
}
  const existingUser =await user.findOne({
    username:req.body.username
})
if (existingUser) {
  return res.status(411).json({
      message: "user already have account"
  })
}
  try {
    
     // Hash the password before saving
     const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10 is a good default

    const userr = await user.create({ username, password:hashedPassword });

    const userId =userr._id;
    ///// ----- Create new account ------
    const acc=await account.create({
      userId,
      balance: 1 + Math.random()* 10000
  })
    // Generate JWT token
    const token =jwt.sign({userId:userId},jwtpassword);
    // Send response
    res.json({
      msg: "User signed up successfully",
      userr,
      token,
      balance:acc.balance
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error in signup ",
      error: error.message,
    });
  }
});





const signinBody = z.object({
  username: z.string().email(),
password: z.string().min(6)
})

router.post("/signin", async (req, res) => {
  const op = signinBody.safeParse(req.body);
  if (!op.success) {
    return res.json({
      message: "Incorrect inputs",
    });
  }

  try {
    const userr = await user.findOne({ username: req.body.username });
    if (!userr) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Compare password
//     req.body.password: is the plain text password user enters at login.
// userr.password: is the hashed password stored in your MongoDB.
// bcrypt.compare(...) checks if the plain password, when hashed, matches the stored one.
    const isPasswordValid = await bcrypt.compare(req.body.password, userr.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    //  Generate JWT if password is correct
    const token = jwt.sign(
      { userId: userr._id },
      jwtpassword
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err: err.message });
  }
});

const updateBody = z.object({
  username:z.string().optional(),
  password: z.string().optional()
});


router.put("/update",authMiddleware, async (req, res) => {
  const parseResult = updateBody.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parseResult.error.issues,
    });
  }

  try {
    // Update the user document, find by userId and use $set to update fields
    await user.updateOne(
      { _id: req.userId },
      { $set: req.body }
    );
    res.json({
        message: "Updated successfully",
   })
    
  } catch (err) {
    res.status(500).json({
      message: "Error while updating information",
      error: err.message,
    });
  }
});



router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await user.find({
       
          username: {
              "$regex": filter
          }
      })

  res.json({
      user: users.map(user => ({
          username: user.username,
          _id: user._id
      }))
  })
})


module.exports = router;
