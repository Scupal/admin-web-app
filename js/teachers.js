import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2NzIyNzIwMDAsCiAgICAiZXhwIjogMTgzMDAzODQwMAp9.ZVCUygy7EwO9z0QJy73nt7vxXLWSyahq_ot6dcZtgJM');

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
               </tr>`

    tableBody.innerHTML += row;
}

// POPULATING THE CLASSES
// Sellect all Students
let { data: classes, error3 } = await supabase
  .from('classroom')
  .select('*')

  // console.log(classes)

const classOptions = document.querySelector('.class-list');
for (var i in classes){

  var row = `<option value='${classes[i].id}'>  
                  ${classes[i].name}
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
    password: formData.get('password'),
    class: formData.get('class')
  };

// let userEmail = info.email;
// let userPassword = info.password;

  // Create authentication instance
async function createUser(user, password) {
  const { data, error } = await supabase.auth.admin.createUser({
      email: info.email,
      password: info.password,
      email_confirm: true,
  });
  if(error){
///There was an error
console.error(error.message);
return;
}
//get auth_id
  const authID = data.user.id;
  return authID;
}

   const throwUser = await createUser();
   throwUser;
  //  console.log(throwUser);

  // const { data, error1 } = await supabase.auth.updateUser({password: 'new password'})

  const { data, error } = await supabase
      .from('teacher')
        .insert([
          { first_name: info.firstName , last_name: info.lastName, other_name: info.otherName, email: info.email, address: info.address,
            city: info.city, auth_id: throwUser, school_id: 2, photo_url: info.photo, phone: info.telephone, class_id: 1}
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