import { useState, useEffect, useRef } from 'react'

import './App.css'

const KEYS = {
  A: { sound: 'boom', file: 'boom.wav', family: 'kick' },
  B: { sound: 'cabasa', file: 'cabasa.wav', family: 'perc' },
  C: { sound: 'clap', file: 'clap.wav', family: 'snare' },
  D: { sound: 'cowb', file: 'cowb.wav', family: 'perc' },
  E: { sound: 'crash', file: 'crash.wav', family: 'cymbal' },
  F: { sound: 'kick', file: 'kick.wav', family: 'kick' },
  G: { sound: 'openhat', file: 'openhat.wav', family: 'hat' },
  H: { sound: 'hihat', file: 'hihat.wav', family: 'hat' },
  I: { sound: 'hihat-closed', file: 'hihat-closed.wav', family: 'hat' },
  J: { sound: 'tink', file: 'tink.wav', family: 'perc' },
  K: { sound: 'snare', file: 'snare.wav', family: 'snare' },
  L: { sound: 'tom', file: 'tom.wav', family: 'tom' },
  M: { sound: 'ride', file: 'ride.wav', family: 'cymbal' },
  N: { sound: 'conga-h', file: 'conga-h.wav', family: 'tom' },
  O: { sound: 'conga-l', file: 'conga-l.wav', family: 'tom' },
  P: { sound: 'conga-m', file: 'conga-m.wav', family: 'tom' },
  Q: { sound: 'kick-alt', file: 'kick-alt.wav', family: 'kick' },
  R: { sound: 'snare-h', file: 'snare-h.wav', family: 'snare' },
  S: { sound: 'snare-l', file: 'snare-l.wav', family: 'snare' },
  T: { sound: 'stick-h', file: 'stick-h.wav', family: 'perc' },
  U: { sound: 'stick-l', file: 'stick-l.wav', family: 'perc' },
  V: { sound: 'tamb', file: 'tamb.wav', family: 'perc' },
  W: { sound: 'tom-h', file: 'tom-h.wav', family: 'tom' },
  X: { sound: 'tom-l', file: 'tom-l.wav', family: 'tom' },
  Y: { sound: 'tom-m', file: 'tom-m.wav', family: 'tom' },
  Z: { sound: 'stick-m', file: 'stick-m.wav', family: 'perc' },
}

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

const ROW_OFFSETS = ['offset-0', 'offset-1', 'offset-2']

function App() {
  const [activeKeys, setActiveKeys] = useState(() => new Set())
  const [lastHit, setLastHit] = useState(null)
  const [ready, setReady] = useState(false)
  const audioMap = useRef(new Map())
  const clearTimers = useRef(new Map())

  useEffect(() => {
    Object.entries(KEYS).forEach(([letter, { file }]) => {
      const audio = new Audio(file)
      audio.preload = 'auto'
      audioMap.current.set(letter, audio)
    })
    setReady(true)

    return () => {
      audioMap.current.forEach((audio) => {
        audio.pause()
        audio.src = ''
      })
      audioMap.current.clear()
      clearTimers.current.forEach((id) => clearTimeout(id))
      clearTimers.current.clear()
    }
  }, [])

  const triggerKey = (letter) => {
    if (!KEYS[letter]) return

    const audio = audioMap.current.get(letter)
    if (audio) {
      audio.currentTime = 0
      const playPromise = audio.play()
      if (playPromise?.catch) playPromise.catch(() => {})
    }

    setActiveKeys((prev) => {
      const next = new Set(prev)
      next.add(letter)
      return next
    })
    setLastHit({ letter, sound: KEYS[letter].sound, family: KEYS[letter].family })

    const existing = clearTimers.current.get(letter)
    if (existing) clearTimeout(existing)

    clearTimers.current.set(
      letter,
      setTimeout(() => {
        setActiveKeys((prev) => {
          const next = new Set(prev)
          next.delete(letter)
          return next
        })
        clearTimers.current.delete(letter)
      }, 140)
    )
  }

  useEffect(() => {
    const handlePress = (event) => {
      if (event.repeat) return
      const key = event.key.toUpperCase()
      if (key.length !== 1 || key < 'A' || key > 'Z') return
      event.preventDefault()
      triggerKey(key)
    }

    window.addEventListener('keydown', handlePress)
    return () => window.removeEventListener('keydown', handlePress)
  }, [])

  return (
    <div className="stage">
      <div className="stage-overlay" aria-hidden="true" />
      <div className="stage-glow" aria-hidden="true" />
      <div className="stage-grain" aria-hidden="true" />

      <main className="stage-content">
        <header className="brand-block">
          <div className="brand-topline">
            <span className={`status-dot ${ready ? 'is-live' : ''}`} />
            <span>Studio kit · 26 voices</span>
          </div>
          <h1 className="brand-mark">DRUM</h1>
          <p className="brand-tagline">
            Play the full QWERTY board. Hit keys or tap pads to build a groove.
          </p>
        </header>

        <section className="kit" aria-label="Drum keyboard">
          <div className="kit-header">
            <div className="kit-leds" aria-hidden="true">
              <span className={`led ${lastHit ? 'led-pulse' : ''}`} />
              <span className={`led led-amber ${lastHit ? 'led-pulse' : ''}`} />
              <span className="led led-dim" />
            </div>
            <div className="kit-meter" aria-live="polite">
              {lastHit ? (
                <>
                  <span className="meter-key">{lastHit.letter}</span>
                  <span className="meter-sound">{lastHit.sound}</span>
                </>
              ) : (
                <span className="meter-idle">Waiting for input</span>
              )}
            </div>
            <div className="kit-badge">A–Z</div>
          </div>

          <div className="keyboard-viewport">
            <div className="keyboard-rows">
              {ROWS.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`keyboard-row ${ROW_OFFSETS[rowIndex]}`}
                >
                  {row.map((letter) => {
                    const { sound, family } = KEYS[letter]
                    const isActive = activeKeys.has(letter)
                    return (
                      <button
                        key={letter}
                        type="button"
                        aria-label={`${letter}, ${sound}`}
                        data-family={family}
                        className={`pad ${isActive ? 'pad-active' : ''}`}
                        onPointerDown={(e) => {
                          e.preventDefault()
                          triggerKey(letter)
                        }}
                      >
                        <span className="pad-led" aria-hidden="true" />
                        <span className="pad-letter">{letter}</span>
                        <span className="pad-sound">{sound}</span>
                        <span className="pad-flash" aria-hidden="true" />
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="kit-footer">
            <span>Click or press keys</span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
