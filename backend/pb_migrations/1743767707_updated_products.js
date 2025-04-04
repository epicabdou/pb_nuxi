/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_FgCiO4zqGs` ON `products` (`slug`)",
      "CREATE UNIQUE INDEX `idx_sZ6dS5tPfG` ON `products` (`lemonId`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_FgCiO4zqGs` ON `products` (`slug`)"
    ]
  }, collection)

  return app.save(collection)
})
