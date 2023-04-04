import React from 'react'

export default function CodeCopyBtn({ children }) {
  const [copyOk, setCopyOk] = React.useState(false)

  const iconColor = copyOk ? '#22c55e' : '#ddd'
  const icon = copyOk ? 'fa-circle-check' : 'fa-copy'

  const handleClick = (e) => {
    navigator.clipboard.writeText(children[0].props.children[0])
    // console.log(children)
    setCopyOk(true)
    setTimeout(() => {
      setCopyOk(false)
    }, 500)
  }

  return (
    <div className='code-copy-btn'>
      <i
        className={`fas ${icon}`}
        onClick={handleClick}
        style={{ color: iconColor }}
      />
    </div>
  )
}
