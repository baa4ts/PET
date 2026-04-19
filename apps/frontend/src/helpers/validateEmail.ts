type Params = { value: string }

const ALLOWED_DOMAINS = new Set(["admin.com", "gmail.com", "googlemail.com", "proton.me", "protonmail.com"])

export function validateEmail({ value }: Params): string | undefined {
    const email = value.trim().toLowerCase()

    if (!email) {
        return "email requerido"
    }

    // validacion sin regex (evita SonarJS issue)
    const atIndex = email.indexOf("@")
    if (atIndex === -1) {
        return "email invalido"
    }

    const local = email.slice(0, atIndex)
    const domain = email.slice(atIndex + 1)

    if (!local || !domain) {
        return "email invalido"
    }

    if (local.includes(" ") || domain.includes(" ")) {
        return "email invalido"
    }

    if (!domain.includes(".")) {
        return "email invalido"
    }

    // evita cosas tipo "a@@b.com"
    if (email.split("@").length !== 2) {
        return "email invalido"
    }

    if (!ALLOWED_DOMAINS.has(domain)) {
        return "dominio no permitido"
    }

    return undefined
}
