# Envelope | Architectural Yield Engine

## 🕵️ Discovery
**Vertical:** Architecture & Real Estate Development.
**Source:** Inspired by systemic friction in the "test-fitting" phase of architectural design. Architects and developers report spending 4-8+ hours manually cross-referencing zoning PDF codes (setbacks, height limits, lot coverage) before they can determine if a project is even financially viable on a given lot.

## 👤 The Persona
**The Architect:** Needs to quickly visualize the "buildable envelope" to start massing studies.
**The Real Estate Developer:** Needs to calculate "yield" (potential buildable square meters/units) during due diligence to see if a lot is worth the asking price.

## 🔥 The Pain
Zoning rules are often buried in 500-page PDF documents. Calculating the interaction between Front, Rear, and Side setbacks against the lot's dimensions is a tedious manual task. A single error in reading the code can lead to a project being rejected by the city after months of design work. 

Current BIM software (Revit, Archicad) requires a fully modeled site before these checks can be performed, which is "too heavy" for the rapid-fire feasibility stage.

## 🛠️ The Cure
**Envelope** is a lightweight, high-end visual simulator that provides an instant 3D "Buildable Volume" based on zoning inputs.
- **Real-time 3D Visualization:** See the buildable box shrink and grow as you adjust setbacks.
- **Yield Analysis:** Instant calculation of Buildable Footprint (m²) and Potential Volume (m³).
- **Feasibility Intelligence:** Provides an estimate of potential unit count based on average floor-to-ceiling volumes.
- **Visual Context:** Uses a 3D grid and scale markers to provide a sense of proportion without needing a CAD environment.

## 📂 Location
`workspace/projects/night-coding/2026-02-25-envelope/`

## ▶️ Action
```bash
npm install
npm run dev
```

## Tech Stack
- **React + TypeScript**
- **Three.js / @react-three/fiber** (3D Rendering)
- **Lucide React** (Icons)
- **Vanilla CSS** (High-end "Efinity" dark aesthetic)
- **Vite** (Build tool)
