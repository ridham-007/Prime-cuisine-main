import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import login from '../img/login.png';

const supabase = createClient(
  'https://nfblpmvorlfioljrgtud.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mYmxwbXZvcmxmaW9sanJndHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI0MzY4MTgsImV4cCI6MjAwODAxMjgxOH0.UwE-qUN7ex7tiNXj556Puy2vbpZGQWt0q-_vuPBw_YU'
);

function Login() {
  const navigate = useNavigate();
  supabase.auth.onAuthStateChange(async (event) => {
    if (event === 'SIGNED_IN') {
      navigate('/home');
    } else {
      navigate('/');
    }
  });

  return (
    <>
      <div className="container mx-auto flex justify-center py-8 ">
        <div className="flex-1 h-full max-w-full md:ml-20 md:mr-16 mt-4 bg-bgColor">
          <div className="flex flex-col md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img className="object-cover w-full h-full" src={login}
                alt="login" />
            </div>
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-72">
                <h1 className="mb-4 text-2xl font-bold text-center ">
                  Signup/Login to Your Account
                </h1>
                <Auth
                  supabaseClient={supabase}
                  appearance={{ theme: ThemeSupa }}
                  theme="light"
                  providers={["google"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

