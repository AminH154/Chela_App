import nodemailer from 'nodemailer';

const transporter =nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:"aminbouallegui0@gmail.com",
        pass: "zloj erwk kxls ffxk",
    },
})
export const sendEmail=async(to, subject, text)=>{
    try{
        const mailOptions={
            from: 'aminbouallegui0@gmail.com',
            to,
            subject,
            text
        }
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfull");
    }catch(error){
        console.error("Error sending email:", error);
    }
}