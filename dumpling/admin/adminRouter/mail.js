const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: '1162033713@qq.com', // 邮箱账号
        pass: 'auetvoingbbcbaaj' // 邮箱smtp验证码
    }
});
module.exports = {
    sendMail(mail,code){
        //创建邮件内容
        let info = {
            from: '"Fred Foo 👻" <1162033713@qq.com>', // sender address
            to: mail, // list of receivers
            subject: "欢迎登录学生成绩后台管理系统", // Subject line
            // text: "Hello world?", // plain text body
            html: `<div>
                     <h3>欢迎登录,您的验证码为${code}</h3>
                    </div>` // html body
            }
        return new Promise((resolve,reject)=>{

            transporter.sendMail(info, (err, info) => {
                if(err) {
                    reject('发送失败')
                }else{
                    resolve('发送成功')
                }
            })
        })
    }
}
