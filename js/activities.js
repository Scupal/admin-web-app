import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2NzIyNzIwMDAsCiAgICAiZXhwIjogMTgzMDAzODQwMAp9.ZVCUygy7EwO9z0QJy73nt7vxXLWSyahq_ot6dcZtgJM');

// Sellect all Students
let { data: teachers, error } = await supabase
  .from('teacher')
  .select('*')

// Select all activities
let { data: extra_service, error1 } = await supabase
  .from('extra_service')
  .select('*')

const numActivities = document.getElementById('num-activities');
numActivities.innerHTML = extra_service.length;

const tableBody = document.getElementById('table-body');

for (let i = 0; i < extra_service.length; i++) {
  var row = `<tr>
              <td>${extra_service[i].name}</td>
              <td>${extra_service[i].price}</td>
            </tr>`;
 
  tableBody.innerHTML += row;
}

$('.add-activity-btn').click(() => {
  $('.activity-box').css('display', 'block')
})

$('.close-btn').click(() => {
  $('.activity-box').css('display', 'none')
})


// PUSHING ACTIVITIES INTO DATABASE

const form = document.querySelector('.a-form');
const activityBox = document.querySelector('.activity-box');


async function insertData() {
  const formData = new FormData(form);

  const info = {
    name: formData.get('name'),
    amount: formData.get('amount')
  };

  const { data, error } = await supabase
      .from('extra_service')
        .insert([
          { name: info.name , price: info.amount, school_id: 2, summer: false}
      ])

  console.log(data)
  console.log(error)
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  
  insertData();
  alert('New Activity successfully');
  activityBox.style.display = 'none';

});