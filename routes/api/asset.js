const express = require("express");
const router = express.Router();

// Load Asset model
const Asset = require("../../models/Asset");

// @route GET api/assets/test
// @description tests Assets route
// @access Public
router.get("/test", (req, res) => res.send("Asset route testing!"));

// @route GET api/assets
// @description Get all Assets
// @access Public
router.get("/", (req, res) => {
  Asset.find()
    .then((assets) => res.json(assets))
    .catch((err) => res.status(404).json({ noAssetsfound: "No Assets found" }));
});

// @route GET api/assets/:id
// @description Get single Asset by id
// @access Public
router.get("/:id", (req, res) => {
  Asset.findById(req.params.id)
    .then((asset) => res.json(asset))
    .catch((err) => res.status(404).json({ noAssetfound: "No Asset found" }));
});

// @route GET api/assets
// @description add/save Asset
// @access Public
router.post("/", (req, res) => {
  Asset.create(req.body)
    .then((asset) => res.json({ msg: "Asset added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this Asset" })
    );
});

// @route GET api/assets/:id
// @description Update Asset
// @access Public
router.put("/:id", (req, res) => {
  Asset.findByIdAndUpdate(req.params.id, req.body)
    .then((asset) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/assets/:id
// @description Delete Asset by id
// @access Public
router.delete("/:id", (req, res) => {
  Asset.findByIdAndRemove(req.params.id, req.body)
    .then((asset) => res.json({ mgs: "Asset entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a Asset" }));
});

module.exports = router;
