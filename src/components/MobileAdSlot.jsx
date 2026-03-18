function MobileAdSlot({ title = 'Sponsored', subtitle = '320x100 mobile banner', tone = 'blue', className = '' }) {
    const toneClasses = {
        blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-900',
        green: 'from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-900',
        amber: 'from-amber-50 to-amber-100 border-amber-200 text-amber-900'
    };

    const selectedTone = toneClasses[tone] || toneClasses.blue;

    return (
        <div className={`md:hidden rounded-2xl border bg-gradient-to-r ${selectedTone} shadow-sm aspect-square w-full max-w-[220px] mx-auto flex flex-col justify-center items-center p-4 ${className}`} style={{ minHeight: '200px', minWidth: '200px' }}>
            <div className="flex flex-col items-center justify-center w-full h-full">
                <p className="text-[15px] font-semibold uppercase tracking-wide opacity-75 mb-1">Ad</p>
                <p className="text-lg font-bold leading-tight text-center">{title}</p>
                <p className="mt-2 text-base opacity-80 text-center">{subtitle}</p>
                <div className="rounded-lg bg-white/70 px-4 py-2 text-[14px] font-semibold mt-4">
                    Sponsored
                </div>
            </div>
        </div>
    );
}

export default MobileAdSlot;
