# chameleons_banking_app_practice

## Requirements

[Exercise] Chameleons Banking Group API
- Create a database and collection for bank accounts
    - Each account should have at least a name and balance property
- Provide an endpoint that allows you to list all accounts in the system
- Provide an endpoint that allows you to get a single account in the system by its ID
- An endpoint to add money to an accounts balance by its ID
- An endpoint to withdraw money from an accounts balance by its ID
- An endpoint to do a balance transfer from one account to another
    - Removing money from the sender, and adding that amount to the recipient
- An endpoint to remove an account
- An endpoint to add an account
- Think about the rest rules - follow them as best as you can
- Make all endpoints respond with JSON following a consistent format eg:
```json
{
  "success": true,
  "message": "It worked",
  "status": 200,
  "data": [{},{},{}]
}
```

## Endpoints

### Get user accounts

Returns json data representing user accounts on the database.
Can be used to retrieve all accounts or individual accounts

* **URL** <br /> `/accounts`  
* **Method:** <br /> `GET`
* **URL Params** <br />
  **Required:** <br /> `n/a` <br />
  **Optional:** <br />
  `/people/:id` <br />
  - Providing an individual account's id will return all info for that account, no more.
* **Success Response** <br />
  **Code:** 200 <br />
  **Content:** <br />
```json
{
"success": true,
"message": "All accounts successfully retrieved",
"status": 200,
"data": [{account}, {account}, {account}]
}
```

* **Error Response** <br />
  **Code:** 404 <br />
  **Content:** <br />
```json
{
"success": false,
"message": "The resource/s requested does not exist at the desired location",
"status": 404
}
```

### Deposit into account (increase balance value by providing account ID)

Increases the balance of an account, specified by a provided ObjectId. 
You are only able to provide positive numbers to increment the balance.

* **URL** <br /> `/deposits`  
* **Method:** <br /> `PUT`
* **Data Params** <br />
```json
{
  "id": desired account ObjectId(_id),
  "depositAmt": desired amount to increment account balance
}
```
* **Success Response** <br />
  **Code:** 200 <br />
  **Content:** <br />
```json
{
  "success": true,
  "message": "Account balance successfully updated",
  "status": 200
}
```

* **Error Response** <br />
  **Code:** 400 <br />
  **Content:** <br />
```json
{
  "success": false,
  "message": Detailed error message describing where you went wrong!,
  "status": 400
}
```

### Withdraw from account (decrease balance value by providing account ID)

Increases the balance of an account, specified by a provided ObjectId. 
You are only able to provide positive numbers to increment the balance.

* **URL** <br /> `/withdrawals`  
* **Method:** <br /> `PUT`
* **Data Params** <br />
```json
{
  "id": desired account ObjectId(_id),
  "amount": desired amount to decrement account balance
}
```
* **Success Response** <br />
  **Code:** 200 <br />
  **Content:** <br />
```json
{
  "success": true,
  "message": "Your withdrawal was completed successfully",
  "status": 200
}
```

* **Error Response** <br />
  **Code:** 400 <br />
  **Content:** <br />
```json
{
  "success": false,
  "message": "Something went wrong with your withdrawal. Your account has not been affected.",
  "status": 400
}
```
  **Code:** 400 <br />
  **Content:** <br />
```json
{
  "success": false,
  "message": "Invalid amount value.",
  "status": 400
}
```