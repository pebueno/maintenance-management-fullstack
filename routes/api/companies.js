const express = require("express");
const router = express.Router();

// Load Company model
const Company = require("../../models/Company");

// @route GET api/companies/test
// @description tests Companies route
// @access Public
router.get("/test", (req, res) => res.send("Company route testing!"));

// @route GET api/companies
// @description Get all Companies
// @access Public
router.get("/", (req, res) => {
  Company.find()
    .then((companies) => res.json(companies))
    .catch((err) =>
      res.status(404).json({ noCompaniesfound: "No Companies found" })
    );
});

// @route GET api/companies/:id
// @description Get single Company by id
// @access Public
router.get("/:id", (req, res) => {
  Company.findById(req.params.id)
    .then((company) => res.json(company))
    .catch((err) =>
      res.status(404).json({ noCompanyfound: "No Company found" })
    );
});

// @route GET api/companies
// @description add/save Company
// @access Public
router.post("/", (req, res) => {
  Company.create(req.body)
    .then((company) => res.json({ msg: "Company added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this Company" })
    );
});

// @route GET api/companies/:id
// @description Update Company
// @access Public
router.put("/:id", (req, res) => {
  Company.findByIdAndUpdate(req.params.id, req.body)
    .then((company) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/companies/:id
// @description Delete Company by id
// @access Public
router.delete("/:id", (req, res) => {
  Company.findByIdAndRemove(req.params.id, req.body)
    .then((company) => res.json({ mgs: "Company entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a Company" }));
});

module.exports = router;
