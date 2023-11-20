//user controler

import { UserModel } from "./userModel";
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const { SECRET: secret } = process.env;


const saltRounds = 10;

//register user 
export async function registerUser(req: any, res: any) {
  try {
    const { firstName, lastName, email, password, phoneNum, role, department } = req.body;
    // console.log(`${firstName} ${lastName} ${email} ${role} ${department}`)
    if (!email || !password || !firstName || !lastName || !phoneNum || !role || !department) throw new Error("Please complete all fields");
    //encrypt password with bcrypt.js
    const hash = await bcrypt.hash(password, saltRounds);
    const user = new UserModel({ email, password: hash, firstName, lastName, phoneNum, role, department });
    const userDB = await user.save();
    //console.log(userDB)
    res.send({ ok: true, userDB });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export async function login(req: any, res: any) {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Please complete all fields");
    //check if user exist and password is correct

    const userDB = await UserModel.findOne({ email });
    if (!userDB) throw new Error("Email not found");

    const { password: hash } = userDB;
    if (!hash) throw new Error("hash not found");
    //check if hash password is equal to the password that the user entered
    const match: boolean = await bcrypt.compare(password, hash);
    if (!match) throw new Error("password incorrect");
    const cookie = {
      uid: userDB._id,
      role: userDB.role,
    }
    // debugger;
    // console.log(cookie);
    //incript with JWT
    // encode
    const token = jwt.encode(cookie, secret);


    res.cookie("user", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
    res.send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: error.message });
  }
}
export async function LogOutCockie(req: any, res: any) {
  try {
    // delete user coockie
    res.cookie('user', '', { expires: new Date(0) });


    res.send({ ok: true });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export async function getLoggedUserDB(req: any, res: any) {
  try {
    const { user } = req;
    if (!user) throw new Error("user not found");
    res.send({ ok: true, user });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export async function getUsers(req: any, res: any) {
  try {
    const users = await UserModel.find();
    res.send({ ok: true, users });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export async function deleteUser(req: any, res: any) {
  try {
    const { _id } = req.query;

    const user = await UserModel.findByIdAndDelete(_id);
    if (!user) throw new Error("user not found");
    res.send({ ok: true, user });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export async function getUserById(req: any, res: any) {
  try {
    const { _id } = req.query;
    const user = await UserModel.findById(_id);
    if (!user) throw new Error("user not found");
    res.send({ ok: true, user });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}


export async function updateUser(req: any, res: any) {
  try {
    const { firstName, lastName, phoneNum, email, role, _id, department } = req.body;

    // Create an object with the fields you want to update
    const updatedFields: any = {};

    if (firstName) {
      updatedFields.firstName = firstName;
    }
    if (lastName) {
      updatedFields.lastName = lastName;
    }
    if (phoneNum) {
      updatedFields.phoneNum = phoneNum;
    }
    if (email) {
      updatedFields.email = email;
    }
    if (role) {
      updatedFields.role = role;
    }
    if (department) {
      updatedFields.department = department;
    }

    // Use findByIdAndUpdate to update the user by ID
    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      updatedFields,
      { new: true } // This option returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.send({ ok: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}

export async function updatePassword(req: any, res: any) {
  try {
    const { _id, password } = req.body;
    if (!password) throw new Error("Please complete all fields");
    if (!_id) throw new Error("no user id");

    // Create an object with the fields you want to update
    const updatedFields: any = {};

    if (password) {
      const hash = await bcrypt.hash(password, saltRounds);
      updatedFields.password = hash;
    }
    // Use findByIdAndUpdate to update the user by ID
    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      updatedFields,
      { new: true } // This option returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.send({ ok: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}

export async function updatePersonalInfo(req: any, res: any) {
  try {
    const { firstName, lastName, phoneNum, _id } = req.body;
    console.log(firstName, lastName, phoneNum, _id)

    // Create an object with the fields you want to update
    const updatedFields: any = {};

    if (firstName) {
      updatedFields.firstName = firstName;
    }
    if (lastName) {
      updatedFields.lastName = lastName;
    }
    if (phoneNum) {
      updatedFields.phoneNum = phoneNum;
    }

    // Use findByIdAndUpdate to update the user by ID
    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      updatedFields,
      { new: true } // This option returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.send({ ok: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}
export async function getUsersByDepartment(req: any, res: any) {
  try {
    const { department } = req.query;
    if (!department) throw new Error("Department not selected");
    const users = await UserModel.find({ department });
    if (!users) throw new Error("No therapist");
    res.send({ ok: true, users });


  } catch (error) {
    console.error(error);
  }
}