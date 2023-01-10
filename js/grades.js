import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('https://wvaxmbprbpvhulyzorsm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2YXhtYnByYnB2aHVseXpvcnNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE4NzE3NzgsImV4cCI6MTk4NzQ0Nzc3OH0.WQjjW0_dz5sojlbwNaPpDCeeKTEyNWlpMJaCHXRfE3M');

// Sellect all Grades
let { data: grades, error } = await supabase
  .from('grade')
  .select('*')

const tableBody = document.getElementById('table-body');
const numGrades = document.getElementById('num-grades');

// for (var i in grades){

    var row = `<tr>  
                    <td>Adel Arthur</td>
                    <td>Class 1</td>
                    <td>20</td>
                    <td>20</td>
                    <td>10</td>
                    <td>20</td>
                    <td>10</td>
                    <td><strong>A</strong></td>
               </tr>`

    // tableBody.innerHTML += row;
// }

numGrades.innerHTML = 1;

let downloadGrade = document.getElementById('download-grade');

downloadGrade.onclick = () => {
    alert("Download Report?");
}

