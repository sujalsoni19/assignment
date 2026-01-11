import asyncHandler from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import Apierror from "../utils/Apierror.js";
import Apiresponse from "../utils/Apiresponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new Apierror(400, " All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Apierror(400, "Invalid Credentials");
  }

  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new Apierror(400, "Avatar file is required");
  }

  const avatar = avatarLocalPath.replace("public", "");

  if (!avatar) {
    throw new Apierror(400, "Avatar upload failed");
  }

  const user = await User.create({
    name,
    avatar,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new Apierror(500, "something went wrong while registering a user");
  }

  return res
    .status(201)
    .json(new Apiresponse(200, createdUser, "user is registered successfully"));
});


export { registerUser }
