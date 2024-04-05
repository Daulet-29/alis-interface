import bcrypt from "bcrypt";import jwt from "jsonwebtoken";
import UsersModel from "../models/Users.js";

class AuthController {
   static async login(ctx) {
      const { email, password } = ctx.request.body;

      try {
         // Search for the user in the database
         const user = await UsersModel.findOne({ email });

         if (!user) {
            ctx.status = 401; // Unauthorized
            ctx.body = { message: "Invalid email or password" };
            return;
         }

         // Check if the password is correct
         const passwordMatch = await bcrypt.compare(password, user.password);

         if (!passwordMatch) {
            ctx.status = 401; // Unauthorized
            ctx.body = { message: "Invalid email or password" };
            return;
         }

         // Generate JWT token
         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Token expiration time
         });

         ctx.status = 200;
         ctx.body = { message: "Login successful", token };
      } catch (error) {
         ctx.status = 500;
         ctx.body = { message: "Internal server error" };
      }
   }

   static async register(ctx) {
      const { email, password } = ctx.request.body;

      try {
         // Hash the password
         const hashedPassword = await bcrypt.hash(password, 10);

         // Save user to the database
         const user = new UsersModel({ email, password: hashedPassword });
         await user.save();

         ctx.status = 201; // Created
         ctx.body = { message: "Registration successful", email };
      } catch (error) {
         ctx.status = 500;
         ctx.body = { message: "Internal server error" };
      }
   }

   static async logout(ctx) {
      try {
         ctx.status = 200;
         ctx.body = { message: "Logout successful" };
      } catch (error) {
         ctx.status = 500;
         ctx.body = { message: "Internal server error" };
      }
   }
}

export default AuthController;
