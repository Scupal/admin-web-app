import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('http://109.74.192.221:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2NzIyNzIwMDAsCiAgICAiZXhwIjogMTgzMDAzODQwMAp9.ZVCUygy7EwO9z0QJy73nt7vxXLWSyahq_ot6dcZtgJM');

  export const authenticate = async () => {
        const form = document.querySelector('.admin-form');
        const formData = new FormData(form);

        const info = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        let { data, error } = await supabase.auth.signInWithPassword({
            email: info.email,
            password: info.password
        })

        if(!error){
            alert('Login Successful!')
            window.open('../main/dashboard.html', '_self')
        }
        else{
            alert('Wrong credentials')
        }

        console.log(data)
        console.log(error)

        let { data: admin, error1 } = await supabase
        .from('admin')
        .select('*')
        .eq('auth_id', data.user.id)

        console.log(admin)
        console.log(error1)

        const adminAuth = admin[0].school_id;
        return adminAuth;

  }


  const form = document.querySelector('.admin-form');
  // Onclick listener for submit
  form.addEventListener('submit', (event) => {
  event.preventDefault();

        const authentication = authenticate()
        authentication;
});