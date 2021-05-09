import React, { FC } from 'react';

import Badge from 'components/Badge';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Divider from 'components/Divider';
import Image from 'components/Image/Image';
import Input from 'components/Input';
import LineAwesome from 'components/LineAwesome';
import { Link } from 'react-router-dom';

export interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  return (
    <div>
      <h1 className="text-3xl text-gray-900 mb-4 font-bold">Sign in</h1>
      <Button
        block
        size="large"
        icon={
          <div className="w-5 h-5">
            <Image src="https://img.icons8.com/fluent/48/000000/google-logo.png" aspectRatioInPercent={100} />
          </div>
        }
        containerClassName="rounded-full mb-5"
      >
        Sign in with google
      </Button>
      <Button block size="large" icon={<LineAwesome name="facebook" />} containerClassName="rounded-full mb-6  bg-facebook text-white">
        Sign in with facebook
      </Button>

      <Divider />

      <div className="mb-[15px]">
        <Badge containerClassName="mb-[6px]" Icon={<span className="text-quaternary">*</span>}>
          <label htmlFor="email">Email</label>
        </Badge>
        <Input idHTML="email" placeholder="mail@gmail.com" prefix={<LineAwesome name="envelope" size={20} />} />
      </div>
      <div className="mb-[15px]">
        <Badge containerClassName="mb-[6px]" Icon={<span className="text-quaternary">*</span>}>
          <label htmlFor="password">Password</label>
        </Badge>
        <Input.Password idHTML="password" prefix={<LineAwesome name="lock" size={20} />} placeholder="Enter Password" />
      </div>
      <div className="mb-[15px]">
        <div className="flex justify-between items-center">
          <Checkbox borderColor="white" innerClassName="bg-gray-100">
            Remember me
          </Checkbox>
          <Button href="forgot-password">Forgot Password?</Button>
        </div>
      </div>
      <div className="mb-[15px]">
        <Button block size="large" containerClassName="rounded-full bg-primary text-white">
          Sign in
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-gray-700">Dont have an account? </span>
        <Link to="signup" className="font-bold">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
