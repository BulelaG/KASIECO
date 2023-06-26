const db = require("../models")
const Item = db.item


// CREATE 1 ITEM
exports.create = async (req, res)=>{
    if(!req.body){
            res.status(400).send("Cannot add without info")
            return;   
    }
   


    const item = new Item ({
           item_name: req.body.item_name
         
    })
   
    try{
        item.save()
        .then(item=>{

            console.log(item)
            res.send(item)  
        })
        return
    }catch (err){
        res.status(500).send('Could not create new item')
        console.log(`Some err occured : ${err.message}`)
    }
}     

// GET AN ITEM
exports.getOne = (req, res)=>{
    
    const id = req.params.id
  
    Item.findById(id, { useFindAndModify: false})
           .then(data=>{
            res.send(data)
            console.log(data) })
            .catch((error) => {
             res.status(500).send("Could not find item", error);
             console.log("Could not find item", error);
          });
  }
  

// GET ALL ITEMS 
exports.getAll = (req, res)=>{


       Item.find()
           .then(data=>{
               res.send(data)
               console.log(data)
           })
           .catch(error=>{
            res.status(500).send("Could not find item", error)
            console.log("Could not find item", error)
           })
}


// UPDATE AN ITEM
exports.update = (req, res)=>{
    if(!req.body){
        res.status(400).send("Cannot update item")
        return
    }
    const id = req.params.id

    Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data =>{
        if(!data) {
           res.status(404).send({
             msg: `Cannot update Item with id=${id}. Maybe it was not found`
           })
        } else res.status(201).send({ msg: "Item was updated successfully"})
    })
    .catch(err => {
        res.status(500).send({ msg: `Error updating User with id=${id} ${err}`})
    })
}


// DELETE AN ITEM
exports.deleteOne = (req, res)=>{
    
    const id = req.params.id

    Item.findByIdAndRemove(id, { useFindAndModify: false})
        .then(data =>{
            if(!data) {
               res.status(404).send({
                msg: `Cannot delete Item with id=${id}. Maybe it was not exit/existing`
               })
            } else res.status(201).send({ msg: "Item was deleted successfully"})
        })
        .catch(err => {
            res.status(500).send({ msg: `Error deleting Item with id=${id}, Error:  ${err}`})
        })
}


// CLEAR ALL ITEMS
exports.deleteAll = (req, res)=>{

    Item.deleteMany()
        .then(data=>{
            res.send(data)
            console.log(data)
        })
        .catch(error=>{
            res.status(500).send("Could not delete all items ", error)
            console.log("Could not delete all", error)
        })
}

