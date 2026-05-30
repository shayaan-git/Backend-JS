- Postman is acting like a Frontend (client/user making request on server)

- Below is Request ke ander ka kuch data
  which is req.body (in json format)

{
"title": "test title 1",
"content": "test content 1"
}

- By default Our Server is not that much capable to read the req.body data (undefined), so that's why this line of code is used to help server read the req body data
  app.use(express.json())

- 