const express = require("express");
const router = express.Router();

// Load Unit model
const Unit = require("../../models/Unit");

// @route GET api/units/test
// @description tests Units route
// @access Public
router.get("/test", (req, res) => res.send("Unit route testing!"));

// @route GET api/units
// @description Get all Units
// @access Public
router.get("/", (req, res) => {
  Unit.find()
    .then((units) => res.json(units))
    .catch((err) => res.status(404).json({ noUnitsfound: "No Units found" }));
});

// @route GET api/units/:id
// @description Get single Unit by id
// @access Public
router.get("/:id", (req, res) => {
  Unit.findById(req.params.id)
    .then((unit) => res.json(unit))
    .catch((err) => res.status(404).json({ noUnitfound: "No Unit found" }));
});

// @route GET api/units
// @description add/save Unit
// @access Public
router.post("/", (req, res) => {
  Unit.create(req.body)
    .then((unit) => res.json({ msg: "Unit added successfully" }))
    .catch((err) => res.status(400).json({ error: "Unable to add this Unit" }));
});

// @route GET api/units/:id
// @description Update Unit
// @access Public
router.put("/:id", (req, res) => {
  Unit.findByIdAndUpdate(req.params.id, req.body)
    .then((unit) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/units/:id
// @description Delete Unit by id
// @access Public
router.delete("/:id", (req, res) => {
  Unit.findByIdAndRemove(req.params.id, req.body)
    .then((unit) => res.json({ mgs: "Unit entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a Unit" }));
});

module.exports = router;
