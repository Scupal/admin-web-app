import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjcyMjcyMDAwLAogICAgImV4cCI6IDE4MzAwMzg0MDAKfQ.KY_w-s7ZPYvUjdKPFv2mFyXRccXH0NIEEyn-4_dWFV4');

// Sellect Accepted Students
let { data: accepted, error } = await supabase
  .from('admission')
  .select('*')
  .eq('status', 1)

  // Select Pending Students
  let { data: pending, error1 } = await supabase
  .from('admission')
  .select('*')
  .eq('status', 2)

  // Selected Rejected Students
  let { data: rejected, error2 } = await supabase
  .from('admission')
  .select('*')
  .eq('status', 3)

// Select all admissions
let { data: students, error3 } = await supabase
  .from('admission')
  .select('*')

const numAccepted = document.getElementById('num-accepted');
const numPending = document.getElementById('num-pending');
const numRejected = document.getElementById('num-rejected');

numAccepted.innerHTML = accepted.length;
numPending.innerHTML = pending.length;
numRejected.innerHTML = rejected.length;


const tableBody = document.getElementById('table-body');

for (var i in students){

  let status = students[i].status;
  let STATUS = "";

  if(status == 1){
    STATUS = "Accepted";
  }
  else if(status == 2){
    STATUS = "Pending";
  }
  else if(status == 3){
    STATUS = "Rejected";
  }

  var row =  `<tr>
  <td style='padding: 20px;'>${students[i].first_name + " " + students[i].last_name}</td>
  <td style='padding: 20px;'>${students[i].created_at}</td>
  <td style='padding: 20px;'>${STATUS}</td>
  <td style='padding: 20px;'><button style='padding: 8px 25px; background-color: dodgerblue; color: white;
  border-radius: 5px; border: none; cursor: pointer;'" class='view-btn'>View Details</button>
  </td>
</tr>`

  tableBody.innerHTML += row;
}



const table = document.getElementById('ad-table');

tableBody.innerHTML += row;

$("#hey-btn").click(() => {
    alert("I am a jQuery button");
})

// Close custom modal
$('.close-btn').click(() => {
    $(".student-details").css('display', 'none');
})

$(document).ready(function () {
  $('#ad-table').DataTable();
});

// $(document).ready(function(){
//     $('table tbody tr').click(function(){
//         $('.student-details').css('display', 'block');
//         // $('.student-info').html($(this).text())
//        for(let i = 0; i < students.length; i++){
//         if(students[i].id === tableBody.row[i].value){
//             // $('.student-details').html(`<p></p>`);
//         }
//        }
//     })
// })