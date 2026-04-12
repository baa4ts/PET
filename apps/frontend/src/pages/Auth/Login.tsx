import { useForm } from '@tanstack/react-form'
import { Link, useNavigate } from 'react-router'

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export const Login = () => {

    const navigate = useNavigate()

    const Formulario = useForm({
        defaultValues: {
            email: "",
            password: ""
        },

        onSubmit: async ({ value }) => {
            console.log("Login data:", value)
            navigate("/")
        }
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-600">
            <form
                className="w-full max-w-sm px-6 py-8 border bg-card shadow-sm flex flex-col gap-5"
                onSubmit={(e) => {
                    e.preventDefault()
                    Formulario.handleSubmit()
                }}
            >

                <h2>polotecno.melo - Login</h2>

                {/* EMAIL */}
                <Formulario.Field name='email'>
                    {(F) => (
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                autoComplete="email"
                                id="email"
                                onBlur={F.handleBlur}
                                onChange={(e) => F.handleChange(e.target.value)}
                                placeholder="usuario@email.com"
                                type="email"
                                value={F.state.value}
                            />
                            <FieldDescription>Ingresa tu correo.</FieldDescription>
                        </Field>
                    )}
                </Formulario.Field>

                {/* PASSWORD */}
                <Formulario.Field name='password'>
                    {(F) => (
                        <Field>
                            <FieldLabel htmlFor="password">Contrasena</FieldLabel>
                            <Input
                                autoComplete="current-password"
                                id="password"
                                onBlur={F.handleBlur}
                                onChange={(e) => F.handleChange(e.target.value)}
                                placeholder="******"
                                type="password"
                                value={F.state.value}
                            />
                            <FieldDescription>Ingresa tu contrasena.</FieldDescription>
                        </Field>
                    )}
                </Formulario.Field>

                <button className="bg-black text-white py-2 rounded" type="submit">
                    Iniciar sesion
                </button>

                {/* Link a registro */}
                <p className="text-sm text-center">
                    No tienes cuenta?{" "}
                    <Link className="text-blue-800 underline" to="/auth/register">
                        Registrate
                    </Link>
                </p>

            </form>
        </div>
    )
}