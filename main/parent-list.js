import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2NzIyNzIwMDAsCiAgICAiZXhwIjogMTgzMDAzODQwMAp9.ZVCUygy7EwO9z0QJy73nt7vxXLWSyahq_ot6dcZtgJM');

// Select all parents
let { data: parent, error } = await supabase
  .from('parent')
  .select('*,school(*)')


const tableBody = document.getElementById('table-body');
const schoolName =document.getElementById('school-name')
const schoolLogo = document.getElementById('logo')
for (var i in parent){

    var row = `<tr>  
                    <td style='padding: 20px;'>${parent[i].first_name}</td>
                    <td style='padding: 20px;'>${parent[i].email}</td>
                    <td style='padding: 20px;'>${parent[i].address}</td>
                    <td style='padding: 20px;'>${parent[i].phone}</td>
                    <td style='padding: 20px;'>${parent[i].city}</td>
               </tr>`

    tableBody.innerHTML += row;
    schoolName.innerHTML = parent[i]["school"]["name"];
    schoolLogo.src = `${parent[i]["school"]["photo_url"]}`;

}
