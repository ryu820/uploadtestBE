const express = require('express')
const multer = require('multer')
var path = require('path');
const { Posts, Likes, Users, Comments } = require("../models")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')  //uploads라는 폴더에 저장할꺼다
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
  }
})
const fileFilter = (req, file, cb) => {
  const typeArray = file.mimetype.split('/');
  const fileType = typeArray[1];

  if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg') {
    req.fileValidationError = null;
    cb(null, true);
  } else {
    req.fileValidationError = "jpg,jpeg,png파일만 업로드 가능합니다.";
    cb(null, false)
  }
}
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
})
const router = express.Router()


//게시글 작성
//localhost:3000/upload POST
router.post('/upload', upload.single('img'), async (req, res) => {
  const { content } = req.body;
  console.log(req.file.destination, req.body);
  const imagefile = req.file.filename
  await Posts.create({
    img: imagefile,
    content,
    likecount: 0
  })
  res.send({ "message": "업로드 완료!" })

})


//게시글 전체 조회
//localhost:3000/upload GET
router.get("/upload",express.static(path.join(__dirname,'uploads')),async (req, res) => {

  const posts = await Posts.findAll({
    raw: true,
    attributes: ["postId", "img","content", "createdAt", "updatedAt"],
    order: [['postId', 'DESC']] //최신순 정렬
  })

  res.status(200).json({ posts })


})





module.exports = router;