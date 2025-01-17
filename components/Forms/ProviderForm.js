import { useForm } from "react-hook-form";

export default function ProviderForm({
  title,
  subtitle,
  onSubmit,
  organization,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">{title}</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              {subtitle}
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="input"
                    {...register("name", { required: true })}
                  />
                  <div className="my-2">
                    {/* errors will return when field validation fails  */}
                    {errors.name && <span>Este campo es oblitagorio</span>}
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    NIT
                  </label>
                  <input
                    type="text"
                    className="input"
                    {...register("nit", {
                      required: true,
                    })}
                    onKeyPress={(e) => {
                      if (e.key === "-") {
                        e.preventDefault();
                      }
                    }}
                  />
                  <div className="my-2">
                    {/* errors will return when field validation fails  */}
                    {errors.nit && <span>Este campo es oblitagorio</span>}
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Organización
                  </label>
                  <input
                    type="text"
                    className="input"
                    disabled
                    defaultValue={organization}
                  />
                </div>
              </div>
              <div className="w-full px-4">
                <button type="submit" className="button">
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
