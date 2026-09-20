export type PixelPattern = number[][]

export function PixelArtGrid({
  pattern,
  color,
  cellSize = 18,
}: {
  pattern: PixelPattern
  color: string
  cellSize?: number
}) {
  const rows = pattern.length
  const cols = pattern[0]?.length ?? 0

  return (
    <div
      className="grid gap-[3px]"
      style={{
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
      }}
    >
      {pattern.flatMap((row, rowIndex) =>
        row.map((filled, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="rounded-[2px] transition-colors duration-500"
            style={{ backgroundColor: filled ? color : 'var(--pf-canvas-alt)' }}
          />
        ))
      )}
    </div>
  )
}
