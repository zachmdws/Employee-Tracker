DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Rootroot1';


CREATE TABLE department (

id INTEGER(11) AUTO_INCREMENT NOT NULL,

name VARCHAR(30) NOT NULL,

PRIMARY KEY (id)
);

INSERT INTO department(name)
VALUES('Engineering');

INSERT INTO department(name)
VALUES('Finance');

INSERT INTO department(name)
VALUES('Legal');

INSERT INTO department(name)
VALUES('Sales');



CREATE TABLE role (

id INTEGER(11) AUTO_INCREMENT NOT NULL,

title VARCHAR(30) NOT NULL,

salary DECIMAL(6) NOT NULL,

department_id INTEGER(11),

PRIMARY KEY (id),

FOREIGN KEY (department_id) REFERENCES department(id)

);

INSERT INTO role(title, salary, department_id)
VALUES('Lead Engineer', 150000, 1 );

INSERT INTO role(title, salary, department_id)
VALUES('Software Engineer', 120000, 1);

INSERT INTO role(title, salary, department_id)
VALUES('Accountant', 125000, 2);

INSERT INTO role(title, salary, department_id)
VALUES('Legal Team Lead', 250000, 3);

INSERT INTO role(title, salary, department_id)
VALUES('Lawyer', 190000, 3);

INSERT INTO role(title, salary, department_id)
VALUES('Sales Lead', 100000, 4);

INSERT INTO role(title, salary, department_id)
VALUES('Salesperson', 80000, 4);



CREATE TABLE employee(

id INTEGER(11) AUTO_INCREMENT NOT NULL,

first_name VARCHAR(30) NOT NULL,

last_name VARCHAR(30) NOT NULL,

role_id INTEGER(11),

manager_id INTEGER(11),

PRIMARY KEY (id),

FOREIGN KEY (manager_id) REFERENCES employee(id),

FOREIGN KEY (role_id) REFERENCES role(id)

);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('Howard', 'Stern', 1, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('Robin', 'Quivers', 2, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('Fred', 'Norris', 3, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('Gary', 'Dellabate', 4, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('John', 'Melendez', 5, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('Artie', 'Lange', 6, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('Richard', 'Christy', 7, 6);





SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(employee2.first_name, " ", employee2.last_name) AS manager
FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON department.id = role.department_id
LEFT JOIN employee AS employee2 ON employee.manager_id = employee2.id;