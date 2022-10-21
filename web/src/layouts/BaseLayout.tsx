type BaseLayoutProps = {
  children: React.ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">Base Layout</h1>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export { BaseLayout }
