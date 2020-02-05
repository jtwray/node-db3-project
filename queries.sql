-- Multi-Table Query Practice
-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

SELECT
  ProductName,
  CategoryName
FROM Products as P
Join Categories as C on P.CategoryID = C.CategoryID 


-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
#1 
(SELECT
  OrderDetails.OrderID,
  ShipperName,
  OrderDate
FROM Shippers
JOIN Orders ON Shippers.ShipperID = Orders.ShipperID
JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
Order By
  OrderDate DESC
LIMIT
  429
)

#2
(SELECT
  (
    ShipperName,
    OrderDetails.OrderID,
    OrderDate
  )
FROM Shippers
JOIN Orders ON Shippers.ShipperID = Orders.ShipperID
JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
WHERE
  OrderDate < '2012-8-9'
LIMIT
  429)


#3
(SELECT
  (
    OrderDetails.OrderID,
    ShipperName,
    OrderDate
  )
FROM Shippers
JOIN Orders on Shippers.ShipperID = Orders.ShipperID
JOIN OrderDetails on Orders.OrderID = OrderDetails.OrderID
WHERE
  OrderDate < '1997-01-08'
Order By
  OrderDate DESC )
  
  -- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT
  ProductName,
  Quantity
FROM Products
JOIN OrderDetails ON Products.ProductID = OrderDetails.ProductID
WHERE
  OrderID = '10251'
LIMIT
  3 
  
  -- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.
SELECT
  Orders.OrderID,
  CustomerName,
  Employees.LastName AS [handled by]
FROM Customers
JOIN Orders ON Customers.CustomerID = Orders.CustomerID
JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID

 --stretch
  --   Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 8 records.


SELECT
  Categories.CategoryName, COUNT(Products.ProductID) AS "COUNT" 
FROM Products
JOIN Categories ON Products.CategoryID =Categories.CategoryID
GROUP BY CategoryName

 --   Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records.
SELECT
  OrderDetails.OrderID, COUNT(Products.ProductID) AS "ItemCOUNT" 
FROM OrderDetails
JOIN Products ON  OrderDetails.ProductID= Products.ProductID
GROUP BY OrderID