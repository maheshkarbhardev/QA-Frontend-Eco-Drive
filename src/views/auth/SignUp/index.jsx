import React from 'react'
import BiofuelLogo from '../../../assets/images/biofuel-logo.jpeg'
import SignUpForm from './SignUpForm'
const SignUp = () => {
  return (
    <div>
      <div className='w-full h-full'>
          <div className='flex flex-row'>
              <div className='flex flex-col justify-center items-center w-[500px] h-[703px] bg-white'>
                  <img src={BiofuelLogo} alt="BiofuelLogo" className='w-[300px] ml-[30px] h-[300px] '/>
                  <span className='text-[25px] font-bold mt-[20px] text-green-500'>Welcome To Eco-Drive</span>
              </div>

              <SignUpForm disableSubmit={false}/>
              
          </div>
      </div>
    </div>
  )
}

export default SignUp