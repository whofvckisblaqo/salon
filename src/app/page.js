"use client"; 
import { useEffect, useState } from 'react';

export default function Home() {
  // 1. STATE
  const [isOpen, setIsOpen] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

  const barbers = [
    { name: "Leo 'The Blade'", role: "Master Barber", img: "https://images.pexels.com/photos/1319461/pexels-photo-1319461.jpeg?auto=compress&cs=tinysrgb&w=400", specialty: "Fades & Tapers" },
    { name: "Sarah 'Style'", role: "Senior Stylist", img: "https://images.pexels.com/photos/3992870/pexels-photo-3992870.jpeg?auto=compress&cs=tinysrgb&w=400", specialty: "Color & Shaves" },
    { name: "Marcus", role: "Classic Barber", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400", specialty: "Traditional Cuts" },
  ];

  const categorizedStyles = [
    {
      category: "Short & Sharp",
      styles: [
        { id: 'fade', name: 'Skin Fade', img: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 'buzz', name: 'Buzz Cut', img: 'https://images.pexels.com/photos/3993323/pexels-photo-3993323.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 'crew', name: 'Crew Cut', img: 'https://images.pexels.com/photos/2521978/pexels-photo-2521978.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 'fringe', name: 'French Crop', img: 'https://images.pexels.com/photos/2040189/pexels-photo-2040189.jpeg?auto=compress&cs=tinysrgb&w=400' },
      ]
    },
    {
      category: "Long & Modern",
      styles: [
        { id: 'long', name: 'Long Flow', img: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 'pompadour', name: 'Pompadour', img: 'https://images.pexels.com/photos/3319891/pexels-photo-3319891.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 'mullet', name: 'Modern Mullet', img: 'https://images.pexels.com/photos/1453008/pexels-photo-1453008.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 'sidepart', name: 'Side Part', img: 'https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 'topknot', name: 'Top Knot', img: 'https://images.pexels.com/photos/897262/pexels-photo-897262.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 'braids', name: 'Braids', img: 'https://images.pexels.com/photos/3211476/pexels-photo-3211476.jpeg?auto=compress&cs=tinysrgb&w=400' },
      ]
    }
  ];

  const services = [
    { name: "Classic Cut", price: "$35", desc: "Precision scissor or clipper work." },
    { name: "Beard Sculpt", price: "$25", desc: "Hot towel and razor line-up." },
    { name: "The Executive", price: "$55", desc: "The full treatment: Cut & Beard." },
  ];

  const faqs = [
    { q: "How do I book an appointment?", a: "You can book directly on this page by clicking the 'Book Now' button. Choose your barber, preferred style, date, and time — and you're all set. You'll receive a confirmation via WhatsApp or email shortly after." },
    { q: "Can I walk in without a booking?", a: "Walk-ins are welcome subject to availability! However, we strongly recommend booking in advance to secure your preferred barber and time slot, especially on weekends." },
    { q: "How long does a typical appointment take?", a: "A Classic Cut takes around 30–45 minutes. A Beard Sculpt is about 20–30 minutes. The Executive (Cut + Beard) usually runs 60–75 minutes. Times may vary based on hair length and style complexity." },
    { q: "What's your cancellation policy?", a: "We ask for at least 24 hours notice if you need to cancel or reschedule. Late cancellations or no-shows may be subject to a fee to respect our barbers' time." },
    { q: "Is there parking nearby?", a: "There's a free public car park directly behind the shop on Grooming Blvd, with 2-hour free parking. Street parking is also available on adjacent roads." },
  ];

  const galleryImages = [
    { id: 1, url: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Mid Fade' },
    { id: 2, url: 'https://images.pexels.com/photos/2805412/pexels-photo-2805412.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Classic Taper' },
    { id: 3, url: 'https://images.pexels.com/photos/2521978/pexels-photo-2521978.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Modern Pompadour' },
    { id: 4, url: 'https://images.pexels.com/photos/3993323/pexels-photo-3993323.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Buzz Cut' },
    { id: 5, url: 'https://images.pexels.com/photos/1453008/pexels-photo-1453008.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Texture Crop' },
    { id: 6, url: 'https://images.pexels.com/photos/2040189/pexels-photo-2040189.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Sharp Lineup' },
  ];

  // LOGIC
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, { threshold: 0.1, rootMargin: "-50px" });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleBooking = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const closeModals = () => {
    setIsOpen(false);
    setIsSuccess(false);
  };

  const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-amber-500/30 pt-20 overflow-x-hidden">
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-[150] bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-900 h-20 flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="text-xl font-black italic tracking-tighter uppercase">
            GOLDEN<span className="text-amber-500">SCISSORS</span>
          </div>

          <div className="hidden md:flex gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500">
            <a href="#services" className="hover:text-amber-500 transition-colors">Services</a>
            <a href="#gallery" className="hover:text-amber-500 transition-colors">Gallery</a>
            <a href="#squad" className="hover:text-amber-500 transition-colors">Squad</a>
            <a href="#reviews" className="hover:text-amber-500 transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-amber-500 transition-colors">FAQ</a>
            <a href="#location" className="hover:text-amber-500 transition-colors">Location</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsOpen(true)} 
              className="hidden sm:block bg-amber-600 hover:bg-amber-500 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all"
            >
              Book Now
            </button>
            
            <button 
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className={`h-0.5 w-6 bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`h-0.5 w-6 bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`h-0.5 w-6 bg-white self-end transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2 w-6' : 'w-4'}`}></div>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`absolute top-20 left-0 w-full bg-zinc-950 border-b border-zinc-900 px-8 py-10 flex flex-col gap-6 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
          <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black uppercase italic">Services</a>
          <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black uppercase italic">Gallery</a>
          <a href="#squad" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black uppercase italic">Squad</a>
          <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black uppercase italic">Reviews</a>
          <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black uppercase italic">FAQ</a>
          <a href="#location" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black uppercase italic">Location</a>
          <button onClick={() => { setIsOpen(true); setIsMobileMenuOpen(false); }} className="w-full bg-amber-600 text-white py-5 rounded-2xl font-black uppercase">Book Appointment</button>
        </div>
      </nav>

      {/* ===================== HERO SECTION WITH BACKGROUND PHOTO ===================== */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden" style={{ marginTop: '-80px', paddingTop: '80px' }}>
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Barbershop background"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient overlay — bottom fades to zinc-950 so the rest of the page blends in */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-zinc-950"></div>
          {/* Subtle amber tint overlay for brand cohesion */}
          <div className="absolute inset-0 bg-amber-950/10"></div>
        </div>

        {/* Optional: animated grain texture for depth */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center py-32">
          {/* Eyebrow tag */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.3em]">Now Accepting Bookings</span>
          </div>

          <h1 className="text-5xl md:text-9xl font-black tracking-tighter uppercase animate-in fade-in slide-in-from-bottom-8 duration-1000 drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)]">
            THE GOLDEN <span className="text-amber-500">SCISSORS</span>
          </h1>
          <p className="mt-6 text-zinc-300 text-lg md:text-2xl max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Premium cuts. Classic vibes. Modern precision.
          </p>
          <button
            className="mt-10 bg-amber-600 hover:bg-amber-500 text-white font-bold py-5 px-12 rounded-full transition-all hover:scale-110 active:scale-95 shadow-xl shadow-amber-600/30 backdrop-blur-sm"
            onClick={() => setIsOpen(true)}
          >
            Book Your Appointment
          </button>

          {/* Scroll hint */}
          <div className="mt-16 flex flex-col items-center gap-2 opacity-50 animate-in fade-in duration-1000 delay-700">
            <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-400">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-zinc-400 to-transparent"></div>
          </div>
        </div>
      </section>
      {/* ============================================================================= */}

      {/* SERVICES SECTION */}
      <section id="services" className="reveal max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
        <h2 className="text-3xl font-bold mb-12 border-b border-zinc-800 pb-4 uppercase tracking-widest text-center md:text-left">
          Our <span className="text-amber-500">Services</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-8 border border-zinc-800 rounded-2xl hover:border-amber-500/50 transition-colors bg-zinc-900/50 group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold group-hover:text-amber-500 transition-colors">{service.name}</h3>
                <span className="text-amber-500 font-mono font-bold">{service.price}</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="reveal max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-black uppercase italic tracking-widest">
              The <span className="text-amber-500">Portfolio</span>
            </h2>
            <p className="text-zinc-500 mt-2 italic font-medium">Visual proof of our craft.</p>
          </div>
          <div className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.3em]">
            Click to expand
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img) => (
            <div key={img.id} className="group relative aspect-square overflow-hidden rounded-3xl border border-zinc-900 cursor-pointer" onClick={() => setSelectedImg(img)}>
              <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm text-center p-4">
                <span className="text-amber-500 font-black uppercase italic tracking-tighter text-xl">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedImg && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedImg(null)}></div>
          <div className="relative max-w-4xl w-full group">
            <button className="absolute -top-12 right-0 text-white hover:text-amber-500 transition-colors text-2xl font-bold" onClick={() => setSelectedImg(null)}>✕ CLOSE</button>
            <img src={selectedImg.url} alt={selectedImg.title} className="w-full h-auto rounded-3xl shadow-2xl border border-zinc-800" />
            <div className="mt-4 text-center">
              <h3 className="text-amber-500 font-black italic uppercase tracking-widest text-2xl">{selectedImg.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* SQUAD SECTION */}
      <section id="squad" className="reveal max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase tracking-widest">Meet the <span className="text-amber-500">Squad</span></h2>
          <p className="mt-4 text-zinc-500 italic">The hands that make the magic happen.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {barbers.map((barber, index) => (
            <div key={index} className="group flex flex-col items-center">
              <div className="w-full aspect-[4/5] bg-zinc-900 rounded-2xl mb-6 overflow-hidden border-2 border-zinc-800 group-hover:border-amber-500 transition-all duration-500">
                 <img src={barber.img} alt={barber.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-bold">{barber.name}</h3>
              <p className="text-amber-500 font-medium uppercase text-xs tracking-widest mt-1">{barber.role}</p>
              <div className="mt-4 px-4 py-1 bg-zinc-900 rounded-full text-zinc-500 text-sm border border-zinc-800">Spec: {barber.specialty}</div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="reveal max-w-6xl mx-auto px-6 py-24 border-t border-zinc-900 scroll-mt-20">
        <h2 className="text-4xl font-black uppercase mb-12 text-center tracking-widest italic">The <span className="text-amber-500">Vibe</span> Check</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "James K.", text: "Best fade in the city. Leo is a surgeon with the clippers.", stars: "★★★★★" },
            { name: "David M.", text: "The vibe here is unmatched. Professional and clean.", stars: "★★★★★" },
            { name: "Chris T.", text: "Finally found a place that knows how to handle a beard.", stars: "★★★★★" }
          ].map((rev, i) => (
            <div key={i} className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl">
              <div className="text-amber-500 mb-4">{rev.stars}</div>
              <p className="text-zinc-400 italic mb-6">"{rev.text}"</p>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-600">— {rev.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="reveal max-w-6xl mx-auto px-6 py-24 border-t border-zinc-900 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase tracking-widest">Got <span className="text-amber-500">Questions?</span></h2>
          <p className="mt-4 text-zinc-500 italic">Everything you need to know before you sit in the chair.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/30 hover:border-zinc-700 transition-colors">
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-left gap-4"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-bold text-sm uppercase tracking-wide text-white">{faq.q}</span>
                <span className={`text-amber-500 text-xl font-black flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800 pt-4">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-zinc-500 text-sm">Still have questions?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
            <a href="mailto:hello@goldenscissors.com" className="text-amber-500 font-bold uppercase tracking-widest text-xs hover:text-amber-400 transition-colors border-b border-amber-500/30 pb-1">
              hello@goldenscissors.com →
            </a>
            <span className="hidden sm:block text-zinc-700">|</span>
            <a
              href="https://wa.me/15550000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] text-white font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#25D366]/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section id="location" className="reveal max-w-6xl mx-auto px-6 py-24 border-t border-zinc-900 scroll-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-black uppercase mb-8 text-white">Visit the <span className="text-amber-500">Shop</span></h2>
            <div className="space-y-8">
              <div>
                <h4 className="text-amber-500 font-bold uppercase tracking-widest text-[10px] mb-2">Address</h4>
                <p className="text-xl text-zinc-300 font-medium">123 Grooming Blvd, Style City</p>
              </div>
              <div>
                <h4 className="text-amber-500 font-bold uppercase tracking-widest text-[10px] mb-2">Phone</h4>
                <a href="tel:+15550000000" className="text-xl text-zinc-300 font-medium hover:text-amber-500 transition-colors">+1 (555) 000-0000</a>
              </div>
              <div>
                <h4 className="text-amber-500 font-bold uppercase tracking-widest text-[10px] mb-2">Hours</h4>
                <ul className="text-zinc-400 space-y-2">
                  <li className="flex justify-between border-b border-zinc-900 pb-2"><span>Mon - Fri</span> <span>9am - 8pm</span></li>
                  <li className="flex justify-between border-b border-zinc-900 pb-2"><span>Saturday</span> <span>10am - 6pm</span></li>
                  <li className="flex justify-between text-zinc-600"><span>Sunday</span> <span>Closed</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full h-80 bg-zinc-900 rounded-3xl border-2 border-zinc-800 flex items-center justify-center text-5xl">📍</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="text-2xl font-black italic tracking-tighter uppercase mb-4">
                GOLDEN<span className="text-amber-500">SCISSORS</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                Premium cuts, classic vibes, modern precision. Your chair is waiting.
              </p>
              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                <a href="https://instagram.com/goldenscissors" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-all text-zinc-400" aria-label="Instagram">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://tiktok.com/@goldenscissors" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-all text-zinc-400" aria-label="TikTok">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.78a4.85 4.85 0 01-1.02-.09z"/>
                  </svg>
                </a>
                <a href="https://wa.me/15550000000" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center hover:border-[#25D366] hover:text-[#25D366] transition-all text-zinc-400" aria-label="WhatsApp">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[['#services','Services'],['#gallery','Gallery'],['#squad','Our Squad'],['#reviews','Reviews'],['#faq','FAQ'],['#location','Location']].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="text-zinc-400 hover:text-amber-500 transition-colors text-sm font-medium">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 mb-6">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <span className="text-zinc-600 block text-[10px] uppercase tracking-widest mb-1">Address</span>
                  <span className="text-zinc-400">123 Grooming Blvd, Style City</span>
                </li>
                <li>
                  <span className="text-zinc-600 block text-[10px] uppercase tracking-widest mb-1">Phone</span>
                  <a href="tel:+15550000000" className="text-zinc-400 hover:text-amber-500 transition-colors">+1 (555) 000-0000</a>
                </li>
                <li>
                  <span className="text-zinc-600 block text-[10px] uppercase tracking-widest mb-1">Email</span>
                  <a href="mailto:hello@goldenscissors.com" className="text-zinc-400 hover:text-amber-500 transition-colors">hello@goldenscissors.com</a>
                </li>
                <li>
                  <span className="text-zinc-600 block text-[10px] uppercase tracking-widest mb-1">Hours</span>
                  <span className="text-zinc-400">Mon–Fri 9am–8pm · Sat 10am–6pm</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-zinc-600 text-xs">© {new Date().getFullYear()} Golden Scissors. All rights reserved.</p>
            <button
              onClick={scrollToTop}
              className="text-zinc-600 hover:text-amber-500 transition-colors text-xs uppercase tracking-widest font-bold flex items-center gap-2"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={closeModals}></div>
          <div className="relative bg-zinc-900 border border-zinc-800 p-8 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300 shadow-2xl">
            
            {!isSuccess ? (
              <>
                <h2 className="text-3xl font-black mb-2 text-white italic tracking-tighter uppercase">Secure Your <span className="text-amber-500">Chair</span></h2>
                <p className="text-zinc-500 text-sm mb-8">Fill in your details and we'll confirm your slot.</p>
                <form className="space-y-10" onSubmit={handleBooking}>
                  {/* Contact Info */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400 tracking-[0.2em] mb-4">Your Details</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" placeholder="Full Name" required className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl focus:border-amber-500 outline-none text-sm text-white placeholder-zinc-600" />
                      <input type="tel" placeholder="Phone Number" required className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl focus:border-amber-500 outline-none text-sm text-white placeholder-zinc-600" />
                      <input type="email" placeholder="Email Address" required className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl focus:border-amber-500 outline-none text-sm text-white placeholder-zinc-600 md:col-span-2" />
                    </div>
                  </div>

                  <hr className="border-zinc-800" />
                  
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400 tracking-[0.2em] mb-4">1. Choose Your Expert</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {barbers.map((barber, idx) => (
                        <label key={idx} className="cursor-pointer group">
                          <input type="radio" name="barber" className="hidden peer" required />
                          <div className="p-3 bg-zinc-950 border-2 border-zinc-800 rounded-2xl peer-checked:border-amber-500 transition-all flex items-center gap-3">
                            <img src={barber.img} className="w-10 h-10 rounded-full object-cover" alt={barber.name} />
                            <div>
                              <p className="text-[11px] font-bold peer-checked:text-amber-500 leading-none">{barber.name}</p>
                              <p className="text-[9px] text-zinc-500 uppercase mt-1">{barber.role}</p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <label className="block text-[10px] uppercase font-bold text-zinc-400 tracking-[0.2em]">2. Select Your Vibe</label>
                    {categorizedStyles.map((cat, catIdx) => (
                      <div key={catIdx}>
                        <h3 className="text-amber-500 text-[11px] font-black uppercase tracking-widest mb-4 border-l-2 border-amber-500 pl-3">{cat.category}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {cat.styles.map((style) => (
                            <label key={style.id} className="cursor-pointer group">
                              <input type="radio" name="style" className="hidden peer" required />
                              <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-transparent peer-checked:border-amber-500 transition-all">
                                <img src={style.img} alt={style.name} className="object-cover w-full h-full bg-zinc-800" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent flex items-end p-3">
                                  <span className="text-[10px] font-bold text-white uppercase">{style.name}</span>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <label className="block text-[10px] uppercase font-bold text-zinc-400 tracking-[0.2em]">3. Pick Date & Time</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="date" required className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-white outline-none focus:border-amber-500" onChange={(e) => setBookingDate(e.target.value)} />
                      <select required className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-white outline-none focus:border-amber-500" onChange={(e) => setSelectedTime(e.target.value)}>
                        <option value="">Select Time</option>
                        {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                      </select>
                    </div>
                  </div>
                  
                  <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white font-black uppercase tracking-widest py-5 rounded-2xl shadow-xl transition-all active:scale-95">Confirm Appointment</button>
                </form>
              </>
            ) : (
              <div className="py-20 flex flex-col items-center text-center animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center text-zinc-950 text-5xl mb-8 shadow-[0_0_50px_rgba(245,158,11,0.3)]">
                  ✓
                </div>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4 text-white">You're <span className="text-amber-500">Locked In!</span></h2>
                <p className="text-zinc-400 max-w-sm mb-10">
                  We've got you down for <span className="text-white font-bold">{bookingDate}</span> at <span className="text-white font-bold">{selectedTime}</span>. Check your phone or email for the confirmation.
                </p>
                <button 
                  onClick={closeModals} 
                  className="bg-white text-zinc-950 px-12 py-4 rounded-full font-black uppercase tracking-widest hover:bg-amber-500 transition-colors"
                >
                  See You There
                </button>
              </div>
            )}
            
            <button onClick={closeModals} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors text-xl font-bold">✕</button>
          </div>
        </div>
      )}

      {/* WHATSAPP FLOATING BUTTON */}
      <a
        href="https://wa.me/15550000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[140] flex items-center gap-3 bg-[#25D366] hover:bg-[#20bc5a] text-white font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-full shadow-2xl shadow-[#25D366]/30 transition-all hover:scale-105 active:scale-95"
      >
        <WhatsAppIcon />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>

      {/* SCROLL TO TOP */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-[140] w-12 h-12 bg-zinc-900 border border-zinc-700 hover:border-amber-500 hover:text-amber-500 text-zinc-400 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        ↑
      </button>

    </main>
  );
}