const express = require("express");
const jobController = require("../controllers/job");
const router = express.Router();

router.get("/",jobController.getAll);
router.get("/:id/",jobController.getById);
router.post("/",jobController.create);
router.put("/:id/",jobController.update);
router.delete("/:id",jobController.delete);


module.exports = router;