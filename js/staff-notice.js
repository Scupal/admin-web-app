import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2NzIyNzIwMDAsCiAgICAiZXhwIjogMTgzMDAzODQwMAp9.ZVCUygy7EwO9z0QJy73nt7vxXLWSyahq_ot6dcZtgJM');

// Sellect all Students
let { data: staff_noticeboard, error } = await supabase
  .from('staff_noticeboard')
  .select('*')

  const notices = document.getElementById('notices');

const tableBody = document.getElementById('table-body');

for (var i in staff_noticeboard){

    var row = `<tr>  
                    <td style='padding: 20px;'>${staff_noticeboard[i].title}</td>
                    <td style='padding: 20px;'>${staff_noticeboard[i].details}</td>
                    <td style='padding: 20px;'>${staff_noticeboard[i].created_at}</td>
               </tr>`

    tableBody.innerHTML += row;
}

notices.innerHTML = staff_noticeboard.length;


// KEY FUNCTIONS

$('.add-notice-btn').click(() => {
  $('.teachers-box').css('display', 'block');
})

$('.close-btn').click(() => {
  $('.teachers-box').css('display', 'none');
})


// ADD A NEW TEACHER TO THE DATABASE

const form = document.querySelector('.note-form');
const noticeBox = document.querySelector('.teachers-box');


async function insertData() {
  const formData = new FormData(form);

  const info = {
    title: formData.get('title'),
    detail: formData.get('detail')
  };

  const { data, error } = await supabase
      .from('staff_noticeboard')
        .insert([
          { title: info.title , details: info.detail,  academic_year: 1, term: 1, school_id: 2}
      ])

  console.log(data)
  console.log(error)
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  
  insertData();
  alert('New Notice added successfully');
  noticeBox.style.display = 'none';

});