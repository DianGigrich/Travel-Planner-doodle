const express = require("express");
const router = express.Router();
const travellersRoutes = require("./travellersController");
const locationsRoutes = require("./locationsController");
const tripsRoutes = require("./tripsController");

router.use('/api/travellers', travellersRoutes);
router.use('/api/locations', locationsRoutes);
router.use('/api/trips', tripsRoutes);

module.exports = router;