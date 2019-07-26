const Joi = require('joi');
const {Customer} = require('../model/customer_model');
const express = require('express');
const router = express.Router();


router.get('/', async (req,res)=>{
    const customers = await Customer.find();
    res.send(customers);
})

router.post('/', async (req,res)=>{
    const {error} = validataCustomer(req.body);
    console.log(error);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name:req.body.name,
        phone:req.body.phone,
        isGold: req.body.isGold
    });

    try{
        const result = await customer.save();
        res.send(result);
    }catch(error){
        res.send(error.message);
    }

})

router.put('/:id', async (req,res)=>{
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, {$set:{
            name:req.body.name,
            isGold:req.body.isGold,
            phone:req.body.phone
        }}, {new: true});
        if (!customer){
            console.log(customer);
            return res.status(404).send('Customer has not been found');
        }
        res.send(customer);
    } catch (error) {
        res.send(error.message);
    }
})

router.delete('/:id', async (req,res)=>{
    try {
        const customer = await Customer.findByIdAndRemove(req.params.id);
        if (!customer){
            console.log(customer);
            return res.status(404).send('Customer has not been found');
        }
        res.send(customer);
    } catch (error) {
        res.send(error.message);
    }
})

router.get('/:id', async (req,res)=>{
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer){
            console.log(customer);
            return res.status(404).send('Customer has not been found');
        }
        res.send(customer);
    } catch (error) {
        res.send(error.message);
    }
})


function validataCustomer(customer){
    const schema = {
        name : Joi.string().min(3).required(),
        phone: Joi.string().required(),
        isGold: Joi.bool().required()
    }
    return Joi.validate(customer, schema);
}



module.exports = router;