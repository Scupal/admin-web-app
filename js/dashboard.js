import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2NzIyNzIwMDAsCiAgICAiZXhwIjogMTgzMDAzODQwMAp9.ZVCUygy7EwO9z0QJy73nt7vxXLWSyahq_ot6dcZtgJM');

// import { number } from './index'; 

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
const numActivities = document.getElementById('num-activities');
const numClasses = document.getElementById('num-classes');

let { data: extra_service, error5 } = await supabase
  .from('extra_service')
  .select('*')

let { data: classroom, error6 } = await supabase
  .from('classroom')
  .select('*')

// Rendering data to client
numStudents.innerHTML = student.length;
numParents.innerHTML = parent.length;
numTeachers.innerHTML = teacher.length;
numActivities.innerHTML = extra_service.length;
numClasses.innerHTML = classroom.length;

// schoolName.innerHTML = school[2].name;
// numAssignments.innerHTML = assignment.length;