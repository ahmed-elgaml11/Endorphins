import rateLimit from "express-rate-limit";

export const throttle = rateLimit({
  windowMs: 4 * 1000, 
  max: 3,              
  message: "Too many requests, please try again later.",
});
