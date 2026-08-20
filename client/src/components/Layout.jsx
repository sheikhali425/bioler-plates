import Navbar from './Navbar'

export default function Layout({ children, wide = false }) {
  return (
    <div className="shell">
      <Navbar />
      <main className={wide ? 'main main-wide' : 'main'}>{children}</main>
      <footer className="footer">
        <p>MERN Kit · MongoDB · Express · React · Node</p>
      </footer>
    </div>
  )
}
