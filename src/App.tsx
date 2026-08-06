import { useState, useRef, useEffect } from 'react'

type Category = 'All' | 'Lashes' | 'Braids' | 'Wigs' | 'Sew Ins' | 'Nails'

interface Provider {
  id: number
  name: string
  category: Exclude<Category, 'All'>
  tagline: string
  rating: number
  reviews: number
  distance: string
  price: '£' | '££' | '£££' | '££££'
  availability: string
  availableToday: boolean
  image: string
  neighborhood: string
  services: string[]
  featured?: boolean
}

const providers: Provider[] = [
  {
    id: 1,
    name: 'GlowLash Studio',
    category: 'Lashes',
    tagline: 'Russian volume, mega, and hybrid sets in the heart of the city',
    rating: 4.9,
    reviews: 412,
    distance: '0.4 mi',
    price: '£££',
    availability: 'Today, 2:00 PM',
    availableToday: true,
    image: 'https://images.unsplash.com/photo-1674049406467-824ea37c7184?w=600&h=400&fit=crop&auto=format',
    neighborhood: 'City Centre',
    services: ['Classic Set', 'Russian Volume', 'Mega Volume', 'Lash Lift & Tint'],
    featured: true,
  },
  {
    id: 2,
    name: 'Lash & Co. Didsbury',
    category: 'Lashes',
    tagline: 'Handcrafted lash sets for every eye shape, by certified artists',
    rating: 4.8,
    reviews: 228,
    distance: '3.1 mi',
    price: '££',
    availability: 'Tomorrow, 11:00 AM',
    availableToday: false,
    image: 'https://images.unsplash.com/photo-1674049406179-d7bf2c263e71?w=600&h=400&fit=crop&auto=format',
    neighborhood: 'Didsbury',
    services: ['Hybrid Set', 'Infills', 'Lash Lift', 'Brow Lamination'],
  },
  {
    id: 3,
    name: 'Crown Braids & Beauty',
    category: 'Braids',
    tagline: 'Knotless, box braids, and fulani styles — protective hair artistry',
    rating: 4.9,
    reviews: 631,
    distance: '1.3 mi',
    price: '££',
    availability: 'Today, 4:00 PM',
    availableToday: true,
    image: 'https://images.unsplash.com/photo-1594254773847-9fce26e950bc?w=600&h=400&fit=crop&auto=format',
    neighborhood: 'Hulme',
    services: ['Knotless Braids', 'Box Braids', 'Fulani Braids', 'Feed-In Cornrows'],
  },
  {
    id: 4,
    name: 'Zuri Hair Lounge',
    category: 'Braids',
    tagline: 'Afrocentric braiding specialists serving Greater Manchester since 2012',
    rating: 4.7,
    reviews: 394,
    distance: '2.0 mi',
    price: '££',
    availability: 'Walk-ins welcome',
    availableToday: true,
    image: 'https://images.unsplash.com/photo-1663851071150-b6617bbee927?w=600&h=400&fit=crop&auto=format',
    neighborhood: 'Moss Side',
    services: ['Senegalese Twists', 'Loc Starter', 'Micro Braids', 'Crochet'],
  },
  {
    id: 5,
    name: 'The Wig Bar MCR',
    category: 'Wigs',
    tagline: 'Custom-fitted lace frontals, closures, and full units styled to order',
    rating: 4.8,
    reviews: 187,
    distance: '0.7 mi',
    price: '£££',
    availability: 'Today, 5:30 PM',
    availableToday: true,
    image: 'https://images.unsplash.com/photo-1663582816158-42354522fe15?w=600&h=400&fit=crop&auto=format',
    neighborhood: 'Northern Quarter',
    services: ['Lace Frontal Fitting', 'Full Unit Install', 'Wig Styling', 'Custom Orders'],
  },
  {
    id: 6,
    name: 'Luxe Units Salford',
    category: 'Wigs',
    tagline: 'Premium human-hair wigs installed, bleached, and customised',
    rating: 4.6,
    reviews: 143,
    distance: '2.8 mi',
    price: '££££',
    availability: 'Sat, 10:00 AM',
    availableToday: false,
    image: 'https://images.unsplash.com/photo-1784812222534-325e3423425c?w=600&h=400&fit=crop&auto=format',
    neighborhood: 'Salford',
    services: ['HD Lace Install', 'Bleached Knots', 'Tinting', 'Wig Restoration'],
  },
  {
    id: 7,
    name: 'Sew Perfection Studio',
    category: 'Sew Ins',
    tagline: 'Flawless sew-in weaves with natural leave-out or full closure',
    rating: 4.9,
    reviews: 518,
    distance: '2.4 mi',
    price: '££',
    availability: 'Today, 3:00 PM',
    availableToday: true,
    image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=600&h=400&fit=crop&auto=format',
    neighborhood: 'Stretford',
    services: ['Full Sew-In', 'Closure Sew-In', 'Leave-Out Style', 'Weave Removal'],
  },
  {
    id: 8,
    name: 'The Weave Room',
    category: 'Sew Ins',
    tagline: 'Quick weaves, bundles, and tape extensions in Stockport',
    rating: 4.5,
    reviews: 276,
    distance: '5.2 mi',
    price: '£',
    availability: 'Walk-ins welcome',
    availableToday: true,
    image: 'https://images.unsplash.com/photo-1706629504952-ab5e50f5c179?w=600&h=400&fit=crop&auto=format',
    neighborhood: 'Stockport',
    services: ['Quick Weave', 'Tape Extensions', 'Bonding', 'Track & Sew'],
  },
  {
    id: 9,
    name: 'La Lune Nail Studio',
    category: 'Nails',
    tagline: 'Sculptural nail art, gel, and acrylic sets in the Northern Quarter',
    rating: 4.8,
    reviews: 703,
    distance: '0.9 mi',
    price: '££',
    availability: 'Today, 1:00 PM',
    availableToday: true,
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&h=400&fit=crop&auto=format',
    neighborhood: 'Northern Quarter',
    services: ['Gel Manicure', 'Acrylic Full Set', 'Nail Art', 'Pedicure'],
  },
  {
    id: 10,
    name: 'Polish & Pout Chorlton',
    category: 'Nails',
    tagline: 'Luxury manicures and press-on sets handcrafted to commission',
    rating: 4.7,
    reviews: 321,
    distance: '3.6 mi',
    price: '£££',
    availability: 'Fri, 12:00 PM',
    availableToday: false,
    image: 'https://images.unsplash.com/photo-1599206676335-193c82b13c9e?w=600&h=400&fit=crop&auto=format',
    neighborhood: 'Chorlton',
    services: ['Builder Gel', 'Press-On Sets', 'Chrome Powder', 'Nail Removal'],
  },
]

