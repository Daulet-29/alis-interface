import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const UsersSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      validate: [
        {
          validator: (value) => validator.isEmail(value),
          msg: "Invalid email",
        },
      ],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      validate: [
        {
          validator: function (value) {
            return value.length >= 6;
          },
          msg: "Password length must be at least 6 characters",
        },
      ],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    refreshToken: String,
    role: {
      type: String,
      enum: ["admin", "student", "teacher"],
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  { timestamps: true }
);

// Method for checking refresh token
UsersSchema.methods.isValidRefreshToken = function (providedRefreshToken) {
  return this.refreshToken === providedRefreshToken;
};

const UsersModel = mongoose.model("Users", UsersSchema);

export default UsersModel;
