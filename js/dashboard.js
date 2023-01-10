import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('https://wvaxmbprbpvhulyzorsm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2YXhtYnByYnB2aHVseXpvcnNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE4NzE3NzgsImV4cCI6MTk4NzQ0Nzc3OH0.WQjjW0_dz5sojlbwNaPpDCeeKTEyNWlpMJaCHXRfE3M');

// Get all schools
let { data: school, error1 } = await supabase
  .from('school')
  .select('*')

let { data: student, error2 } = await supabase
  .from('student')
  .select('*')

  let { data: teacher, error3 } = await supabase
  .from('teacher')
  .select('*')

  let { data: parent, error4 } = await supabase
  .from('parent')
  .select('school_id')

  let { data: assignment, error } = await supabase
  .from('assignment')
  .select('school_id')

const numStudents = document.getElementById('num-students');
const schoolName = document.getElementById('school-name');
const numTeachers = document.getElementById('num-teachers');
const numParents = document.getElementById('num-parents');
const numAssignments = document.getElementById('num-assignments');

// Rendering data to client
numStudents.innerHTML = student.length;
numParents.innerHTML = parent.length;
numTeachers.innerHTML = teacher.length;

// schoolName.innerHTML = school[2].name;
// numAssignments.innerHTML = assignment.length;