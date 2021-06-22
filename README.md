## API

```
 Api URL : http://dev.backend-gc.com/
```

## Swagger Docs

```
 Swagger URL : http://dev.backend-gc.com/api
```

### Table

```
[User]
- id (pk)
- email
- password
- user_name
- role
- address
- phone

[Product]
- id (pk)
- product_name
- category_id (fk | Product : Cateogry = 1 : 1)
- user_id (fk | User : Product = 1 : 1)
- price
- is_bargain
- harvest_day


[Category]
- id (pk)
- category_name
```

### Auth

```
- Passport Local Strategy
- JWT Strategy
```
