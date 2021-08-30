
export default function Form({ errorMessage, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          Name
        </label>
        <input
          type="text"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Name"
          name="name"
          required
        />
      </div>

      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          Email
        </label>
        <input
          type="email"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Email"
          name="email"
          required
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
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Password"
          name="password"
          required
        />
      </div>

      <div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            id="customCheckLogin"
            type="checkbox"
            required
            className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
          />
          <span className="ml-2 text-sm font-semibold text-blueGray-600">
            I agree with the{' '}
            <button className="text-lightBlue-500" required>
              Privacy Policy
            </button>
          </span>
        </label>
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="text-center mt-6">
        <button
          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="submit"
        >
          Create Account
        </button>
      </div>
    </form>
  );
}