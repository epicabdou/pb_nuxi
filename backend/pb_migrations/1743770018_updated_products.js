/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_FgCiO4zqGs` ON `products` (`slug`)"
    ]
  }, collection)

  // remove field
  collection.fields.removeById("text2726921352")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_FgCiO4zqGs` ON `products` (`slug`)",
      "CREATE UNIQUE INDEX `idx_sZ6dS5tPfG` ON `products` (`lemonId`)"
    ]
  }, collection)

  // add field
  collection.fields.addAt(13, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2726921352",
    "max": 0,
    "min": 0,
    "name": "lemonId",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
