// Footer.jsx — tokens fixed, copy left as-is since it's placeholder
const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content border-t border-base-300 p-10">
      <nav>
        <h6 className="footer-title text-accent">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title text-accent">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title text-accent">Social</h6>
        <div className="grid grid-flow-col gap-4">
          {/* svg icons unchanged, fill-current already inherits text-base-content */}
        </div>
      </nav>
    </footer>
  )
}

export default Footer