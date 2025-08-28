const otpTemplate = (otp) => `
<div style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    padding: 40px 20px;
    margin: 0;
    min-height: 100vh;
">
    <div style="
        max-width: 600px;
        margin: 0 auto;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    ">
        <!-- Header -->
        <div style="
            background: rgba(255,255,255,0.1);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255,255,255,0.2);
        ">
            <h1 style="
                color: #ffffff;
                margin: 0;
                font-size: 36px;
                font-weight: 700;
                letter-spacing: -0.5px;
            ">DooDot</h1>
            <p style="
                color: rgba(255,255,255,0.9);
                margin: 8px 0 0;
                font-size: 16px;
                font-weight: 400;
            ">Verification Required</p>
        </div>
        
        <!-- Content -->
        <div style="
            padding: 50px 40px;
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(10px);
        ">
            <h2 style="
                color: #2d3748;
                margin: 0 0 20px;
                font-size: 28px;
                font-weight: 600;
                text-align: center;
                line-height: 1.3;
            ">Almost there!</h2>
            
            <p style="
                color: #4a5568;
                font-size: 18px;
                line-height: 1.6;
                margin: 0 0 35px;
                text-align: center;
            ">We've received your registration request. Please use the verification code below to complete your account setup:</p>
            
            <!-- OTP Box -->
            <div style="
                background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
                border: 3px solid #e2e8f0;
                border-radius: 16px;
                padding: 30px;
                text-align: center;
                margin: 35px 0;
                position: relative;
            ">
                <p style="
                    color: #718096;
                    font-size: 14px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin: 0 0 15px;
                ">Your Verification Code</p>
                
                <div style="
                    font-size: 42px;
                    font-weight: 900;
                    color: #667eea;
                    letter-spacing: 8px;
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin: 10px 0;
                ">${otp}</div>
                
                <div style="
                    position: absolute;
                    top: -3px;
                    left: -3px;
                    right: -3px;
                    bottom: -3px;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border-radius: 16px;
                    z-index: -1;
                    opacity: 0.1;
                "></div>
            </div>
            
            <!-- Warning Box -->
            <div style="
                background: linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%);
                border-left: 4px solid #f56565;
                border-radius: 8px;
                padding: 20px 25px;
                margin: 35px 0;
            ">
                <p style="
                    color: #c53030;
                    font-size: 15px;
                    font-weight: 600;
                    margin: 0 0 8px;
                ">Important Security Notice</p>
                <p style="
                    color: #742a2a;
                    font-size: 14px;
                    margin: 0;
                    line-height: 1.5;
                ">This code expires in <strong>5 minutes</strong> and should never be shared with anyone. Calf will never ask for your OTP via phone or email.</p>
            </div>
            
            <hr style="
                border: none;
                height: 1px;
                background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
                margin: 40px 0;
            ">
            
            <p style="
                color: #a0aec0;
                font-size: 14px;
                text-align: center;
                line-height: 1.6;
                margin: 0;
            ">If you didn't request this verification, please ignore this email or contact our support team.</p>
        </div>
        
        <!-- Footer -->
        <div style="
            background: rgba(255,255,255,0.9);
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid rgba(255,255,255,0.3);
            backdrop-filter: blur(10px);
        ">
            <p style="
                color: #718096;
                font-size: 12px;
                margin: 0 0 10px;
                font-weight: 500;
            ">© ${new Date().getFullYear()} DooDot. All rights reserved.</p>
            <p style="
                color: #a0aec0;
                font-size: 11px;
                margin: 0;
            ">This is an automated message. Please do not reply to this email.</p>
        </div>
    </div>
</div>
`;

module.exports = otpTemplate;
