# payable
simple nodejs app

# Setup:
 - Clone the repo
 - `npm install`
 - `sudo mongod start`
 - `npm run dev`

Try `REST` actions on `payments` endpoint after running the server using `Postman` or `Paw`.

# Remarks:
 - More validations must to be added
 - All params must be sent when updating a record. Ommited params won't be ignored.
 - I tried to write the `sum` of the values and the returned records within one `mongo` query aggregator but didn't work out(It would be faster) I avoided writing two separate queries to avoid inconsistent results. Therefore I retrieved the records and calculated the `sum` in JS code.
 
