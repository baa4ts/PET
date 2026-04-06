import { useForm } from "@tanstack/react-form";
import { validarCedula } from "../../helpers/validarCedula";
import { validarPassword } from "../../helpers/validarPassword";
import { Link } from "react-router";
import { useState } from "react";
import { ActionLogin } from "../../actions/autenticacion/Login.action";
import { useStoreUsuario } from "../../store/Usuario.store";

export const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<string>("");
  const { save } = useStoreUsuario()

  const Formulario = useForm({
    defaultValues: {
      cedula: "",
      password: ""
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);

      const response = await ActionLogin(value);

      if (!response.ok) {
        setError(response.message);
        setIsLoading(false);
        return;
      }

      save(response.datos.token, response.datos.permisos);
      setIsLoading(false);
    }
  })

  return (
    <section className="w-full h-full flex flex-col items-center justify-center">

      <form
        onSubmit={(e) => (e.preventDefault(), Formulario.handleSubmit())}
        className="w-96 p-5 flex flex-col gap-2 border-2 font-mono"
      >

        <div className="h-20 flex items-center justify-center">
          <h1 className="text-3xl font-mono">Login</h1>
        </div>

        {/* Input para la cedula */}
        <Formulario.Field name="cedula" validators={{ onChange: validarCedula, onSubmit: validarCedula }}>
          {(field) => (
            <div className="flex flex-col gap-1">
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Cedula"
                disabled={isLoading}
                className="w-full h-12 p-2 border-2 border-gray-600 disabled:opacity-50"
              />
              {field.state.meta.errors?.[0] && (
                <span className="font-mono text-xs text-red-500">{field.state.meta.errors[0]}</span>
              )}
            </div>
          )}
        </Formulario.Field>

        {/* Input para la contrasenia */}
        <Formulario.Field name="password" validators={{ onChange: validarPassword, onSubmit: validarPassword }}>
          {(field) => (
            <div className="flex flex-col gap-1">
              <input
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Contrasena"
                disabled={isLoading}
                className="w-full h-12 p-2 border-2 border-gray-600 disabled:opacity-50"
              />
              {field.state.meta.errors?.[0] && (
                <span className="font-mono text-xs text-red-500">{field.state.meta.errors[0]}</span>
              )}
            </div>
          )}
        </Formulario.Field>

        {isError && (
          <div className="w-full h-12 border-2 font-mono p-2 flex items-center justify-center">
            <span className="font-mono text-xs text-red-500">{isError}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          onClick={() => navigator.vibrate?.(50)}
          className="w-full h-12 border-2 font-mono cursor-pointer
                     hover:bg-gray-100 active:bg-gray-200 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Cargando..." : "Login"}
        </button>

        <Link to={{ pathname: "/register" }} className="text-center">
          <p>No tenes cuenta? Registrate</p>
        </Link>

      </form>
    </section>
  )
}