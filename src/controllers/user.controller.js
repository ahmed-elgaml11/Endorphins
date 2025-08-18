import { getUser, createUser } from "../services/user.service.js"
import { catchAsync } from "../utils/catchAsync.js"
import { AppError } from "../utils/appError.js"



export const signup = catchAsync(async (req, res, next) => {
  const existUser = await getUser(req.body.phone)
  if (existUser) {
    throw new AppError('this phone is already exists, choose another one.', 400)
  }

  const user = await createUser({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    password: req.body.password
  })


  res.status(201).json({
    status: 'success',
    data: {
      message: 'user registered successfully',
      user
    }
  })
})



export const logout = catchAsync(async (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.status(200).json({
      status: 'success',
      message: 'bye!!'
    });
  });
})


export const login = catchAsync(async (req, res, next) => {
  res.json({
    status: 'success',
    data: {
      message: 'Logged in successfully',
      user: req.user,
    }
  });
})