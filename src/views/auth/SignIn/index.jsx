import React from 'react'
import BiofuelLogo from '../../../assets/images/biofuel-logo.jpeg'
import SignInForm from './SignInForm'
const SignIn = () => {
  return (
    <div>
        <div className='w-full h-full'>
            <div className='flex flex-row'>
                <div className='flex flex-col w-[500px] h-[703px] bg-white justify-center items-center'>
                    <img src={BiofuelLogo} alt="BiofuelLogo" className='w-[300px] h-[300px] ml-[30px]' />
                    <span className='text-[25px] font-bold mt-[20px] text-green-500'>Welcome To Eco-Drive</span>
                </div>

                <SignInForm/>
            </div>
        </div>
    </div>
  )
}

export default SignIn