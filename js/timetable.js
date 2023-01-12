import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2NzIyNzIwMDAsCiAgICAiZXhwIjogMTgzMDAzODQwMAp9.ZVCUygy7EwO9z0QJy73nt7vxXLWSyahq_ot6dcZtgJM');

// Sellect all Students
let { data, error } = await supabase
  .from('timetable')
  .select('*, subject(name), classroom(name), teacher(first_name, last_name)')

  const notices = document.getElementById('notices');

const tableBody = document.getElementById('table-body');

for (var i in data){

    var row = `<tr>  
                    <td style='padding: 20px;'>${data[i].created_at}</td>
                    <td style='padding: 20px;'>${data[i].start_time}</td>
                    <td style='padding: 20px;'>${data[i].end_time}</td>
                    <td style='padding: 20px;'>${data[i]["subject"]["name"]}</td>
                    <td style='padding: 20px;'>${data[i].day}</td>
                    <td style='padding: 20px;'>${data[i]["classroom"]["name"]}</td>
                    <td style='padding: 20px;'>${data[i]["teacher"]["first_name"] + " " + data[i]["teacher"]["last_name"]}</td>
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

// POPULATE SUBJECT
const subjectOpt = document.getElementById('subjects');

let { data: subject, error2 } = await supabase
  .from('subject')
  .select('*')

for (let j = 0; j < subject.length; j++){
  let subjectOption = `<option>${subject[j].name}</option>`;

  subjectOpt.innerHTML += subjectOption;
}

// POPULATE DAYS
const daysOpt = document.getElementById('days');

let { data: school_days, error3 } = await supabase
  .from('school_days')
  .select('*')

  console.log(school_days)
  console.log(school_days.length)

  for ( let i = 0; i < school_days.length; i++){
    let daysOption = `<option>${school_days[i].name}</option>`;
  
    daysOpt.innerHTML += daysOption;
  }

  // POPULATE CLASSES
  
  const classOpt = document.getElementById('class');

  let { data: classroom, error4 } = await supabase
  .from('classroom')
  .select('*')

  for ( let i = 0; i < classroom.length; i++){
    let classOption = `<option>${classroom[i].name}</option>`;
  
    classOpt.innerHTML += classOption;
  }

// POPULATE FACILITATOR
const facilitatorOpt = document.getElementById('facilitator');

let { data: teacher, error5 } = await supabase
  .from('teacher')
  .select('*')

  for ( let i = 0; i < teacher.length; i++){
    let facilitatorOption = `<option>${teacher[i].first_name} ${teacher[i].last_name}</option>`;
  
    facilitatorOpt.innerHTML += facilitatorOption;
  }


// POPULATE ACADEMIC YEAR

const yearOpt = document.getElementById('year');


let { data: academic_year, error6 } = await supabase
  .from('academic_year')
  .select('*')

  for ( let i = 0; i < academic_year.length; i++){
    let yearOption = `<option>${academic_year[i].name}</option>`;
  
    yearOpt.innerHTML += yearOption;
  }

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
      .from('timetable')
        .insert([
          { name: info.className , size: info.classSize, school_id: 2}
      ])

  console.log(data)
  console.log(error)
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  
  insertData();
  alert('New Timetable added successfully');
  noticeBox.style.display = 'none';

});