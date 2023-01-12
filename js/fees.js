import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2NzIyNzIwMDAsCiAgICAiZXhwIjogMTgzMDAzODQwMAp9.ZVCUygy7EwO9z0QJy73nt7vxXLWSyahq_ot6dcZtgJM');


// Select all admissions
let { data, error4 } = await supabase
  .from('fee_transaction')
  .select('*')

// Fully paid students
let { data: fully_paid, error3 } = await supabase
  .from('fee_account')
  .select('*')
  .gte("balance", 0)

  let { data: part_payment, error5 } = await supabase
  .from('fee_account')
  .select('*')
  .gt("balance", 0)

  let { data: unpaid, error6 } = await supabase
  .from('fee_account')
  .select('*')
  .eq("balance", 0)

  let { data: fee_transaction, error7 } = await supabase
  .from('fee_transaction')
  .select('*, parent(*)')

  // FEE STRUCTURE
  // Get every fee structure item
let { data: feeStructure, error } = await supabase
.from('fee_structure')
.select('*')
.eq("class_id",1)
// .eq("school_id", 2)

// SUM OF AMOUNT
for (let i = 0; i < feeStructure.length; i++) {

          

          let sum = feeStructure.map(totalAmount => totalAmount.amount).reduce((acc, amount) => acc + amount);

          total.innerHTML = `<strong>GHS ${sum}.00</strong>`;
}




// let sum = feeStructure.map(totalAmount => totalAmount.amount).reduce((acc, amount) => acc + amount);
// console.log(sum);
// var totalFee = document.getElementById('total');
//   totalFee.innerHTML = sum;



const tableBody = document.getElementById('table-body');
// const classOption = document.getElementById("class-option");

for (let i = 0; i < fee_transaction.length; i++){
  let j = 0;
  if (j < feeStructure.length) {
    let sum = feeStructure.map(totalAmount => totalAmount.amount).reduce((acc, amount) => acc + amount);
    var row = `<tr>  
                    <td>${fee_transaction[i]["parent"]["first_name"]} ${fee_transaction[i]["parent"]["last_name"]}</td>
                    <td>GHS ${sum}</td>
                    <td>GHS ${fee_transaction[i].amount}</td>
                    <td>GHS ${sum - fee_transaction[i].amount}</td>
               </tr>`
    
    tableBody.innerHTML += row;

    

    total.innerHTML = `<strong>GHS ${sum}.00</strong>`;
}

}



// const fullyPaid = document.getElementById('fully-paid');
// const partPayment = document.getElementById('part-payment');
// const unpaidText = document.getElementById('unpaid');

$('.add-fee-btn').click(() => {
  $('.teachers-box').css('display', 'block');
})

$('.add-trans-btn').click(() => {
  $('.transaction-box').css('display', 'block');
})

$('.close-btn').click(() => {
  $('.teachers-box').css('display', 'none');
})

$('.close-btn-trans').click(() => {
  $('.transaction-box').css('display', 'none');
})

const addStructureBtn = document.querySelector('.add-fee-structure');
const feeBox = document.querySelector('.teachers-box');

// INSERT NEW FEE ITEM

const form = document.querySelector('.f-form');


async function insertData() {
  const formData = new FormData(form);

  const info = {
    item: formData.get('item'),
    amount: formData.get('amount'),
    class: formData.get('class'),
  };

  const { data, error } = await supabase
      .from('fee_structure')
        .insert([
          { name: info.item , amount: info.amount, class_id: info.class, school_id: 2 }
      ])

  console.log(data)
  console.log(error)
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  
  insertData();
  alert('Fee Structure added successfully');
  feeBox.style.display = 'none';

});

// SELECTING ALL PARENTS
let { data: parent, error1 } = await supabase
  .from('parent')
  .select('*')

const parentOpt = document.querySelector('.parent');

for (let i = 0; i < parent.length; i++) {
  var parentOption = `<option value=${parent[i].id}> ${parent[i].first_name} ${parent[i].last_name}</option>`

  parentOpt.innerHTML += parentOption;
}

// INSERT NEW TRANSACTION

const transForm = document.querySelector('.t-form');

async function insertTransData() {
  const formTransData = new FormData(transForm);

  const info = {
    parent: formTransData.get('parent'),
    amount: formTransData.get('amount'),
  };

  const { data:feeTrans, error } = await supabase
      .from('fee_transaction')
        .insert([
          { parent_id: info.parent , amount: info.amount, school_id: 2, fee_account_id: 2, status: false }
      ])

  
  console.log(feeTrans)
  console.log(error)
}

const transactionBox = document.querySelector('.transaction-box');



  transForm.addEventListener('submit', (event) => {
  event.preventDefault();

  
  insertTransData();
  alert('Transaction added successfully');
  transactionBox.style.display = 'none';

});

