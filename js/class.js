import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2NzIyNzIwMDAsCiAgICAiZXhwIjogMTgzMDAzODQwMAp9.ZVCUygy7EwO9z0QJy73nt7vxXLWSyahq_ot6dcZtgJM');

// Sellect all Students
let { data, error } = await supabase
  .from('classroom')
  .select('*')

  const notices = document.getElementById('notices');

const tableBody = document.getElementById('table-body');

for (var i in data){

    var row = `<tr>  
                    <td style='padding: 20px;'>${data[i].created_at}</td>
                    <td style='padding: 20px;'>${data[i].name}</td>
                    <td style='padding: 20px;'>${data[i].size}</td>
                    
               </tr>`

    tableBody.innerHTML += row;
}

notices.innerHTML = data.length;


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
    className: formData.get('class-name'),
    classSize: formData.get('class-size')
  };

  const { data, error } = await supabase
      .from('classroom')
        .insert([
          { name: info.className , size: info.classSize, school_id: 2}
      ])

  console.log(data)
  console.log(error)
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  
  insertData();
  alert('New Class added successfully');
  noticeBox.style.display = 'none';

});