const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const {Task} = require('../models/tasks.model');
const {validateTask} =  require('../validations/validations');

router.get('/', auth, async (req,res)=> {
    const userId = req.user._id;
    const tasks =  await Task.find({
        userId: userId
    });
    res.send(tasks);
});

router.get('/:id', auth, async (req,res)=> {
    const id = req.params.id;
    const userId = req.user._id;
    const task = await Task.find({
        _id: id,
        userId: userId
    });
    if (!task) {
      return res.status(404).send({ 
        message: "Task not Found"
       });
    }
    res.send({ error: 0, message: "Successfully", data: task });
});


router.post('/', auth, async (req,res)=> {
    
    /* validate */
    const { error } = validateTask(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    try {
         /* storage */
        const task = new Task(req.body);
        const result = await task.save();
        res.send({ error: 0, message: "Create Task Successfully"});

    } catch (error) {
        return res.status(500).send({ error: 500, message: error.message });
    }
    

});

router.put('/:id', auth, async (req,res)=> {
    const id = req.params.id;
    const userId = req.user._id;

    const task = await Task.find({
        _id: id,
        userId: userId
    });
    if (!task) {
      return res.status(404).send({ 
        message: "task not Found"
       });
    }

    const { error } = validateTask(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const result = await Task.findOneAndUpdate(
        {
            _id: id,
            userId: userId
        },
          req.body,
          {
            new: true
          }
      );

    if (!result) {
      return res.status(404).send({error: 1, message: "Task not Found" });
    }

    res.send({ error: 0, message: "Update successfully", data: result });
});

router.delete('/:id', auth, async (req,res)=> {
    const id = req.params.id;
    const userId = req.user._id;
    const result  = await Task.deleteOne({
        _id: id,
        userId: userId
    });
    res.send({ error: 0, message: "Delete Task successfully", data: result });
});


module.exports = router;