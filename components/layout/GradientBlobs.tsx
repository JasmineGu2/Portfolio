'use client'

export default function GradientBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Pastel gradient blobs */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-30 animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(255, 182, 193, 0.4) 0%, rgba(255, 182, 193, 0) 70%)',
          top: '10%',
          left: '5%',
          animationDelay: '0s',
        }}
      />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-25 animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(173, 216, 230, 0.4) 0%, rgba(173, 216, 230, 0) 70%)',
          top: '20%',
          right: '10%',
          animationDelay: '2s',
        }}
      />
      <div 
        className="absolute w-[450px] h-[450px] rounded-full blur-[120px] opacity-30 animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(221, 160, 221, 0.4) 0%, rgba(221, 160, 221, 0) 70%)',
          bottom: '15%',
          left: '15%',
          animationDelay: '4s',
        }}
      />
      <div 
        className="absolute w-[550px] h-[550px] rounded-full blur-[120px] opacity-25 animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(152, 251, 152, 0.4) 0%, rgba(152, 251, 152, 0) 70%)',
          bottom: '25%',
          right: '5%',
          animationDelay: '6s',
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-30 animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(255, 218, 185, 0.4) 0%, rgba(255, 218, 185, 0) 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animationDelay: '1s',
        }}
      />
      <div 
        className="absolute w-[480px] h-[480px] rounded-full blur-[120px] opacity-25 animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(176, 224, 230, 0.4) 0%, rgba(176, 224, 230, 0) 70%)',
          top: '70%',
          left: '30%',
          animationDelay: '3s',
        }}
      />
      <div 
        className="absolute w-[520px] h-[520px] rounded-full blur-[120px] opacity-30 animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(255, 192, 203, 0.4) 0%, rgba(255, 192, 203, 0) 70%)',
          top: '30%',
          right: '30%',
          animationDelay: '5s',
        }}
      />
    </div>
  )
}

