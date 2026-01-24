import {prisma} from "../config/prisma.js";
import bcrypt from "bcryptjs";

// Register controller
const register = async (req, res) => {
  const {name , email , password} = req.body;
  
  // Check if user already exists
  const userExits = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if(userExits){
    return res.status(400).json({error: "User already exists"});
  }
  

  // hash the password before saving (omitted for brevity)
  // salt is used to enhance security of the hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password , salt)

  // Create new user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });
  
  res.status(201).json({
    message: "User registered successfully",
    status: "success",
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  })

} 

// login controller 
const login = async (req, res) => {
  const {user, email, password } = req.body;

  // Find user by email
  const userExits = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (!userExits) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  //verify password
  const isPasswordValid = await bcrypt.compare(password, userExits.password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  res.status(200).json({
    message: "Login successful",
    status: "success",
    user: {
      id: userExits.id,
      name: userExits.name,
      email: userExits.email
    }
  });


}

export { register, login };