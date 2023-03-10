import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2NzIyNzIwMDAsCiAgICAiZXhwIjogMTgzMDAzODQwMAp9.ZVCUygy7EwO9z0QJy73nt7vxXLWSyahq_ot6dcZtgJM');

// Sellect all Students
let { data, error } = await supabase
  .from('student')
  .select('*, classroom(*), parent(first_name, last_name)')

const tableBody = document.getElementById('table-body');
// console.log(data[i]["classroom"])
for (var i in data){

    var row = `<tr>  
                    <td>${data[i].first_name}  ${data[i].last_name}</td>
                    <td>${data[i]["parent"]["first_name"] + " " + data[i]["parent"]["last_name"]}</td>
               </tr>`

    tableBody.innerHTML += row;
}

const numLearners = document.getElementById('num-learners');

numLearners.innerHTML = data.length;

