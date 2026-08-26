export default function Footer() {
  return (
    <footer id="contact" className="border-t border-steel2 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <p className="font-display font-bold text-lg mb-2">Kingdom AutoMobile Dealership</p>
          <p className="text-silver">
            Buy your vehicle at the comfort of your home, office or anywhere in Ghana
          </p>
        </div>
        <div>
          <p className="text-offwhite font-medium mb-2">Contact</p>
          <p className="text-silver">kingzamazingimport@gmail.com</p>
          <p className="text-silver">+233 55 188 9899</p>
        </div>
        <div>
          <p className="text-offwhite font-medium mb-2">Shipping ports</p>
          <p className="text-silver port-tag">DXB · JEA · HOU · SHA</p>
        </div>
      </div>
      <div className="text-center text-xs text-silver pb-6">
        © {new Date().getFullYear()} Kingdom AutoMobile Dealership. All rights reserved.
      </div>
    </footer>
  );
}
