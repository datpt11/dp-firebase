import React, { FC } from 'react';

import Badge from 'components/Badge';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Divider from 'components/Divider';
import Image from 'components/Image/Image';
import Input from 'components/Input';
import LineAwesome from 'components/LineAwesome';
import { Link } from 'react-router-dom';
export interface RegisterPageProps {}

const RegisterPage: FC<RegisterPageProps> = () => {
  return (
    <div>
      <h1 className="text-3xl text-gray-900 mb-4 font-bold">Sign up</h1>
      <div className="mb-3">
        <div className="flex items-center">
          <Button
            block
            size="large"
            icon={
              <div className="w-5 h-5">
                <Image src="https://img.icons8.com/fluent/48/000000/google-logo.png" aspectRatioInPercent={100} />
              </div>
            }
            containerClassName="rounded-full mr-3"
          >
            Sign up with google
          </Button>
          <Button block size="large" icon={<LineAwesome name="facebook" />} containerClassName="rounded-full  bg-facebook text-white">
            Sign up with google
          </Button>
        </div>
      </div>

      <Divider />

      <div className="mb-[15px]">
        <div className="flex items-center">
          <div className="mr-2">
            <Badge containerClassName="mb-[6px]" Icon={<span className="text-quaternary">*</span>}>
              <label htmlFor="firstName">First name</label>
            </Badge>
            <Input idHTML="firstName" placeholder="e.q: Cristiano" prefix={<LineAwesome name="envelope" size={20} />} />
          </div>
          <div>
            <Badge containerClassName="mb-[6px]" Icon={<span className="text-quaternary">*</span>}>
              <label htmlFor="lastName">Last name</label>
            </Badge>
            <Input idHTML="lastName" placeholder="e.q: Ronaldo" prefix={<LineAwesome name="user-secret" size={20} />} />
          </div>
        </div>
      </div>
      <div className="mb-[15px]">
        <Badge containerClassName="mb-[6px]" Icon={<span className="text-quaternary">*</span>}>
          <label htmlFor="lastName">Email</label>
        </Badge>
        <Input idHTML="lastName" placeholder="e.q: Ronaldo" prefix={<LineAwesome name="envelope" size={20} />} />
      </div>
      <div className="mb-[15px]">
        <Badge containerClassName="mb-[6px]" Icon={<span className="text-quaternary">*</span>}>
          <label htmlFor="password">Password</label>
        </Badge>
        <Input.Password idHTML="password" prefix={<LineAwesome name="lock" size={20} />} placeholder="Enter Password" />
      </div>
      <div className="mb-[15px]">
        <Badge containerClassName="mb-[6px]" Icon={<span className="text-quaternary">*</span>}>
          <label htmlFor="password">Confirm Password</label>
        </Badge>
        <Input.Password idHTML="password" prefix={<LineAwesome name="lock" size={20} />} placeholder="Enter Password" />
      </div>
      <div className="mb-[15px]">
        <Checkbox borderColor="white" innerClassName="bg-gray-100">
          I agree to all the{' '}
          <span className="font-bold">
            <Button href="#">Term</Button>, <Button href="#">Privacy Policy</Button>
          </span>
        </Checkbox>
      </div>
      <div className="mb-[15px]">
        <Button block size="large" containerClassName="rounded-full bg-primary text-white">
          Sign up
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-gray-700">Already have an account? </span>
        <Link to="signin" className="font-bold">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
