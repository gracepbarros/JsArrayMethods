const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calcBtn = document.getElementById('calculate-wealth');

let data = [];
async function getRandomUser() {
  // fetch random user and add money
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() *1000000)
  }

  addData(newUser);
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

function updateDOM(providedData = data) {
  // Clearing the main element
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  providedData.forEach( item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  })
}

function formatMoney(number) {
  return '$' + number;
}

//Task 1
function doubleMoney(){
  data = data.map(user => {
    user.name = user.name;
    user.money *= 2;
    return user;
  });
  updateDOM();
}

//Task 2
function sortByRichest(){
  data.sort(function(a,b) {
    return b.money - a.money;
  });
  updateDOM();
}

//Task 3
function showMillionaires(){
  data = data.filter( function(a){
    return a.money > 1000000;
  })
  updateDOM();
}

//Task 4
function calculateWealth(){
  let total = data.reduce((total, currentObj) => {
    return total + currentObj.money ;
  }, 0);
  console.log(total);
  let add = document.createElement("div");
  add.innerHTML = "<h2>Total wealth:<strong>"+formatMoney(total)+"</strong></h2>";
  main.appendChild(add);
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sortByRichest);
showMillionairesBtn.addEventListener('click',showMillionaires);
calcBtn.addEventListener('click',calculateWealth);