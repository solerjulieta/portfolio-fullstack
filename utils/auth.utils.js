/**
 * Identifica si el identificador proporcionado es un email o usuario.
 * @param {string} identifier - El email o nombre de usuario.
 * @returns {{email: string | null, user: string | null}} Objeto con uno de los campos.
 */

export function identifyIdentifierType(identifier)
{
    if(!identifier){
        return { email: null, user: null }
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)

    return {
        email: isEmail ? identifier : null,
        user: !isEmail ? identifier : null,
    }
}