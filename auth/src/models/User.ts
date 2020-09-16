import mongoose from "mongoose";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret): void {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      }
    }
  }
);

UserSchema.statics.build = (attrs: UserAttrs): mongoose.Document => {
  return new User(attrs);
};
const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export { User };
