import Link from "next/link";
// layout for page
import Auth from 'layouts/Auth.js';

export default function SignUp({ children }) {
  return (
    <Auth>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Registrarse
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {children}
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link href="/auth/login">
                  <button className="text-blueGray-200">
                    <small>Iniciar Sesión</small>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Auth>
  );
}
