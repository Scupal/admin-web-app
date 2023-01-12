import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('https://wvaxmbprbpvhulyzorsm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2YXhtYnByYnB2aHVseXpvcnNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE4NzE3NzgsImV4cCI6MTk4NzQ0Nzc3OH0.WQjjW0_dz5sojlbwNaPpDCeeKTEyNWlpMJaCHXRfE3M');



// Get every fee structure item
let { data, error } = await supabase
  .from('fee_structure')
  .select('*, school(*), classroom(*)')
  .eq("class_id",1)
  // .eq("school_id", 2)


console.log(error)

const tableBody = document.querySelector('.table-body');
const total = document.querySelector('.total');
const schoolName = document.getElementById('school-name');
const schoolContact = document.getElementById('school-contact');
const schoolAddress = document.getElementById('school-address');
const schoolLogo = document.getElementById('school-logo');

for (let i = 0; i < data.length; i++) {
    const row = `<tr> 
                <td>${data[i].name}</td>
                <td>GHS ${data[i].amount}</td>
                <td>${data[i]["classroom"]["name"]}</td>
            </tr>`;

            schoolName.innerHTML = data[i]["school"]["name"];
            schoolAddress.innerHTML = data[i]["school"]["address"];
            schoolContact.innerHTML = data[i]["school"]["phone"];
            schoolLogo.src = data[i]["school"]["photo_url"];

            let sum = data.map(totalAmount => totalAmount.amount).reduce((acc, amount) => acc + amount);

            total.innerHTML = `<strong>Total: GHS ${sum}.00</strong>`;
            tableBody.innerHTML += row;
}

