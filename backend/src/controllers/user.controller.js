import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import Apierror from "../utils/Apierror.js";
import Apiresponse from "../utils/Apiresponse.js";

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Apierror(500, "something went wrong while generating tokens");
  }
};

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

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new Apierror(400, " All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Apierror(400, "Invalid Credentials");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new Apierror(400, "Invalid Credentials");
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new Apiresponse(
        200,
        {
          user: loggedInUser,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new Apiresponse(200, {}, "User logged out"));
});

const changeCurrentPassword = asyncHandler(async(req,res) => {

  const { oldpassword, newpassword} = req.body;

  if (
    [oldpassword, newpassword].some((field) => field?.trim() === "")
  ) {
    throw new Apierror(400, "All fields are required");
  }

  const user = await User.findById(req.user?._id);

  const isMatch = await user.isPasswordCorrect(oldpassword);

  if (!isMatch) {
    throw new Apierror(404, "Invalid old password");
  }

  user.password = newpassword;

  await user.save({ validateBeforeSave: false });

  return res
  .status(200)
  .json(new Apiresponse(200,{}, "password changed successfully"))

})

const getUserInfo = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new Apiresponse(200, req.user, "current user fetched successfully "));
});

export { registerUser, loginUser, logoutUser, getUserInfo, changeCurrentPassword };