const categories: Category[] = ['All', 'Lashes', 'Braids', 'Wigs', 'Sew Ins', 'Nails']

const sortOptions = ['Nearest', 'Top Rated', 'Available Now', 'Price: Low to High']

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M5 1l1.12 2.27L9 3.64 7 5.59l.47 2.74L5 7l-2.47 1.33L3 5.59 1 3.64l2.88-.37L5 1z"
            fill={i <= Math.round(rating) ? '#C4957A' : '#E4DED6'}
          />
        </svg>
      ))}
    </span>
  )
}

function PriceBadge({ price }: { price: Provider['price'] }) {
  return (
    <span
      style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.04em' }}
      className="text-[#7A6F65]"
    >
      {price}
    </span>
  )
}

function AvailabilityDot({ available }: { available: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`w-1.5 h-1.5 rounded-full ${available ? 'bg-emerald-500' : 'bg-[#C4957A]'}`}
      />
    </span>
  )
}

function ProviderCard({
  provider,
  featured = false,
  onClick,
}: {
  provider: Provider
  featured?: boolean
  onClick: (p: Provider) => void
}) {
  return (
    <article
      onClick={() => onClick(provider)}
      className={`group cursor-pointer bg-white border border-[#E4DED6] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(26,23,20,0.10)] hover:-translate-y-0.5 ${
        featured ? 'col-span-2 row-span-1' : ''
      }`}
    >
      <div className={`relative overflow-hidden bg-[#EDE9E2] ${featured ? 'h-56' : 'h-44'}`}>
        <img
          src={provider.image}
          alt={provider.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.08em' }}
            className="bg-white/90 backdrop-blur-sm text-[#1A1714] px-2 py-1 uppercase"
          >
            {provider.category}
          </span>
          {provider.featured && (
            <span
              style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.08em' }}
              className="bg-[#C4957A] text-white px-2 py-1 uppercase"
            >
              Featured
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <span
            style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px' }}
            className="text-white/90 bg-black/40 backdrop-blur-sm px-2 py-1"
          >
            {provider.distance}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3
            style={{ fontFamily: 'Playfair Display, serif', fontSize: featured ? '20px' : '17px' }}
            className="text-[#1A1714] font-medium leading-snug"
          >
            {provider.name}
          </h3>
          <PriceBadge price={provider.price} />
        </div>

        <p
          style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '13px' }}
          className="text-[#7A6F65] mb-3 leading-snug"
        >
          {provider.tagline}
        </p>

        <div className="flex items-center gap-3 mb-3">
          <StarRating rating={provider.rating} />
          <span
            style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px' }}
            className="text-[#1A1714]"
          >
            {provider.rating}
          </span>
          <span
            style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '11px' }}
            className="text-[#7A6F65]"
          >
            ({provider.reviews})
          </span>
          <span className="ml-auto text-[#7A6F65]" style={{ fontSize: '11px' }}>
            {provider.neighborhood}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {provider.services.slice(0, 3).map((s) => (
            <span
              key={s}
              style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '11px' }}
              className="bg-[#F0EDE8] text-[#4A3F35] px-2 py-0.5"
            >
              {s}
            </span>
          ))}
          {provider.services.length > 3 && (
            <span style={{ fontSize: '11px' }} className="text-[#7A6F65] self-center">
              +{provider.services.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#F0EDE8]">
          <div className="flex items-center gap-1.5">
            <AvailabilityDot available={provider.availableToday} />
            <span
              style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '12px' }}
              className="text-[#4A3F35]"
            >
              {provider.availability}
            </span>
          </div>
          <button
            style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '12px', fontWeight: 500, letterSpacing: '0.04em' }}
            className="bg-[#1A1714] text-[#FAF8F5] px-4 py-1.5 hover:bg-[#C4957A] transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            Book
          </button>
        </div>
      </div>
    </article>
  )
}

