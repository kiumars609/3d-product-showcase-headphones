import React from 'react'
export default function ColorSelector({color, onChange}){
  const presets = ['#1db954','#ff4757','#6ee7b7','#3b82f6','#a78bfa','#f59e0b']
  return (
    <div className="color-selector">
      <h3>Choose color</h3>
      <div className="swatches">
        {presets.map(c=> (
          <button key={c} className={'swatch'+(c===color?' active':'')} style={{background:c}} onClick={()=>onChange(c)} aria-label={c} />
        ))}
      </div>
    </div>
  )
}
