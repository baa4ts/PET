import { memo } from "react"
import { BookmarkX, Badge } from "lucide-react"

interface Props {
    isLoading: boolean
    isError: boolean
}

export const StatusOverlay = memo(({ isLoading, isError }: Props) => {
    return (
        <div className="w-full h-full bg-zinc-700 animate-pulse flex flex-col items-center justify-center">
            {isError && (
                <>
                    <BookmarkX size={120} />
                    <h2 className="text-3xl">Hubo un error</h2>
                </>
            )}
            {isLoading && (
                <>
                    <Badge size={120} />
                    <h2 className="text-3xl">Cargando . . .</h2>
                </>
            )}
        </div>
    )
})