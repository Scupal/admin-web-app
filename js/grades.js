import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2NzIyNzIwMDAsCiAgICAiZXhwIjogMTgzMDAzODQwMAp9.ZVCUygy7EwO9z0QJy73nt7vxXLWSyahq_ot6dcZtgJM');

// Sellect all Grades
let { data: grades, error } = await supabase
  .from('grade')
  .select('*, student(*), subject(*)')


const tableBody = document.getElementById('table-body');
const numGrades = document.getElementById('num-grades');

for(let i = 0; i < grades.length; i++){
  var row = `<tr>
                <td>${grades[i]["student"]["first_name"]} ${grades[i]["student"]["last_name"]}</td>
                <td>${grades[i]["subject"]["name"]}</td>
                <td>${grades[i].classwork}</td>
                <td>${grades[i].homework}</td>
                <td>${grades[i].exams}</td>
                <td>${grades[i].midsem}</td>
                <td><strong>${grades[i].homework + grades[i].classwork + grades[i].exams + grades[i].midsem}</strong></td>
             <tr>`

  tableBody.innerHTML += row;
}

numGrades.innerHTML = grades.length;