export default function GlassCard({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`glass rounded-3xl ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
