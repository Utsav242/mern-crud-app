import User from "../modal/userModal.js";

// for create user
export const create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const { email } = newUser;
    const UserExists = await User.findOne({ email });
    if (UserExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const savedData = await newUser.save();
    // res.status(201).json(savedData);
      res.status(201).json({message: "User created successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// for get all users

export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// for get user by id

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const UserExists = await User.findById(id);
    if (!UserExists) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(UserExists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// for update user

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const UserExists = await User.findById(id);
    if (!UserExists) {
      return res.status(404).json({ message: "User not found" });
    }
    const updateData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // res.status(200).json(updateData);
    // added message
     res.status(200).json({message: "User Updated successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// for delete user

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const UserExists = await User.findById(id);
    if (!UserExists) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(id);
    // res.status(200).json({ message: "User deleted successfully" });
       res.status(200).json({message: "User deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
