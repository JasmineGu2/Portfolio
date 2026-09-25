import VectorWordmark from '@/components/portfolio/wordmark/VectorWordmark'

export const metadata = {
  title: 'City Growth — Vector Wordmark Animation',
  description: 'Interactive vector wordmark animation visualizing growth and evolution.',
}

export default function CityGrowthPage() {
  return (
    <main style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}>
      <VectorWordmark
        text="GROWTH"
        font={{
          fontFamily: "Inter",
          fontWeight: 800,
          fontSize: "240px",
          letterSpacing: "-0.02em",
        }}
        background="#0e3b8f"
        textColor="#dce8f8"
        shade="#0a2a5e"
        accent="rgba(255, 165, 0, 0.4)"
        reach={320}
        speed={45}
        damping={65}
        handles={{ size: 120, spread: 32, labels: false }}
        style={{
          minHeight: '100vh',
          minWidth: '100%',
        }}
      />
    </main>
  )
}
