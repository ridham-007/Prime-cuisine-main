
import { useNavigate } from 'react-router-dom';
import login from '../img/login.png';



function Login() {
  const navigate = useNavigate();


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
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
                  <input type="email" id="email" name="email" required className="w-full border rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
                  <input type="password" id="password" name="password" required className="w-full border rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                  <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300" onClick={() => navigate('/home')}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default Login;

