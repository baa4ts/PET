import type { ParsedQs } from "qs"

export const parsePagination = (query: ParsedQs) => {
    const limit = parseInt(query.limit as string)
    const offset = parseInt(query.offset as string)
    return {
        limit: isNaN(limit) ? undefined : limit,
        offset: isNaN(offset) ? 0 : offset,
    }
}

export const parseCustomArg = (query: ParsedQs, arg: string) => {
    return query[arg] as string | undefined
}