import './globals.css'

export const metadata = {
  title: 'The Golden Scissors | Premium Barber Shop',
  description: 'Book your next cut at the best shop in town.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-zinc-950 text-white antialiased">
      

        {children}

        {/* FOOTER */}
        <footer className="bg-zinc-950 border-t border-zinc-900 py-12">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="text-lg font-bold mb-4 italic">GOLDEN<span className="text-amber-500">SCISSORS</span></div>
              <p className="text-zinc-500 text-sm">Crafting confidence since 2024. Your neighborhood's premier grooming destination.</p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Quick Links</h4>
              <ul className="text-zinc-500 text-sm space-y-2 font-medium">
                <li><a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Follow Us</h4>
              <div className="flex gap-4 text-zinc-500 text-sm font-medium">
                <a href="#" className="hover:text-amber-500 transition-colors">Instagram</a>
                <a href="#" className="hover:text-amber-500 transition-colors">Facebook</a>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 text-zinc-700 text-xs font-mono">
            © 2026 THE GOLDEN SCISSORS. ALL RIGHTS RESERVED.
          </div>
        </footer>
      </body>
    </html>
  )
}