function DetailModal({ provider, onClose }: { provider: Provider; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        ref={ref}
        className="bg-[#FAF8F5] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div className="relative">
          <div className="h-72 bg-[#EDE9E2] overflow-hidden">
            <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="#1A1714" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div className="absolute bottom-5 left-6">
            <span
              style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.08em' }}
              className="text-white/80 uppercase"
            >
              {provider.category} · {provider.neighborhood}
            </span>
            <h2
              style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px' }}
              className="text-white font-medium mt-0.5"
            >
              {provider.name}
            </h2>
          </div>
        </div>

        <div className="p-6">
          <p style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '15px' }} className="text-[#4A3F35] mb-5 leading-relaxed">
            {provider.tagline}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6 border border-[#E4DED6] divide-x divide-[#E4DED6]">
            <div className="p-4 text-center">
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '20px' }} className="text-[#1A1714]">{provider.rating}</div>
              <StarRating rating={provider.rating} />
              <div style={{ fontSize: '11px', fontFamily: 'Work Sans, sans-serif' }} className="text-[#7A6F65] mt-1">{provider.reviews} reviews</div>
            </div>
            <div className="p-4 text-center">
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '20px' }} className="text-[#1A1714]">{provider.distance}</div>
              <div style={{ fontSize: '11px', fontFamily: 'Work Sans, sans-serif' }} className="text-[#7A6F65] mt-1">from you</div>
            </div>
            <div className="p-4 text-center">
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }} className="text-[#C4957A]">{provider.price}</div>
              <div style={{ fontSize: '11px', fontFamily: 'Work Sans, sans-serif' }} className="text-[#7A6F65] mt-1">price range</div>
            </div>
          </div>

          <div className="mb-6">
            <h4 style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.1em' }} className="text-[#7A6F65] uppercase mb-3">Services</h4>
            <div className="grid grid-cols-2 gap-2">
              {provider.services.map((s) => (
                <div key={s} className="flex items-center justify-between border border-[#E4DED6] px-3 py-2.5">
                  <span style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '13px' }} className="text-[#1A1714]">{s}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="#C4957A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#F0EDE8] px-4 py-3 mb-5">
            <AvailabilityDot available={provider.availableToday} />
            <span style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '13px' }} className="text-[#4A3F35]">
              Next available: <strong>{provider.availability}</strong>
            </span>
          </div>

          <button
            style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '14px', fontWeight: 500, letterSpacing: '0.05em' }}
            className="w-full bg-[#1A1714] text-[#FAF8F5] py-3.5 hover:bg-[#C4957A] transition-colors duration-300 uppercase"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [search, setSearch] = useState('')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [selected, setSelected] = useState<Provider | null>(null)

  const filtered = providers.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    const matchesSearch =
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(search.toLowerCase()) ||
      p.services.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    const matchesAvail = !availableOnly || p.availableToday
    return matchesCategory && matchesSearch && matchesAvail
  })

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF8F5' }}>
      {/* Nav */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E4DED6]">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <span
              style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', letterSpacing: '-0.01em' }}
              className="text-[#1A1714] font-medium"
            >
              Serviced
            </span>
            <span
              style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.1em' }}
              className="text-[#C4957A] uppercase border border-[#C4957A]/40 px-2 py-0.5"
            >
              Maintenance Made Simple
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {['Discover', 'Near Me', 'Trending', 'Saved'].map((item) => (
              <button
                key={item}
                style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '13px', fontWeight: 400 }}
                className="text-[#7A6F65] hover:text-[#1A1714] transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '13px', fontWeight: 500 }}
              className="text-[#1A1714] hover:text-[#C4957A] transition-colors"
            >
              Sign in
            </button>
            <button
              style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.03em' }}
              className="bg-[#1A1714] text-[#FAF8F5] px-4 py-2 hover:bg-[#C4957A] transition-colors duration-200"
            >
              List your business
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '420px' }}>
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="bg-[#1A1714]" />
          <div className="bg-[#FAF8F5]" />
        </div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1633681926035-ec1ac984418a?w=1600&h=500&fit=crop&auto=format')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'multiply',
          }}
        />

        <div className="relative max-w-[1280px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left — headline */}
          <div>
            <p
              style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.12em' }}
              className="text-[#C4957A] uppercase mb-4"
            >
              Manchester & Greater Manchester · 340 providers
            </p>
            <h1
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 5vw, 58px)', lineHeight: 1.1 }}
              className="text-white font-medium mb-5"
            >
              Find your
              <br />
              <em>perfect</em> beauty
              <br />
              provider.
            </h1>
            <p
              style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '15px', lineHeight: 1.7 }}
              className="text-white/60 max-w-sm"
            >
              Browse lash artists, braiders, wig stylists, and nail techs across Manchester and Greater Manchester. Real reviews, live availability.
            </p>
          </div>

          {/* Right — search */}
          <div>
            <div className="bg-white border border-[#E4DED6] p-5 shadow-xl">
              <div className="flex items-center gap-3 border border-[#E4DED6] px-4 py-3 mb-4 focus-within:border-[#C4957A] transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#7A6F65] flex-shrink-0">
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Artist name, service, area…"
                  style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '14px' }}
                  className="flex-1 outline-none bg-transparent text-[#1A1714] placeholder-[#7A6F65]"
                />
              </div>

              <div className="flex items-center gap-3 border border-[#E4DED6] px-4 py-3 mb-5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#C4957A] flex-shrink-0">
                  <path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.75 4.5 8.5 4.5 8.5S12.5 9.75 12.5 6c0-2.49-2.01-4.5-4.5-4.5zm0 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="currentColor" />
                </svg>
                <span style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '14px' }} className="text-[#1A1714]">
                  City Centre, Manchester, M1
                </span>
                <button style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '12px' }} className="ml-auto text-[#C4957A] hover:underline">
                  Change
                </button>
              </div>

              <button
                style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '14px', fontWeight: 500, letterSpacing: '0.05em' }}
                className="w-full bg-[#1A1714] text-[#FAF8F5] py-3 hover:bg-[#C4957A] transition-colors duration-300 uppercase"
              >
                Search Providers
              </button>

              <div className="mt-4 flex items-center gap-2">
                <span style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '12px' }} className="text-[#7A6F65]">Trending:</span>
                {['Knotless Braids', 'Russian Volume', 'Gel Nails'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSearch(t)}
                    style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '12px' }}
                    className="text-[#4A3F35] hover:text-[#C4957A] transition-colors underline underline-offset-2"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory body */}
      <main className="max-w-[1280px] mx-auto px-6 py-10">
        {/* Filters row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Category tabs */}
          <div className="flex items-center gap-1 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: 'Work Sans, sans-serif',
                  fontSize: '13px',
                  fontWeight: activeCategory === cat ? 500 : 400,
                }}
                className={`px-4 py-1.5 border transition-all duration-150 ${
                  activeCategory === cat
                    ? 'bg-[#1A1714] text-[#FAF8F5] border-[#1A1714]'
                    : 'bg-transparent text-[#4A3F35] border-[#E4DED6] hover:border-[#1A1714]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => setAvailableOnly(!availableOnly)}
                className={`w-8 h-4 rounded-full transition-colors relative ${availableOnly ? 'bg-[#C4957A]' : 'bg-[#E4DED6]'}`}
              >
                <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${availableOnly ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </div>
              <span style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '12px' }} className="text-[#7A6F65] whitespace-nowrap">
                Available today
              </span>
            </label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '12px' }}
              className="border border-[#E4DED6] bg-white text-[#4A3F35] px-3 py-1.5 outline-none focus:border-[#C4957A] cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-baseline gap-3 mb-6">
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px' }} className="text-[#1A1714]">
            {filtered.length} providers
          </span>
          {activeCategory !== 'All' && (
            <span style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '13px' }} className="text-[#7A6F65]">
              in {activeCategory}
            </span>
          )}
          {search && (
            <span style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '13px' }} className="text-[#7A6F65]">
              matching &ldquo;{search}&rdquo;
            </span>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#E4DED6]">
            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }} className="text-[#7A6F65] italic mb-2">
              No providers found
            </p>
            <p style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '14px' }} className="text-[#7A6F65]">
              Try a different category or search term
            </p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('All'); setAvailableOnly(false) }}
              style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '13px', fontWeight: 500 }}
              className="mt-4 border border-[#1A1714] text-[#1A1714] px-5 py-2 hover:bg-[#1A1714] hover:text-white transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p, i) => (
              <ProviderCard
                key={p.id}
                provider={p}
                featured={i === 0 && activeCategory === 'All' && !search && p.featured}
                onClick={setSelected}
              />
            ))}
          </div>
        )}

        {/* Stats strip */}
        <div className="mt-16 border-t border-b border-[#E4DED6] py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '340', label: 'Verified providers' },
            { value: '11k+', label: 'Appointments booked' },
            { value: '4.8', label: 'Average rating' },
            { value: '14', label: 'Areas covered' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div
                style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', fontStyle: 'italic' }}
                className="text-[#1A1714] leading-none mb-1"
              >
                {value}
              </div>
              <div
                style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.1em' }}
                className="text-[#7A6F65] uppercase"
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Neighborhoods */}
        <div className="mt-14 mb-4">
          <h2
            style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px' }}
            className="text-[#1A1714] mb-1"
          >
            Browse by neighborhood
          </h2>
          <p style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '14px' }} className="text-[#7A6F65] mb-6">
            Find beauty providers across Manchester city and the surrounding boroughs
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {[
              { name: 'City Centre', count: 87 },
              { name: 'Didsbury', count: 43 },
              { name: 'Chorlton', count: 38 },
              { name: 'Salford', count: 52 },
              { name: 'Stockport', count: 41 },
              { name: 'Bolton', count: 36 },
              { name: 'Oldham', count: 29 },
              { name: 'Bury', count: 24 },
            ].map(({ name, count }) => (
              <button
                key={name}
                onClick={() => setSearch(name)}
                className="border border-[#E4DED6] px-4 py-5 text-left hover:border-[#C4957A] hover:bg-white transition-all duration-200 group"
              >
                <div
                  style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '14px', fontWeight: 500 }}
                  className="text-[#1A1714] group-hover:text-[#C4957A] transition-colors mb-1"
                >
                  {name}
                </div>
                <div
                  style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px' }}
                  className="text-[#7A6F65]"
                >
                  {count} providers
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E4DED6] bg-[#1A1714] mt-16">
        <div className="max-w-[1280px] mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span
              style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }}
              className="text-white font-medium"
            >
              Serviced: Maintenance Made Simple
            </span>
            <p style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '13px' }} className="text-white/40 mt-1">
              The curated guide to beauty services across Manchester & Greater Manchester
            </p>
          </div>
          <div className="flex gap-6">
            {['About', 'For Businesses', 'Press', 'Privacy'].map((l) => (
              <button
                key={l}
                style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '13px' }}
                className="text-white/50 hover:text-white transition-colors"
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* Detail modal */}
      {selected && (
        <DetailModal provider={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
