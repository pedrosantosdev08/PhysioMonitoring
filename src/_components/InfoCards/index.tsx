interface InfoCardProps {
    id: number;
    title: string;
    infoNumber: number | string;
}

export function InfoCards({ title, infoNumber }: InfoCardProps) {
    return (
        
        <div className="flex flex-col justify-between gap-4 p-6 bg-(--bg-card) rounded-xl w-full border border-zinc-100 dark:border-zinc-800/50 shadow-md hover:shadow-xl hover:border-(--accent-color) hover:-translate-y-1 transition-all duration-300 ease-in-out group">
            <div>
                <h2 className="text-sm font-semibold tracking-wide text-zinc-500 dark:text-zinc-400 uppercase">
                    {title}
                </h2>
                <span className="text-4xl font-extrabold  mt-2 block tracking-tight  transition-colors">
                    {infoNumber}
                </span>
            </div>
            <div className="h-1 w-0 bg-(--accent-color) rounded-full group-hover:w-full transition-all duration-300" />
        </div>
    );
}