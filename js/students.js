import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjcyMjcyMDAwLAogICAgImV4cCI6IDE4MzAwMzg0MDAKfQ.KY_w-s7ZPYvUjdKPFv2mFyXRccXH0NIEEyn-4_dWFV4');

// Sellect all Students
let { data, error } = await supabase
  .from('student')
  .select('*, classroom(name), parent(first_name, last_name)')

const tableBody = document.getElementById('table-body');

for (var i in data){

    var row = `<tr>  
                    <td>${data[i].first_name}  ${data[i].last_name}</td>
                    <td>${data[i]["classroom"]}</td>
                    <td>${data[i]["parent"]["first_name"] + " " + data[i]["parent"]["last_name"]}</td>
                    <td><button style='padding: 8px 25px; background-color: dodgerblue; color: white;
                    border-radius: 5px; border: none; cursor: pointer;'">View Details</button></td>
               </tr>`

    tableBody.innerHTML += row;
}

const numLearners = document.getElementById('num-learners');

numLearners.innerHTML = data.length;

