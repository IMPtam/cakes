const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateUserData } = require("../utils/helpers");
const tokenService = require("../services/tokenService");
const router = express.Router({ mergeParams: true });
const { check, validationResult } = require("express-validator");

router.post("/signUp", [
  check("email", "Неккоректный емэйл").isEmail(),
  check("password", "Неправильный пароль").isLength({ min: 6 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            // errors: errors.array(), чтобы увидеть все параметры ошибки!
          },
        });
      }

      const { email, password } = req.body;

      const existUser = await User.findOne({ email: email });
      if (existUser) {
        return res.status(400).json({
          error: {
            message: "Такой email существует",
            code: 400,
          },
        });
      }

      const hashPassword = await bcrypt.hash(password, 12);

      // порядок Важен (перезапись)
      const newUser = await User.create({
        ...generateUserData(),
        ...req.body,
        password: hashPassword,
      });

      const tokens = tokenService.generate({
        _id: newUser._id,
      });
      await tokenService.save(newUser._id, tokens.refreshToken);

      res.status(201).send({
        ...tokens,
        userId: newUser._id,
      });
    } catch (error) {
      res.status(500).json({ message: "На серваке ошибка" });
    }
  },
]);
router.post("/signInWithPassword", [
  check("email", "Емэйл неккоректный").isEmail(),
  check("password", "Пароль пустой").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "Неправильные данные",
            code: 400,
          },
        });
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email: email });

      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: "EMAIL_NOT_FOUND",
            code: 400,
          },
        });
      }

      const isPasswordEqul = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordEqul) {
        return res.status(400).send({
          error: {
            message: "Password uncorrect",
            code: 400,
          },
        });
      }

      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save(existingUser._id, tokens.refreshToken);

      res.status(200).send({
        ...tokens,
        userId: existingUser._id,
      });
    } catch (error) {
      res.status(500).json({ message: "На серваке ошибка 2" });
    }
  },
]);
router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);

    if (!data || !dbToken || data._id !== dbToken?.user?.toString()) {
      return res.status(401).json({ message: "Не авторизован!" });
    }

    const tokens = await tokenService.generate({
      _id: dbToken.user.toString(),
    });
    await tokenService.save(data._id, tokens.refreshToken);
    res.status(200).send({ ...tokens, userId: data._id });
  } catch (error) {
    res.status(500).json({ message: "На серваке ошибка" });
  }
});

module.exports = router;
