import { FaCheck } from 'react-icons/fa'

const FeatureList = () => {
  const features = [
    'Pay once, use forever',
    'Data stored locally',
    'No repeated logins required',
    'Ask more optimized questions with prompts',
    'Integration',
    'Fast loading speed',
    'Mobile-friendly'
  ]

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* col 1 */}
      <ul style={{ listStyle: 'none', marginRight: '2rem' }}>
        {features.slice(0, Math.ceil(features.length / 2)).map((feature) => (
          <li key={feature} style={{ display: 'flex' }}>
            <FaCheck style={{ color: '#22c55e', marginRight: '0.5rem' }} />
            {feature}
          </li>
        ))}
      </ul>
      {/* col 2 */}
      <ul style={{ listStyle: 'none' }}>
        {features.slice(Math.ceil(features.length / 2)).map((feature) => (
          <li key={feature} style={{ display: 'flex' }}>
            <FaCheck style={{ color: '22c55e', marginRight: '0.5rem' }} />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FeatureList
