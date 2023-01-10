import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjcyMjcyMDAwLAogICAgImV4cCI6IDE4MzAwMzg0MDAKfQ.KY_w-s7ZPYvUjdKPFv2mFyXRccXH0NIEEyn-4_dWFV4');

// Sellect all Students
let { data: noticeboard, error } = await supabase
  .from('noticeboard')
  .select('*')

  const notices = document.getElementById('notices');

const tableBody = document.getElementById('table-body');

for (var i in noticeboard){

    var row = `<tr>  
                    <td style='padding: 20px;'>${noticeboard[i].title}</td>
                    <td style='padding: 20px;'>${noticeboard[i].details}</td>
                    <td style='padding: 20px;'>${noticeboard[i].created_at}</td>
               </tr>`

    tableBody.innerHTML += row;
}

notices.innerHTML = noticeboard.length;


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
      .from('noticeboard')
        .insert([
          { title: info.title , details: info.detail, is_general: true, academic_year: 1, term: 1,
            school_id: 2, class_id: 1}
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