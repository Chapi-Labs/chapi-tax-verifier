

export default function Form({ errorMessage, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Email"
        />
      </div>

      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Password"
        />
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="text-center mt-6">
        <button
          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}