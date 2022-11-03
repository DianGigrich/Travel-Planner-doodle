const express = require('express');
const router = express.Router();
const {Traveller} = require("../../models")

router.get("/",(req,res)=>{
    Traveller.findAll().then(allTravellers=>{
        res.json(allTravellers)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err:err})
    })
})

router.get("/:id",(req,res)=>{
    Traveller.findByPk(req.params.id).then(oneTraveller=>{
        res.json(oneTraveller)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err:err})
    })
})

router.post("/",(req,res)=>{
    console.log(req.body)
    Traveller.create({
        name:req.body.name,
        email:req.body.email
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err:err})
    })
})

router.post("/login",(req,res)=>{
    Traveller.findOne({
        where:{
           name:req.body.name
        }
    }).then(foundTraveller=>{
        if(!foundTraveller){
            return res.status(401).json({msg:"login failed"})
        }
        foundTraveller.sayHi()
        res.json(foundTraveller)
    }).catch(err=>{
        console.log(err);
        res.json({err});
    })
})

router.delete("/:id", (req, res) => {
    Traveller.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((delTraveller) => {
            if (delTraveller === 0) {
                return res.status(404).json({ msg: "no Traveller found!" });
            }
            res.json(delTraveller);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err: err });
        });
});

module.exports = router;