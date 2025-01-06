export const Tooltip = ({ text, x, y, fontSize, closerTootTip }) => {
  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
        pointerEvents: 'none',
        color: 'black',
        fontSize: fontSize,
        left: `${x + Math.floor(Math.random() * closerTootTip) + closerTootTip}px`,
        top: `${y - Math.floor(Math.random() * closerTootTip) + closerTootTip}px`,
      }}
    >
      <strong>{text}</strong>
    </div>
  )
}
