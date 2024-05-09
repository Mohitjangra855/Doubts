const Employee = require("../models/employee")


// All employee............
module.exports.renderAll = async (req, res) => {
    let employee = await Employee.find()
    let { search } = req.query;
    let searched = search ? employee.filter((emp) => emp.name.toLowerCase() === search.toLowerCase())
        : employee;
    if (!searched) {
        req.flash("error", "Employee not found!");
        return res.redirect("/employee/list");
    }
    res.render("page/list.ejs", { employee: searched });
}

// new employee form............
module.exports.renderNewForm = (req, res) => {
    res.render("page/new.ejs");
}

//create employee.................
module.exports.createEmployee = async (req, res) => {
    let data = req.body.employee
    let newEmployee = new Employee(req.body.employee)
    await newEmployee.save();
    res.redirect("/employee/list");
}

// view emplyee ................
module.exports.employeeList= async (req, res) => {
    let employee = await Employee.findById(req.params.id)
    res.render("page/show.ejs", { employee });
}

//edit Employee form............
module.exports.editForm = async (req, res) => {
    let employee = await Employee.findById(req.params.id)
    res.render("page/edit.ejs", { employee })
}

//update employee................
module.exports.updateEmployee = async (req, res) => {
    let employee = await Employee.findByIdAndUpdate(req.params.id, { ...req.body.employee })
    req.flash("success", "Employee data successfully updated.")
    res.redirect("/employee/list");
}

//delete employee..............
module.exports.destroyEmployee = async (req, res) => {
    let employee = await Employee.findByIdAndDelete(req.params.id);
    req.flash("success", "Employee successfully removed.")
    res.redirect("/employee/list");
}
