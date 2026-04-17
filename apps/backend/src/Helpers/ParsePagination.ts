import type { ParsedQs } from "qs"

export const parsePagination = (query: ParsedQs) => {
    const limit = isNaN(parseInt(query.limit as string)) ? undefined : parseInt(query.limit as string)
    const offset = isNaN(parseInt(query.offset as string)) ? 0 : parseInt(query.offset as string)
    return { limit, offset }
}