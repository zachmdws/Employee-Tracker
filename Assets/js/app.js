const inquirer = require('inquirer');
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'Rootroot1',

    database: 'employeesDB'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id' + connection.threadId);
    x = new User();
    x.beginProcess();

})

// x = new User();
// x.beginProcess();



class User {
    constructor() {


    }


    beginProcess() {

        inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager',
                    'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Add Department',
                    'Add Role', 'Remove Department', 'Remove Role']
            }
        ])
            .then(answers => {
                switch (answers.action) {
                    case 'View All Employees':

                        let y = new View();

                        y.getAllRoles();



                        break;

                    case 'View All Employees By Department':
                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'department',
                                message: 'Please select a department: ',
                                choices: ['Engineering', 'Finance', 'Legal', 'Sales']
                            }
                        ])
                            .then(answers => {
                                switch (answers.department) {

                                    case 'Engineering':
                                        let v = new View();

                                        v.getAllEngineers();

                                        break;

                                    case 'Finance':

                                        let w = new View();
                                        w.getAllAccountants();

                                        break;

                                    case 'Legal':

                                        let q = new View();
                                        q.getAllLawyers();

                                        break;

                                    case 'Sales':

                                        let o = new View();

                                        o.getAllSales();

                                }

                            })

                        break;

                    case 'View All Employees By Manager':
                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'manager',
                                message: 'Please select a manager: ',
                                choices: ['Howard Stern', 'Gary Dellabate', 'Artie Lange']
                            }
                        ])
                            .then(answers => {
                                switch (answers.manager) {

                                    case 'Howard Stern':

                                        let v = new View();
                                        v.getManagers(1);

                                        break;

                                    case 'Gary Dellabate':

                                        let w = new View();
                                        w.getManagers(4);

                                        break;

                                    case 'Artie Lange':

                                        let x = new View();
                                        x.getManagers(6);

                                        break;

                                }

                            })

                        break;

                    case 'Add Employee':
                        let addEmpRole = [];

                        connection.query(`SELECT role.title
                        FROM role;`, function (err, res) {
                            if (err) throw err;
                            res.forEach(element => addEmpRole.push(element.title))

                            inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'add-name',
                                    message: 'What is the employees first name?'
                                },
                                {
                                    type: 'input',
                                    name: 'add-lastname',
                                    message: 'What is the employees last name?'
                                },
                                {
                                    type: 'list',
                                    name: 'add-role',
                                    message: 'What is the employees role?',
                                    choices: addEmpRole
                                }
                            ]).then(answers => {
                                let v = new View();
                                let addEmpMan = [];

                                let role = answers['add-role'];
                                let fName = answers['add-name'];
                                let lName = answers['add-lastname'];



                                // console.log(typeof role);
                                let workingRole = addEmpRole.indexOf(`${role}`) + 1;
                                // console.log(workingRole);

                                connection.query(`SELECT employee.first_name, employee.last_name
                                FROM employee;`, function (err, res) {
                                    res.forEach(element => addEmpMan.push(element.first_name + ' ' + element.last_name));

                                    inquirer.prompt([
                                        {
                                            type: 'list',
                                            name: 'add-manager',
                                            message: "Who is this employee's manager?",
                                            choices: addEmpMan
                                        }
                                    ])
                                        .then(answers => {
                                            let man = answers['add-manager'];
                                            let manager = addEmpMan.indexOf(`${man}`) + 1;
                                            // console.log(manager);

                                            v.renderNewEmployee(fName, lName, workingRole, manager);
                                        })
                                })

                            })
                        })

                        break;

                    case 'Remove Employee':
                        let removableEmps = [];

                        connection.query(`SELECT employee.first_name, employee.last_name
                            FROM employee;`, function (err, res) {
                            if (err) throw err;
                            res.forEach(element => removableEmps.push(element.first_name + ' ' + element.last_name));
                            // console.log(removableEmps);

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'remove',
                                    message: 'Which employee would you like to remove?',
                                    choices: removableEmps
                                }
                            ])
                                .then(answers => {
                                    let v = new View();
                                    v.removeEmployee(answers.remove);
                                    // console.log(answers.remove);
                                })

                        })
                        break;

                    case 'Update Employee Role':
                        let updatableEmps = [];
                        let updatableRoles = [];


                        connection.query(`SELECT employee.first_name, employee.last_name
                        FROM employee;`, function (err, res) {
                            if (err) throw err;
                            res.forEach(element => updatableEmps.push(element.first_name + ' ' + element.last_name));

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'update',
                                    message: "Which employee would you like to update?",
                                    choices: updatableEmps
                                }
                            ]).then(answers => {
                                let updateEmp = answers["update"];
                                // console.log(updateEmp);

                                connection.query(`SELECT role.title
                                FROM role;`, function (err, res) {
                                    if (err) throw err;
                                    res.forEach(element => updatableRoles.push(element.title));
                                    // console.log(updatableRoles);

                                    inquirer.prompt([
                                        {
                                            type: 'list',
                                            name: 'update-role',
                                            message: "Which role should this employee be updated with?",
                                            choices: updatableRoles
                                        }
                                    ]).then(answers => {
                                        let updateRole = answers["update-role"];
                                        let workingUpRole = updatableRoles.indexOf(`${updateRole}`) + 1;

                                        // console.log(workingUpRole);

                                        let v = new View();
                                        v.updateEmployee(updateEmp, workingUpRole);
                                    }
                                    )
                                })
                            });

                        })
                        break;

                    case 'Update Employee Manager':
                        console.log('Feature not available yet, sorry!');
                        let v = new View();

                        v.beginProcess();

                        break;

                    case 'Add Department':
                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'add-department',
                                message: 'Please enter a new department name: '
                            }
                        ]).then(answers => {
                            let v = new View();
                            v.renderNewDepartment(answers['add-department']);
                        })
                        break;

                    case 'Add Role':
                        let currRoles = [];
                        connection.query(`SELECT name
                         FROM department;`, function (err, res) {
                            if (err) throw err;
                            res.forEach(element => currRoles.push(element.name));
                            // console.log(currRoles);

                            inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'add-role-title',
                                    message: 'Please enter a new role name: '
                                },
                                {
                                    type: 'input',
                                    name: 'add-role-salary',
                                    message: 'Please enter a starting salary: '
                                },
                                {
                                    type: 'list',
                                    name: 'add-role-dep',
                                    message: 'Please select which department this role belongs to: ',
                                    choices: currRoles
                                }
                            ]).then(answers => {
                                let workingAddRole = currRoles.indexOf(answers["add-role-dep"]) + 1;
                                let v = new View();
                                v.addRole(answers["add-role-title"], answers["add-role-salary"], workingAddRole)
                            })
                        })
                        break;

                    case 'Remove Department':
                        let removableDeps = [];

                        connection.query(`SELECT department.name
                            FROM department;`, function (err, res) {
                            if (err) throw err;
                            res.forEach(element => removableDeps.push(element.name));
                            // console.log(removableEmps);

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'remove-dep',
                                    message: 'Which department would you like to remove?',
                                    choices: removableDeps
                                }
                            ])
                                .then(answers => {
                                    let v = new View();
                                    v.removeDepartment(answers["remove-dep"]);
                                    // console.log(answers.remove);
                                })

                        })
                        break;

                    case 'Remove Role':
                        let removableRoles = [];

                        connection.query(`SELECT role.title
                        FROM role;`, function (err, res) {
                            if (err) throw err;
                            res.forEach(element => removableRoles.push(element.title));

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'remove-role',
                                    message: 'Which role would you like to remove?',
                                    choices: removableRoles
                                }
                            ])
                                .then(answers => {
                                    let v = new View();
                                    v.removeRole(answers["remove-role"]);
                                })
                        })
                        break;
                }
            })





    }




}

