import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum RiskTolerance {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: false, default: null })
  dob?: Date;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  auth_verification_code?: string;

  @Prop({ required: false })
  auth_verif_code_expires?: Date;

  @Prop({ default: false })
  is_email_verified?: boolean;

  @Prop({ required: false, default: null })
  income?: number;

  @Prop({ required: false, enum: Object.values(RiskTolerance), default: null })
  risk_tolerance?: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: (doc, user) => {
    delete user.password;

    if (!user.store) {
      delete user.store;
    }

    return user;
  },
});

export { UserSchema };
