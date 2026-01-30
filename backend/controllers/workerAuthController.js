const Worker = require("../models/Worker");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerWorker = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let worker = await Worker.findOne({ email });

    if (worker && worker.password) {
      return res.status(400).json({ message: "Worker already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (worker) {
      worker.password = hashedPassword;
      await worker.save();
    } else {
      worker = await Worker.create({
        name,
        email,
        password: hashedPassword
      });
    }

    res.status(201).json({ message: "Worker registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginWorker = async (req, res) => {
  const { email, password } = req.body;

  try {
    const worker = await Worker.findOne({ email });
    if (!worker || !worker.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, worker.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: worker._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
