import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjcyMjcyMDAwLAogICAgImV4cCI6IDE4MzAwMzg0MDAKfQ.KY_w-s7ZPYvUjdKPFv2mFyXRccXH0NIEEyn-4_dWFV4');

// Sellect all Students
let { data: teachers, error } = await supabase
  .from('teacher')
  .select('*')


const numTeachers = document.getElementById('num-teachers');

numTeachers.innerHTML = teachers.length;

const tableBody = document.getElementById('table-body');

for (var i in teachers){

    var row = `<tr>  
                    <td style='padding: 20px;'>${teachers[i].first_name} ${teachers[i].last_name} ${teachers[i].other_name}</td>
                    <td style='padding: 20px;'>${teachers[i].email}</td>
                    <td style='padding: 20px;'>${teachers[i].address}</td>
                    <td style='padding: 20px;'>${teachers[i].phone}</td>
                    <td style='padding: 20px;'>${teachers[i].city}</td>
                    <td style='padding: 20px;'><button style='padding: 8px 25px; background-color: dodgerblue; color: white;
                    border-radius: 5px; border: none; cursor: pointer;'">View Details</button></td>
               </tr>`

    tableBody.innerHTML += row;
}

// POPULATING THE CLASSES
// Sellect all Students
let { data: classes, error3 } = await supabase
  .from('classroom')
  .select('*')

const classOptions = document.querySelector('class');
for (var i in classes){

  var row = `<option value='${classroom.id}'>  
                  ${classroom.name}
             </option>`

  classOptions.innerHTML += row;
}



$('.add-facilitator-btn').click(() => {
  $('.teachers-box').css('display', 'block');
})

$('.close-btn').click(() => {
  $('.teachers-box').css('display', 'none');
})


// ADD A NEW TEACHER TO THE DATABASE

const form = document.querySelector('.t-form');
const teachersBox = document.querySelector('.teachers-box');


async function insertData() {
  const formData = new FormData(form);

  const info = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    otherName: formData.get('otherName'),
    email: formData.get('email'),
    address: formData.get('address'),
    city: formData.get('city'),
    photo:formData.get('photo'),
    telephone: formData.get('telephone'),
    class: formData.get('class')
  };

  const { data, error } = await supabase
      .from('teacher')
        .insert([
          { first_name: info.firstName , last_name: info.lastName, other_name: info.otherName, email: info.email, address: info.address,
            city: info.city, school_id: 2, photo_url: info.photo, phone: info.telephone, class_id: 1}
      ])

  console.log(data)
  console.log(error)
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  
  insertData();
  alert('Facilitator added successfully');
  teachersBox.style.display = 'none';

});

$(document).ready(function () {
  $('#myTable').DataTable();
});