const express = require("express");
const router = express.Router();
const { Location,Trip} = require("../../models")


router.get("/", (req, res) => {
  Location.findAll({
    attributes:["location_name"],
    include:({
      include:[Trip]
  })
  })
    .then((allLocations) => {
      res.json(allLocations);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});
// router.get("/", async (req, res) => {
//   try {
//     const allLocations = await Location.findAll();
//     res.json(allLocations);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ err: err });
//   }

// });

router.get("/:id", (req, res) => {
  Location.findByPk(req.params.id)
    .then((oneLocation) => {
      res.json(oneLocation);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  Location.create({
    location_name: req.body.name
  })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

router.delete("/:id", (req, res) => {
  Location.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delLocation) => {
      if (delLocation === 0) {
        return res.status(404).json({ msg: "no Location found!" });
      }
      res.json(delLocation);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

module.exports = router;
