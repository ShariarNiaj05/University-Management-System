import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TStudent,
  TLocalGuardian,
  TUserName,
  // StudentMethods,
  StudentModel,
} from './students.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is Required'],
    trim: true,
    maxlength: 10,
    validate: {
      // custom validator
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: { type: String || undefined, trim: true, required: false },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is Required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, "Father's Name is Required"],
  },
  fatherOccupation: { type: String, trim: true, required: false },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, "Father's No is Required"],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, "Mother's no is Required"],
  },
  motherOccupation: { type: String, trim: true, required: false },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, "Mother's No is Required"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, "Local Guardian's Name is Required"],
  },
  occupation: { type: String, trim: true, required: false },
  contactNo: {
    type: String,
    trim: true,
    required: [true, "Local Guardian's Contact no is Required"],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    //StudentMethods>({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: [true, 'Password is Required'] },
    name: {
      type: userNameSchema,
      required: [true, 'Name is Required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: `{VALUE} is not supported`,
      },
      required: [true, 'Gender is Required'],
    },
    dateOfBirth: {
      type: String,
      trim: true,
      required: [true, 'DOB is Required'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is Required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not in email format',
      },
    },
    contactNumber: {
      type: String,
      trim: true,
      required: [true, 'Contact No is Required'],
    },
    emergencyContactNumber: {
      type: String,
      trim: true,
      required: [true, 'Emergency No is Required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      trim: true,
      required: [true, 'Present address is Required'],
    },
    permanentAddress: {
      type: String,
      trim: true,
      required: [true, 'Permanent is Required'],
    },
    guardian: {
      type: guardianSchema,
      trim: true,
      required: [true, 'Guardian is Required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      trim: true,
      required: [true, 'Local Guardian is Required'],
    },
    profileImage: { type: String || undefined, required: false },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
      // required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

studentSchema.virtual('fullName').get(function () {
  return this.name.firstName + this.name.middleName + this.name.lastName;
});

// pre save middleware / hook
studentSchema.pre('save', async function (next) {
  // console.log(this.password, 'Pre hook: we will save the data');
  // hashing password and save to DB
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// post save middleware / hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  // console.log(this, 'post Hook: after save data');
  next();
});

// find operation
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// aggregate operation
studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// single find operation
studentSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// creating a custom instance method

/* studentSchema.methods.isUserExits = async function (id: string) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
}; */

const Student = model<TStudent, StudentModel>('Student', studentSchema);

export default Student;
