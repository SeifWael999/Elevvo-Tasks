import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme === 'dark' ? 'dark' : 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const scrollToId = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top border-bottom">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">TechSaaS</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
              <li className="nav-item"><button className="btn btn-link nav-link" onClick={() => scrollToId('features')}>Features</button></li>
              <li className="nav-item"><button className="btn btn-link nav-link" onClick={() => scrollToId('testimonials')}>Testimonials</button></li>
              <li className="nav-item"><button className="btn btn-link nav-link" onClick={() => scrollToId('pricing')}>Pricing</button></li>
              <li className="nav-item ms-lg-2"><button className="btn btn-primary" onClick={() => scrollToId('cta')}>Get started</button></li>
              <li className="nav-item ms-2"><button className="btn btn-outline-secondary" onClick={toggleTheme}>{theme === 'light' ? 'Dark' : 'Light'} mode</button></li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="py-5 py-lg-6 bg-body-tertiary border-bottom">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <h1 className="display-5 fw-bold">Launch faster with TechSaaS</h1>
              <p className="lead text-secondary">Simple analytics and automations that help your team grow without the busywork.</p>
              <div className="d-flex gap-2">
                <button className="btn btn-primary" onClick={() => scrollToId('cta')}>Start free trial</button>
                <button className="btn btn-outline-secondary" onClick={() => scrollToId('features')}>See features</button>
              </div>
              <p className="text-secondary small mt-2">Trusted by 5,000+ teams</p>
            </div>
            <div className="col-lg-5">
              <div className="ratio ratio-16x9 rounded-4 border overflow-hidden">
                <img
                  src="/images/home.png"
                  alt="Product preview"
                  className="w-100 h-100 object-fit-cover"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallback) {
                      e.currentTarget.dataset.fallback = 'true'
                      e.currentTarget.src = '/images/home.jpg'
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="features" className="py-5">
          <div className="container">
            <h2 className="h1 mb-4">Features</h2>
            <div className="row g-3 row-cols-1 row-cols-md-3">
              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="h5">Realtime dashboards</h3>
                    <p className="text-secondary mb-0">Live charts and alerts so you never miss a beat.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="h5">Workflow automation</h3>
                    <p className="text-secondary mb-0">Trigger actions from events with a visual builder.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="h5">Secure by default</h3>
                    <p className="text-secondary mb-0">Secure by default with SSO, audit logs, encryption in transit and at rest.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-5 bg-body-tertiary border-top border-bottom">
          <div className="container">
            <h2 className="h1 mb-4">Loved by teams</h2>
            <div className="row g-3 row-cols-1 row-cols-md-3">
              <div className="col"><blockquote className="blockquote p-3 bg-body rounded border h-100">“We shipped in weeks, not months.” <footer className="blockquote-footer mt-2">Lily</footer></blockquote></div>
              <div className="col"><blockquote className="blockquote p-3 bg-body rounded border h-100">“The insights are spot on.” <footer className="blockquote-footer mt-2">Colin</footer></blockquote></div>
              <div className="col"><blockquote className="blockquote p-3 bg-body rounded border h-100">“Our growth doubled.” <footer className="blockquote-footer mt-2">John</footer></blockquote></div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-5">
          <div className="container">
            <h2 className="h1 mb-4">Pricing</h2>
            <div className="row g-3 row-cols-1 row-cols-md-3">
              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="h5">Starter</h3>
                    <p className="fs-3 fw-semibold mb-2">$0 <span className="fs-6 text-secondary">/mo</span></p>
                    <ul className="text-secondary mb-3">
                      <li>Up to 3 projects</li>
                      <li>Basic automations</li>
                      <li>Email support</li>
                    </ul>
                    <button className="btn btn-outline-secondary">Choose Starter</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-primary shadow-sm">
                  <div className="card-body">
                    <h3 className="h5">Pro</h3>
                    <p className="fs-3 fw-semibold mb-2">$29 <span className="fs-6 text-secondary">/mo</span></p>
                    <ul className="text-secondary mb-3">
                      <li>Unlimited projects</li>
                      <li>Advanced automations</li>
                      <li>Priority support</li>
                    </ul>
                    <button className="btn btn-primary">Choose Pro</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="h5">Enterprise</h3>
                    <p className="fs-3 fw-semibold mb-2">Custom</p>
                    <ul className="text-secondary mb-3">
                      <li>Custom integrations</li>
                      <li>Dedicated SLA</li>
                      <li>Custom support</li>
                    </ul>
                    <button className="btn btn-outline-secondary">Contact sales</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="py-5 bg-body-tertiary border-top">
          <div className="container text-center">
            <h2 className="h1">Ready to get started?</h2>
            <p className="text-secondary">Join free for 14 days. No credit card required.</p>
            <form className="row g-2 justify-content-center" onSubmit={(e) => e.preventDefault()}>
              <div className="col-12 col-sm-7 col-md-6 col-lg-4">
                <input type="email" className="form-control" placeholder="Your email" required />
              </div>
              <div className="col-auto">
                <button className="btn btn-primary" type="submit">Create account</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-top py-4">
        <div className="container d-flex justify-content-end">
          <a href="#" className="text-decoration-none" onClick={() => scrollToId('')}>Back to top</a>
        </div>
      </footer>
    </>
  )
}

export default App
