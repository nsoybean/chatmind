import { FaCheck } from 'react-icons/fa'

const FeatureList = () => {
  const features = [
    'Use your personal API key',
    'Data stored locally',
    'No repetitive logins',
    'Useful prompts library',
    'Integrations',
    'Faster response',
    '...and more features!'
  ]

  return (
    <div style={{ display: 'flex', justifyContent: 'center ', gap: '20px' }}>
      {/* col 1 */}
      <ul style={{ listStyle: 'none' }}>
        {features.slice(0, Math.ceil(features.length / 2)).map((feature) => (
          <li key={feature} style={{ marginBottom: '5px' }}>
            <FaCheck style={{ color: '#22c55e', marginRight: '0.5rem' }} />
            {feature}
          </li>
        ))}
      </ul>
      {/* col 2 */}
      <ul style={{ listStyle: 'none' }}>
        {features.slice(Math.ceil(features.length / 2)).map((feature) => (
          <li key={feature} style={{ marginBottom: '5px' }}>
            <FaCheck style={{ color: '22c55e', marginRight: '0.5rem' }} />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FeatureList
