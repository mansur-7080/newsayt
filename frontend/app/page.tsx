export default function HomePage() {
  return (
    <div>
      <h1 style={{fontSize: '48px', textAlign: 'center', marginTop: '50px', color: '#ff6a00'}}>
        🎉 MEGAMART ISHLAYAPTI!
      </h1>
      <p style={{fontSize: '24px', textAlign: 'center', marginTop: '20px'}}>
        Professional E-commerce Platform
      </p>
      <div style={{textAlign: 'center', marginTop: '40px'}}>
        <a href="/test" style={{
          display: 'inline-block',
          padding: '15px 30px',
          backgroundColor: '#ff6a00',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          marginRight: '10px'
        }}>
          Test Sahifa
        </a>
        <a href="/shop" style={{
          display: 'inline-block',
          padding: '15px 30px',
          backgroundColor: '#0064ff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '18px'
        }}>
          Dokonga Otish
        </a>
      </div>
      <div style={{maxWidth: '800px', margin: '50px auto', padding: '20px'}}>
        <h2 style={{fontSize: '32px', marginBottom: '20px'}}>Sayt Xususiyatlari:</h2>
        <ul style={{fontSize: '18px', lineHeight: '1.8'}}>
          <li>✅ Next.js 14 - Eng songgi texnologiya</li>
          <li>✅ TypeScript - Type-safe kod</li>
          <li>✅ Tailwind CSS - Zamonaviy dizayn</li>
          <li>✅ Responsive - Barcha qurilmalarda ishlaydi</li>
          <li>✅ Fast Loading - Tezkor yuklanish</li>
        </ul>
      </div>
    </div>
  )
} 