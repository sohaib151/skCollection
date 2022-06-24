import bcrypt from "bcryptjs"
const users=[
    {
        name:'sohaib khan',
        email:'sohaibkhan@gmail.com',
        password:bcrypt.hashSync('12345',10),
        isAdmin:true,
    },
    {
        name:' khan',
        email:'khan@gmail.com',
        password:bcrypt.hashSync('123456',10),
        
    },
    {
        name:'rana',
        email:'rana@gmail.com',
        password:bcrypt.hashSync('123458',10),
        
    },
]

export default users