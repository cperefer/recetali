export default function LoginPage() {
  return (
    <div className="h-3/5 md:h-4/5 w-4/5 md:w-1/3 border-2 border-white rounded-2xl ">
      <form className="h-full flex flex-col justify-around">
        <div className="h-2/5"></div>
        <div className="h-3/5 flex flex-col justify-around">
          <div className="flex flex-col items-center">
            <input
              className="border-2 border-gray-400 rounded-sm w-3/5 pl-1"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <div>
            <div className="flex flex-col items-center">
              <input
                className="border-2 border-gray-400 rounded-sm w-3/5 pl-1"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="text-right pr-2 pt-2">
              <p className="text-xs md:text-sm">
                ¿Has olvidado tu contraseña? Haz click aquí
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button className="border-2 border-white w-25 h-7.5 rounded-2xl text-black bg-white">
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
