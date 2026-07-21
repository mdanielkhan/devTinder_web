const Footer = () => {
  return (
    <footer className="border-t border-base-300/60 bg-base-100">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-base-content/50">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-display font-bold text-[10px]">
            D
          </span>
          <span>
            <span className="text-base-content/70 font-medium">GitMatch</span>{" "}
            — connect with developers who ship.
          </span>
        </div>
        <p>© {new Date().getFullYear()} GitMatch. Built for devs, by devs.</p>
      </div>
    </footer>
  )
}

export default Footer
