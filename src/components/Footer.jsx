function Footer() {
  return (
    <footer className="glass-panel text-blue-100/60 py-6 text-center mt-auto mb-4 mx-4 md:mx-8">
      <p className="text-sm font-light tracking-widest uppercase">
        &copy; {new Date().getFullYear()} WeatherCast. Premium Weather Experience.
      </p>
    </footer>
  );
}

export default Footer;