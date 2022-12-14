/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

function createEmployeeRecord (array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords (employeeData) {
    return employeeData.map(function (array) {
        return createEmployeeRecord(array);
    })
}

function createTimeInEvent (dateStamp) {
    let [date, hour] = dateStamp.split(" ");

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    
    return this
}

function createTimeOutEvent (dateStamp){
    let [date, hour] = dateStamp.split(" ")

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}


function hoursWorkedOnDate (particularDateWorked) {
    let timeInEvent = this.timeInEvents.find(function (event) {
        return event.date === particularDateWorked
    })
    
    let timeOutEvent = this.timeOutEvents.find(function (event) {
        return event.date === particularDateWorked
    })

    return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate (dateWorked) {
    let wages = hoursWorkedOnDate.call(this, dateWorked) * this.payPerHour;
    return parseFloat(wages.toString());
}

function allWagesFor() {
    let paymentDates = this.timeInEvents.map(function (event) {
        return event.date
    })

    let paymentForAllDates = paymentDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0)

    return paymentForAllDates;
}

function findEmployeeByFirstName (employeeArray, firstName) {
    return employeeArray.find(function(record){
      return record.firstName === firstName
    })
}

function calculatePayroll (employeeRecordsArray) {
    return employeeRecordsArray.reduce(function (memo, records) {
        return memo + allWagesFor.call(records);
    }, 0)
}
