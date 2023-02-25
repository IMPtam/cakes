const express = require("express");
const Cakes = require("../models/Cakes");
const router = express.Router({ mergeParams: true });
// const multer = require("multer");
// const uuidv4 = require("uuid");

// const DIR = "/public/";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname.toLowerCase().split(" ").join("-");
//     cb(null, uuidv4() + "-" + fileName);
//   },
// });
// console.log(storage);

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
//     }
//   },
// });

router.get("/", async (req, res) => {
  try {
    const list = await Cakes.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({ message: "На серваке ошибка" });
  }
});

router.patch("/:cakeId", async (req, res) => {
  try {
    const { cakeId } = req.params;

    if (cakeId) {
      const updatedCake = await Cakes.findByIdAndUpdate(cakeId, req.body, {
        new: true,
      });
      res.send(updatedCake);
    } else {
      res.status(401).json({
        message: "Не обновился на сервере!",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "На серваке ошибка patch" });
  }
});

router.post(
  "/",
  // check("email", "Неккоректный емэйл").isEmail(),
  // check("password", "Неправильный пароль").isLength({ min: 6 }),
  async (req, res) => {
    try {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return res.status(400).json({
      //     error: {
      //       message: "INVALID_DATA",
      //       code: 400,
      //       // errors: errors.array(), чтобы увидеть все параметры ошибки!
      //     },
      //   });
      // }
      // const url = req.protocol + "://" + req.get("host");
      // console.log("URL=", url);

      const { name } = req.body;
      const existCake = await Cakes.findOne({ name: name });
      if (existCake) {
        return res.status(400).json({
          error: {
            message: "Такой торт существует",
            code: 400,
          },
        });
      }

      // const adress = url + "/public/" + req.file.filename;

      const newCake = await Cakes.create({
        ...req.body,
      });

      res.status(201).send(newCake);
    } catch (error) {
      res.status(500).json({ message: "На серваке ошибка" });
    }
  }
);

router.delete("/:cakeId", async (req, res) => {
  try {
    const { cakeId } = req.params;
    const removedCake = await Cakes.findById(cakeId);
    await removedCake.remove();
    return res.send(null);
  } catch (error) {
    res.status(500).json({ message: "На серваке ошибка" });
  }
});

module.exports = router;
