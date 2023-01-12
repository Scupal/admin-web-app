import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2NzIyNzIwMDAsCiAgICAiZXhwIjogMTgzMDAzODQwMAp9.ZVCUygy7EwO9z0QJy73nt7vxXLWSyahq_ot6dcZtgJM');

// Sellect all Students
let { data, error } = await supabase
  .from('assignment')
  .select('*, classroom(*), subject(*), teacher(*)')

//  console.log(data);

const numAssignment = document.getElementById('num-assignments');
numAssignment.innerHTML = data.length;

const tableBody = document.getElementById('table-body');

for (var i in data){

    var row = `<tr>  
                    <td style='padding: 20px;'>${data[i].created_at}</td>
                    <td style='padding: 20px;'>${data[i].title}</td>
                    <td style='padding: 20px;'>${data[i].details}</td>
                    <td style='padding: 20px;'>${data[i]["classroom"]["name"]}</td>
                    <td style='padding: 20px;'>${data[i]["subject"]["name"]}</td>
                    <td style='padding: 20px;'>${data[i]["teacher"]["first_name"] + " " + data[i]["teacher"]["last_name"]}</td>
               </tr>` 

    tableBody.innerHTML += row;
}

