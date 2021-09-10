# ejam


## Backend
[Backend](https://ejam-depl.herokuapp.com/)


## API Doc
### Get

#### GET {{baseURL}}deployment
____


### add deployment
#### POST {{baseURL}}deployment

Content-Type: application/json

```
{
    "URL": "https://www.npoint.io/docs/8f7cf8628b367ffd50a2",
    "templateName": "AddMonester",
    "version": "1.0.0"
}
```

____
### delete deployment

#### DELETE  {{baseURL}}deployment

Content-Type: application/json

```
{
    "templateName": "Rahman"
}
```