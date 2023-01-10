import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjcyMjcyMDAwLAogICAgImV4cCI6IDE4MzAwMzg0MDAKfQ.KY_w-s7ZPYvUjdKPFv2mFyXRccXH0NIEEyn-4_dWFV4');


// Select all admissions
let { data, error4 } = await supabase
  .from('fee_transaction')
  .select('*')

console.log(data)
console.log(error4);

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



const tableBody = document.getElementById('table-body');
// const classOption = document.getElementById("class-option");

for (var i in data){
    

    var row = `<tr>  
                    <td>Justin Doe</td>
                    <td>400</td>
                    <td>GHS 2500</td>
                    <td><button style='padding: 8px 25px; background-color: dodgerblue; color: white;
                    border-radius: 5px; border: none; cursor: pointer;'">View Details</button></td>
               </tr>`

    tableBody.innerHTML += row;

}



const fullyPaid = document.getElementById('fully-paid');
const partPayment = document.getElementById('part-payment');
const unpaidText = document.getElementById('unpaid');

$('.add-fee-btn').click(() => {
  $('.teachers-box').css('display', 'block');
})

$('.close-btn').click(() => {
  $('.teachers-box').css('display', 'none');
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