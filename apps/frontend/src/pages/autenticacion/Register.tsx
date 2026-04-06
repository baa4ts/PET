import { useForm } from "@tanstack/react-form"
import { Link } from "react-router"
import { validarCedula } from "../../helpers/validarCedula"
import { validarPassword } from "../../helpers/validarPassword"
import { validarTexto } from "../../helpers/validarTexto"
import { validarEmail } from "../../helpers/validarEmail"
import { validarTelefono } from "../../helpers/validarTelefono"
import { useState } from "react"
import { ActionRegister } from "../../actions/autenticacion/Register.action"
import { useStoreUsuario } from "../../store/Usuario.store"

export const Register = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setError] = useState<string>("");
    const { save } = useStoreUsuario()

    const Formulario = useForm({
        defaultValues: {
            cedula: "",
            primer_nombre: "",
            primer_apellido: "",
            email: "",
            telefono: "",
            password: ""
        },
        onSubmit: async ({ value }) => {
            setIsLoading(true);

            const response = await ActionRegister(value);

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
                    <h1 className="text-3xl">Register</h1>
                </div>

                {/* Cedula */}
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
                                <span className="text-xs text-red-500">{field.state.meta.errors[0]}</span>
                            )}
                        </div>
                    )}
                </Formulario.Field>

                {/* Primer nombre */}
                <Formulario.Field name="primer_nombre" validators={{ onChange: validarTexto, onSubmit: validarTexto }}>
                    {(field) => (
                        <div className="flex flex-col gap-1">
                            <input
                                type="text"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="Nombre"
                                disabled={isLoading}
                                className="w-full h-12 p-2 border-2 border-gray-600 disabled:opacity-50"
                            />
                            {field.state.meta.errors?.[0] && (
                                <span className="text-xs text-red-500">{field.state.meta.errors[0]}</span>
                            )}
                        </div>
                    )}
                </Formulario.Field>

                {/* Primer apellido */}
                <Formulario.Field name="primer_apellido" validators={{ onChange: validarTexto, onSubmit: validarTexto }}>
                    {(field) => (
                        <div className="flex flex-col gap-1">
                            <input
                                type="text"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="Apellido"
                                disabled={isLoading}
                                className="w-full h-12 p-2 border-2 border-gray-600 disabled:opacity-50"
                            />
                            {field.state.meta.errors?.[0] && (
                                <span className="text-xs text-red-500">{field.state.meta.errors[0]}</span>
                            )}
                        </div>
                    )}
                </Formulario.Field>

                {/* Email */}
                <Formulario.Field name="email" validators={{ onChange: validarEmail, onSubmit: validarEmail }}>
                    {(field) => (
                        <div className="flex flex-col gap-1">
                            <input
                                type="text"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="Email"
                                disabled={isLoading}
                                className="w-full h-12 p-2 border-2 border-gray-600 disabled:opacity-50"
                            />
                            {field.state.meta.errors?.[0] && (
                                <span className="text-xs text-red-500">{field.state.meta.errors[0]}</span>
                            )}
                        </div>
                    )}
                </Formulario.Field>

                {/* Telefono */}
                <Formulario.Field name="telefono" validators={{ onChange: validarTelefono, onSubmit: validarTelefono }}>
                    {(field) => (
                        <div className="flex flex-col gap-1">
                            <input
                                type="text"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="Telefono"
                                disabled={isLoading}
                                className="w-full h-12 p-2 border-2 border-gray-600 disabled:opacity-50"
                            />
                            {field.state.meta.errors?.[0] && (
                                <span className="text-xs text-red-500">{field.state.meta.errors[0]}</span>
                            )}
                        </div>
                    )}
                </Formulario.Field>

                {/* Password */}
                <Formulario.Field name="password" validators={{ onChange: validarPassword, onSubmit: validarPassword }}>
                    {(field) => (
                        <div className="flex flex-col gap-1">
                            <input
                                type="password"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="Contraseña"
                                disabled={isLoading}
                                className="w-full h-12 p-2 border-2 border-gray-600 disabled:opacity-50"
                            />
                            {field.state.meta.errors?.[0] && (
                                <span className="text-xs text-red-500">{field.state.meta.errors[0]}</span>
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
                    className="w-full h-12 border-2 mt-5 cursor-pointer
                               hover:bg-gray-100 active:bg-gray-200 transition-colors
                               disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Cargando..." : "Registrarse"}
                </button>

                <Link to={{ pathname: "/login" }} className="text-center">
                    <p>Ya tenes cuenta? Ingresar</p>
                </Link>

            </form>
        </section>
    )
}