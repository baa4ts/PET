import { useForm } from '@tanstack/react-form'
import { Link, useNavigate } from 'react-router'

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { validateEmail } from '@/helpers/validatos/validateEmail'

export const Register = () => {

    const navigate = useNavigate()

    const Formulario = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },

        onSubmit: async ({ value }) => {
            console.log("Register data:", value)
            navigate("/auth/login")
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

                <h2>polotecno.melo - Register</h2>

                {/* NAME */}
                <Formulario.Field name='name'>
                    {(F) => (
                        <Field>
                            <FieldLabel htmlFor="name">Nombre</FieldLabel>
                            <Input
                                autoComplete="name"
                                id="name"
                                onBlur={F.handleBlur}
                                onChange={(e) => F.handleChange(e.target.value)}
                                placeholder="Juan Perez"
                                value={F.state.value}
                            />
                            <FieldDescription>Ingresa tu nombre completo.</FieldDescription>
                        </Field>
                    )}
                </Formulario.Field>

                {/* EMAIL */}
                <Formulario.Field name='email' validators={{ onBlur: validateEmail, onSubmit: validateEmail }}>
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
                            <FieldDescription style={{ color: F.state.meta.errors?.[0] ? 'red' : undefined }}>
                                {F.state.meta.errors?.[0] ?? 'Ingresa tu correo.'}
                            </FieldDescription>
                        </Field>
                    )}
                </Formulario.Field>

                {/* PASSWORD */}
                <Formulario.Field name='password'>
                    {(F) => (
                        <Field>
                            <FieldLabel htmlFor="password">Contrasena</FieldLabel>
                            <Input
                                autoComplete="new-password"
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
                    Crear cuenta
                </button>

                {/* Link a login */}
                <p className="text-sm text-center">
                    Ya tienes cuenta?{" "}
                    <Link className="text-blue-800 underline" to="/auth/login">
                        Iniciar sesion
                    </Link>
                </p>

            </form>
        </div>
    )
}