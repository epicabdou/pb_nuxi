/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3268994155")

  // update collection data
  unmarshal({
    "listRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3268994155")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id = user.id && @request.auth.isAdmin = true"
  }, collection)

  return app.save(collection)
})
