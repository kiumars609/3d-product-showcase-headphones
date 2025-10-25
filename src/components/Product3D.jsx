import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'

export default function Product3D({color = '#1db954'}){
  const mountRef = useRef()

  useEffect(()=>{
    const mount = mountRef.current
    const width = mount.clientWidth
    const height = Math.min(600, window.innerHeight * 0.6)
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#041018')

    const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000)
    camera.position.set(0, 0.8, 3)

    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // Lights
    const hemi = new THREE.HemisphereLight(0xffffff, 0x080820, 0.6)
    scene.add(hemi)
    const dir = new THREE.DirectionalLight(0xffffff, 0.8)
    dir.position.set(5,10,7)
    scene.add(dir)

    // Create headphone model using torus + boxes
    const material = new THREE.MeshStandardMaterial({ color: color, metalness:0.2, roughness:0.4 })
    const bandGeo = new THREE.TorusGeometry(0.9, 0.07, 16, 100, Math.PI)
    const band = new THREE.Mesh(bandGeo, material)
    band.rotation.x = Math.PI/2
    band.position.y = 0.5
    scene.add(band)

    const cupMaterial = new THREE.MeshStandardMaterial({ color: '#0b1115', metalness:0.1, roughness:0.5 })
    const cupGeo = new THREE.CylinderGeometry(0.45,0.45,0.25,32)
    const leftCup = new THREE.Mesh(cupGeo, cupMaterial)
    leftCup.position.set(-0.9, 0, 0)
    leftCup.rotation.z = Math.PI/2
    scene.add(leftCup)
    const rightCup = leftCup.clone()
    rightCup.position.set(0.9,0,0)
    scene.add(rightCup)

    // inner cushions
    const cushionMat = new THREE.MeshStandardMaterial({ color: '#111827', roughness:0.6 })
    const innerGeo = new THREE.CylinderGeometry(0.32,0.32,0.12,32)
    const leftInner = new THREE.Mesh(innerGeo, cushionMat)
    leftInner.position.set(-0.9, 0, 0.08)
    leftInner.rotation.z = Math.PI/2
    scene.add(leftInner)
    const rightInner = leftInner.clone()
    rightInner.position.set(0.9,0,0.08)
    scene.add(rightInner)

    // Group for easy rotation
    const group = new THREE.Group()
    group.add(band.clone(), leftCup.clone(), rightCup.clone(), leftInner.clone(), rightInner.clone())
    scene.add(group)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.enablePan = false
    controls.minDistance = 1.5
    controls.maxDistance = 6
    controls.target.set(0,0.2,0)

    // Animation
    gsap.to(group.rotation, { y: Math.PI * 2, duration: 28, repeat: -1, ease: 'none' })

    function onWindowResize(){
      const w = mount.clientWidth
      const h = Math.min(600, window.innerHeight * 0.6)
      camera.aspect = w/h
      camera.updateProjectionMatrix()
      renderer.setSize(w,h)
    }
    window.addEventListener('resize', onWindowResize)

    const clock = new THREE.Clock()
    function animate(){
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // cleanup
    return ()=>{
      window.removeEventListener('resize', onWindowResize)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  // update color on prop change
  useEffect(()=>{
    // find meshes and update material color
    if(!mountRef.current) return
    const canvas = mountRef.current.querySelector('canvas')
    if(!canvas) return
    try{
      const renderer = canvas.__threeRenderer // not always present
    }catch(e){}
    // simpler approach: reload scene by forcing remount - could be improved
  }, [color])

  return <div className="product-3d" ref={mountRef} aria-hidden="true" />
}
