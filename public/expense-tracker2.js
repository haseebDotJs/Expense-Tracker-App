const myBalance = document.getElementById("my-balance")
const income = document.getElementById("income")
const expense = document.getElementById("expense")
const details = document.getElementById("name")
const date = document.getElementById("date")
const amount = document.getElementById("amount")
const options = document.getElementById("options")
const form = document.getElementById("expense-form");
const tableBody = document.getElementById("tableBody");

// calling addItems function to add the item from LS
addItemsToExpenseTracker()
// calling addItems function to add the item from LS


// setting default date of date according to current date
let currentDate = new Date
let thisDate = currentDate.getDate();
let thisMonth = currentDate.getMonth() + 1;
let thisYear = currentDate.getFullYear()
date.defaultValue = thisYear + "-" + thisMonth + "-" + thisDate
// setting default date of date according to current date

// making a class object according to the current input information
class expenseObj {
  constructor(details, date, amount, options) {
    this.details = details;
    this.date = date;
    this.amount = amount;
    this.options = options;
  }
  validation() {
    if (this.amount.match(/^[0-9]{1,}$/g) === null || (this.amount[0] === "0" && this.amount.length > 1)) {
      return false
    }
    if (this.details !== "" && this.date !== "" && this.amount !== "") {
      return true
    }
    else {
      false
    }
  }
}
// making a class object according to the current input information

//event listener on form submit
form.addEventListener("submit", addItems)
function addItems(e) {
  e.preventDefault()
  let detailsValue = details.value
  let dateValue = date.value;
  let amountValue = amount.value
  let optionsValue = options.value
  let incomeValue;
  let expenseValue;
  let expenseItem = new expenseObj(detailsValue, dateValue, amountValue, optionsValue);
  if (expenseItem.validation()) {
    let money = +(amountValue);
    // setting value of income and expense and assigning it to expense Item object 
    if (optionsValue === "Income") {
      incomeValue = `${money}`
      expenseItem.expense = 0
      expenseItem.income = incomeValue
    }
    else {
      expenseValue = `${money}`
      expenseItem.expense = expenseValue
      expenseItem.income = 0
    }
    // setting value of income and expense and assigning it to expense Item object 

    // setting item to LS 
    let expenseItemFromLS = localStorage.getItem("expense-track");
    let arrOfExp;
    if (expenseItemFromLS === null) {
      arrOfExp = []
    }
    else {
      arrOfExp = JSON.parse(expenseItemFromLS)
    }
    arrOfExp.push(expenseItem)
    localStorage.setItem("expense-track", JSON.stringify(arrOfExp))
    addItemsToExpenseTracker()
    // setting item to LS 
    // making the fields empty
    details.value = "";
    amount.value = "";
    // making the fields empty
  }
  else {
    alert("Either name or amount is not valid")
  }
}
//event listener on form submit

// function to delete the item
function deleteTrack(e) {
  let expenseItemFromLS = localStorage.getItem("expense-track")
  let arrOfExp = JSON.parse(expenseItemFromLS)
  arrOfExp.splice(e, 1)
  updateLS(arrOfExp)
}
// function to delete the item

// updating LS
function updateLS(item) {
  localStorage.setItem("expense-track", JSON.stringify(item))
  addItemsToExpenseTracker()
}
// updating LS


// function to get item from LS and add it to dom
function addItemsToExpenseTracker() {
  let expenseItemFromLS = localStorage.getItem("expense-track");
  let arrOfExp;
  if (expenseItemFromLS === null) {
    arrOfExp = []
  }
  else {
    arrOfExp = JSON.parse(expenseItemFromLS)
  }
  // updating income or expense value and updating dom start
  let innerHtml = ""
  let inc = 0
  let exp = 0
  arrOfExp.forEach((item, index) => {
    innerHtml += `<tr class="${item.options}">
                       <td>${item.details}</td>
                       <td>${item.date}</td>
                       <td>$${item.amount}</td>
                       <td><button id=${index} class="delete-btn" onclick="deleteTrack(this.id)"><i class="fas fa-trash"></i></button></td>
                     </tr>`
    inc += +(item.income)
    exp += +(item.expense)
  })
  let bal = inc - exp
  tableBody.innerHTML = innerHtml
  income.value = "$" + inc;
  expense.value = "$" + exp;
  myBalance.innerHTML = "$" + bal;
}
// function to get item from LS and add it to dom

