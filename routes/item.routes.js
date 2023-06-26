module.exports = itemBridge => {
    const router = require("express").Router();
    const controller = require("../controller/item.controller")

  // User endpoints

    router.post('/add-item', controller.create); // ADD AN ITEM

    router.get('/get-all-items', controller.getAll); // GET ALL ITEMS

    router.get('/:id', controller.getOne); // GET 1 ITEM

    router.put('/:id', controller.update)// UPDATE 1 ITEM

    router.delete('/delete-all-items', controller.deleteAll); // DELETE ALL ITEMS

    router.delete('/:id', controller.deleteOne); // DELETE 1 ITEM
  
  itemBridge.use('/v1/items',router)  
}