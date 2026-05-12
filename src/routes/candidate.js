const express = require("express");

const candidateController = require("../controllers/candidate");

const router = express.Router();

router.get("/",candidateController.getAll);
router.get("/:id",candidateController.getById);

router.post("/:id", candidateController.create);
router.delete("/:id", candidateController.delete);
router.put("/:id", candidateController.update);

module.exports = router;