class View extends User {
    constructor() {

        super();
    }



    getAllRoles() {

        connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(employee2.first_name, " ", employee2.last_name) AS manager
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON department.id = role.department_id
        LEFT JOIN employee AS employee2 ON employee.manager_id = employee2.id;`, function (err, res) {
            if (err) throw err;
            console.table(res);

            let e = new User();

            e.beginProcess();
        })

    }

    getAllEngineers() {
        connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(employee2.first_name, " ", employee2.last_name) AS manager
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON department.id = role.department_id
        LEFT JOIN employee AS employee2 ON employee.manager_id = employee2.id
        WHERE department.name = 'Engineering';`, function (err, res) {
            if (err) throw err;
            console.table(res);

            let z = new User();
            z.beginProcess();
        })
    }

    getAllAccountants() {
        connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(employee2.first_name, " ", employee2.last_name) AS manager
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON department.id = role.department_id
        LEFT JOIN employee AS employee2 ON employee.manager_id = employee2.id
        WHERE department.name = 'Finance';`, function (err, res) {
            if (err) throw err;
            console.table(res);

            let z = new User();
            z.beginProcess();
        }

        )
    }

    getAllLawyers() {
        connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(employee2.first_name, " ", employee2.last_name) AS manager
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON department.id = role.department_id
        LEFT JOIN employee AS employee2 ON employee.manager_id = employee2.id
        WHERE department.name = 'Legal';`, function (err, res) {
            if (err) throw err;
            console.table(res);

            let z = new User();
            z.beginProcess();
        }
        )
    }

    getAllSales() {
        connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(employee2.first_name, " ", employee2.last_name) AS manager
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON department.id = role.department_id
        LEFT JOIN employee AS employee2 ON employee.manager_id = employee2.id
        WHERE department.name = 'Sales';`, function (err, res) {
            if (err) throw err;
            console.table(res);

            let z = new User();
            z.beginProcess();
        }
        )
    }

    getManagers(id) {
        connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(employee2.first_name, " ", employee2.last_name) AS manager
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON department.id = role.department_id
        LEFT JOIN employee AS employee2 ON employee.manager_id = employee2.id
        WHERE employee.manager_id = ${id};`, function (err, res) {
            if (err) throw err;
            console.table(res);

            let z = new User();
            z.beginProcess();
        }
        )
    }

    setForeignKeyChecks() {
        connection.query(` SET FOREIGN_KEY_CHECKS=0;`)
    }

    renderNewEmployee(first, last, role, manager) {

        connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)
         VALUES('${first}', '${last}', ${role}, ${manager});`);


        // console.log(`VALUES('${first}', '${last}', ${role}, null);`)

        connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(employee2.first_name, " ", employee2.last_name) AS manager
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON department.id = role.department_id
        LEFT JOIN employee AS employee2 ON employee.manager_id = employee2.id;`, function (err, res) {
            if (err) throw err;
            console.table(res);

            let z = new User();
            z.beginProcess();
        })

    };

    removeEmployee(name) {
        let x = name.split(" ");


        connection.query(`DELETE FROM employee WHERE first_name = '${x[0]}' and last_name = '${x[1]}';`, function (err, res) {
            if (err) throw err;
            let y = new View();
            y.beginProcess();
        })
    }

    updateEmployee(name, role) {
        let x = name.split(" ");
        let y = role;

        connection.query(`UPDATE employee SET employee.role_id = ${role} WHERE first_name = '${x[0]}' and last_name = '${x[1]}';`, function (err, res) {
            if (err) throw err;
            let y = new View();
            y.beginProcess();
        })
    }

    renderNewDepartment(name) {
        // console.log(name);
        connection.query(`INSERT INTO department(name)
        VALUES('${name}');`);
        console.log('Current Departments:')
        connection.query(`SELECT * FROM department;`, function (err, res) {
            if (err) throw err;
            console.table(res);
            let y = new View();
            y.beginProcess();
        })



    }

    addRole(title, salary, dep) {
        connection.query(`INSERT INTO role(title, salary, department_id)
        VALUES('${title}', ${salary}, ${dep});`);
        console.log('Current Roles: ');
        connection.query(`SELECT title, salary, department.name
            FROM role
            LEFT JOIN department ON department.id = role.department_id;`, function (err, res) {
            if (err) throw err;
            console.table(res);
            let y = new View();
            y.beginProcess();
        })


    }

    removeDepartment(name) {
        connection.query(`DELETE FROM department WHERE name = '${name}';`, function (err, res) {
            if (err) throw err;
            let y = new View();
            y.beginProcess();
        })
    }

    removeRole(title) {
        connection.query(`DELETE FROM role WHERE title = '${title}';`, function (err, res) {
            if (err) throw err;
            let y = new View();
            y.beginProcess();
        })
    }

}










module.exports = User;




