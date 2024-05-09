const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn,validateEmployee } = require("../middleware.js");
const employeeController = require("../controller/employee");
const multer = require("multer");


// for image upload ....
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


// search and all employee .................
router.get("/list", wrapAsync(employeeController.renderAll));

// new employee add..................
router.route("/new").get(isLoggedIn, employeeController.renderNewForm)
    .post(isLoggedIn, upload.single('employee[image]'),validateEmployee, wrapAsync(employeeController.createEmployee));

// view employee.....................
router.get("/:id/show", employeeController.employeeList);

//Edit employee.......................
router.route("/:id/edit").get(isLoggedIn, employeeController.editForm)
    .put(isLoggedIn, wrapAsync(employeeController.updateEmployee));

//Delete employee......................
router.delete("/:id", isLoggedIn, wrapAsync(employeeController.destroyEmployee));
module.exports = router;