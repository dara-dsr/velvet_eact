export default function Container({ children, As = 'div', className }) {
  return <As className={'mx-auto max-w-7xl lg:px-0 px-4 ' + className}>{children}</As>;
}
