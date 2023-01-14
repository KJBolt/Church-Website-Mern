import React from 'react'

function VerifyEmail() {
  return (
    <div className='verifyEmail'>
        <div className="verify-wrapper">
            <div className="image">
                <img src={require('../assets/email.png')} alt="" />
            </div>
            <h3>Verify your email address</h3>
            <p>We have sent a verification link to the email address you provided. If not received please check email provided and try again</p>
        </div>
        
    </div>
  )
}

export default VerifyEmail