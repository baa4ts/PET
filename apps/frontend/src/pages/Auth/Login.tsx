import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { validateEmail } from '@/helpers/validatos/validateEmail'
import { Client } from '@/providers/Client.provider'

export const Login = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false);

    const Formulario = useForm({
        defaultValues: {
            email: "",
            password: ""
        },

        onSubmit: async ({ value }) => {
            setLoading(true);

            try {
                const { error } = await Client.signIn.email(value);

                if (error) return;

                navigate("/");
            } finally {
                setLoading(false);
            }
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
                <Formulario.Field name='email' validators={{ onBlur: validateEmail, onSubmit: validateEmail }}>
                    {(F) => (
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                autoComplete="email"
                                disabled={loading}
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
                            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                            <Input
                                autoComplete="current-password"
                                disabled={loading}
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

                <button
                    className="bg-black text-white py-2 rounded flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={loading}
                    type="submit"
                >
                    {loading && (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
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