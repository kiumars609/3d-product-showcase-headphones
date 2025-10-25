import React, { useState } from 'react'
import Header from './components/Header'
import Product3D from './components/Product3D'
import ColorSelector from './components/ColorSelector'

export default function App(){
  const [color, setColor] = useState('#1db954')
  return (
    <div className="page">
      <Header />
      <main className="container showcase-grid">
        <section className="viewer-panel">
          <Product3D color={color} />
        </section>
        <aside className="info-panel">
          <h1>XR Headphones — Interactive 3D Showcase</h1>
          <p>Explore the model: rotate with mouse / touch, change color, and see smooth animations. Designed for portfolio & product pages.</p>
          <ColorSelector color={color} onChange={setColor} />
          <a className="btn primary" href="#demo">View details</a>
        </aside>
      </main>
    </div>
  )
}
