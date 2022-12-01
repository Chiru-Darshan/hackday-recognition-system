
const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const getGoals = asyncHandler(async (req, res)=>{
    const goals = await Goal.find()

    res.status(200).json(goals)
})

const setGoals = asyncHandler (async (req, res)=>{

    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    let goal = await Goal.create({
        text: req.body.text
    })

    console.log(req.body)
    res.status(201).json(goal)
  

}
)

const updateGoals = asyncHandler(async (req, res)=>{

    const goal = Goal.findById(req.params.id)
    if(!goal){
        throw new Error('Goal does not exist')
    }
    const updatedGoal =await Goal.findByIdAndUpdate(req.params.id, {
        text: req.body.text
    }, { new : true})

    console.log(updateGoals)
    res.status(200).json(updatedGoal)
})

const deleteGoals = asyncHandler (async(req, res)=>{
    const goal = Goal.findById(req.params.id)
    if(!goal){
        throw new Error('Goal does not exist')
    }
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id, req.body.text)
    res.status(200).json(deletedGoal)
    }
)


module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}