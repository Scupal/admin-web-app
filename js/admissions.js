import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2NzIyNzIwMDAsCiAgICAiZXhwIjogMTgzMDAzODQwMAp9.ZVCUygy7EwO9z0QJy73nt7vxXLWSyahq_ot6dcZtgJM');

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
  <td style='padding: 20px;'>${students[i].id}</td>
  <td style='padding: 20px;'>${students[i].first_name + " " + students[i].last_name}</td>
  <td style='padding: 20px;'>${students[i].created_at}</td>
  <td style='padding: 20px;'>${STATUS}</td>
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

// Search by id

// const searchForm = document.getElementById('search-form');

// const searchFormDate = new FormData(searchForm);
// const searchInfo = {
//   id: searchFormDate.get('id'),
// }

// searchForm.addEventListener('submit', (event))

// let { data: admission, erro4 } = await supabase
//   .from('admission')
//   .select('*')
//   .eq('id', 2)

//   console.log(erro4)

// searchForm.addEventListener('submit', (event) => {
//   event.preventDefault();
//   let num = searchInfo.id;
//   console.log(`Number: ${num}`);
//   // alert(admission[0].first_name)
// });