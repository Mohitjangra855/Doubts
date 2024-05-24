const express = require("express")
const router = express.Router({ mergeParams: true });
const { validationReview } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync.js");

// controller...
const reviewController = require("../controller/review.js");

// Review Added....
router.post("/", validationReview, wrapAsync(reviewController.addReview));

// Delete Review....
router.delete("/:reviewId", wrapAsync(reviewController.deleteReview))

module.exports = router;