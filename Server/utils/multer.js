const multer=require('multer');
const path=require('path')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        const name=Date.now()+file.originalname;
        cb(null,name);
    }
});

const uploads=multer({
    storage:storage,
    limits:{fileSize:5*1024*1024}
});


module.exports=uploads;