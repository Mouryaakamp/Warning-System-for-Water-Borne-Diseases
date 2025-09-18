// Icon component for web using Material Icons

const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron_right',
  'globe': 'public',
  'person': 'person',
  'data': 'data_usage',
  'plus': 'add',
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}) {
  const iconName = MAPPING[name] || 'help_outline';
  
  return (
    <span 
      className="material-icons"
      style={{
        fontSize: size,
        color: color,
        ...style
      }}
    >
      {iconName}
    </span>
  );
}
