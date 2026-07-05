const PageGridBackground = () => (
  <div
    className="absolute inset-0 pointer-events-none z-0"
    style={{
      backgroundImage: `
        linear-gradient(to right, hsl(var(--foreground) / 0.008) 1px, transparent 1px),
        linear-gradient(to bottom, hsl(var(--foreground) / 0.008) 1px, transparent 1px)
      `,
      backgroundSize: '32px 32px',
    }}
    aria-hidden
  />
);

export default PageGridBackground;
