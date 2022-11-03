const express = require("express");
const router = express.Router();
const { Location, Trip } = require("../../models")


router.get("/", (req, res) => {
    Trip.findAll()
        .then((allTrips) => {
            res.json(allTrips);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err: err });
        });
});
// router.get("/", async (req, res) => {
//   try {
//     const allTrips = await Trip.findAll();
//     res.json(allTrips);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ err: err });
//   }

// });

router.get("/:id", (req, res) => {
    Trip.findByPk(req.params.id, {
        include: [{
            model: Location,
            attributes: ["username"],
            model: Traveller,
            attributes: ["username"]
        }]
    })
        .then((oneTrip) => {
            res.json(oneTrip);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err: err });
        });
});

router.post("/", (req, res) => {
    console.log(req.body);
    Trip.create({
        trip_budget: req.body.trip_budget,
        traveller_amount: req.body.traveller_amount,
        traveller_id: req.body.traveller_id,
        location_id: req.body.location_id
    })
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err: err });
        });
});

router.put("/:id", (req, res) => {
    Trip.update(
        {
            trip_budget: req.body.trip_budget,
            traveller_amount: req.body.traveller_amount,
            traveller_id: req.body.traveller_id,
            location_id: req.body.location_id
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((updatedTrip) => {
            if (updatedTrip[0] === 0) {
                return res.status(404).json({ msg: "no Trip found!" });
            }
            res.json(updatedTrip);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err: err });
        });
});

router.delete("/:id", (req, res) => {
    Trip.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((delTrip) => {
            if (delTrip === 0) {
                return res.status(404).json({ msg: "no Trip found!" });
            }
            res.json(delTrip);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err: err });
        });
});

module.exports = router;
