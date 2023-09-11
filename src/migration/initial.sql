INSERT INTO customer (name, address, licensed_driver) 
    VALUES ('George Clooney', 'USA', true);
INSERT INTO leasing
    (id_car, pickup_date, return_date, values_hour, additional_security, additional_security_value, customer_id)
    VALUES(35, '2023-07-25T12:35:12', '2023-08-25T14:17:05', 25, 150, false, LAST_INSERT_ROWID());

INSERT INTO customer (name, address, licensed_driver) 
    VALUES ('Hugh Jackman', 'Australia', true);
INSERT INTO leasing
    (id_car, pickup_date, return_date, values_hour, additional_security, additional_security_value, customer_id)
    VALUES(96, '2023-08-15T17:59:00', '2023-08-18T08:16:01', 32, 150, false, LAST_INSERT_ROWID());

INSERT INTO customer (name, address, licensed_driver) 
    VALUES ('Benedict Cumberbatch', 'England', true);
INSERT INTO leasing
    (id_car, pickup_date, return_date, values_hour, additional_security, additional_security_value, customer_id)
    VALUES(71, '2023-08-20T13:02:25', '2023-08-24T12:40:34', 30, 150, false, LAST_INSERT_ROWID());    
