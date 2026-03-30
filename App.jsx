import React, { useMemo, useState } from 'react'
import {
  Anchor,
  Search,
  MapPin,
  Sailboat,
  SlidersHorizontal,
  Phone,
  Mail,
  ChevronRight,
  Star,
  Upload,
  ShieldCheck,
  Menu,
  X,
} from 'lucide-react'

const listings = [
  {
    id: 1,
    title: '2021 Fountaine Pajot Isla 40',
    price: 'USD $429,000',
    location: 'Vuda Marina, Fiji',
    region: 'Fiji',
    category: 'Catamarans',
    year: 2021,
    length: '40 ft',
    cabins: 3,
    engines: 'Twin diesel',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1400&q=80',
    description:
      'Privately owned, never chartered, exceptionally well equipped and ready for immediate South Pacific cruising.',
    broker: 'Multihull Central',
  },
  {
    id: 2,
    title: "Lagoon 450F Owner's Version",
    price: 'USD $515,000',
    location: 'Opua, New Zealand',
    region: 'New Zealand',
    category: 'Catamarans',
    year: 2018,
    length: '45 ft',
    cabins: 3,
    engines: 'Twin diesel',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
    description:
      "Bluewater-ready owner's version presented in excellent condition with a premium cruising inventory.",
    broker: 'Marine Listings Pacific',
  },
  {
    id: 3,
    title: 'Leopard 40 Cruising Catamaran',
    price: 'AUD $565,000',
    location: 'Sydney, Australia',
    region: 'Australia',
    category: 'Catamarans',
    year: 2019,
    length: '40 ft',
    cabins: 4,
    engines: 'Twin diesel',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1400&q=80',
    description:
      'A practical and spacious cruising catamaran with strong charter and private ownership appeal.',
    broker: 'Marine Listings Pacific',
  },
  {
    id: 4,
    title: 'Beneteau Oceanis 41',
    price: 'NZD $298,000',
    location: 'Auckland, New Zealand',
    region: 'New Zealand',
    category: 'Yachts',
    year: 2015,
    length: '41 ft',
    cabins: 3,
    engines: 'Single diesel',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    description:
      'Clean family cruiser with recent upgrades and a layout that suits coastal or offshore use.',
    broker: 'Marine Listings Pacific',
  },
  {
    id: 5,
    title: 'Riviera 33 Flybridge',
    price: 'AUD $245,000',
    location: 'Gold Coast, Australia',
    region: 'Australia',
    category: 'Boats',
    year: 2012,
    length: '33 ft',
    cabins: 2,
    engines: 'Twin diesel',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1400&q=80',
    description:
      'A tidy coastal flybridge cruiser ideal for family weekends and offshore fishing runs.',
    broker: 'Marine Listings Pacific',
  },
  {
    id: 6,
    title: 'Highfield 420 Console',
    price: 'AUD $24,900',
    location: 'Brisbane, Australia',
    region: 'Australia',
    category: 'Inflatables',
    year: 2022,
    length: '14 ft',
    cabins: 0,
    engines: '60hp outboard',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80',
    description:
      'A clean, practical tender and day boat package with trailer and electronics included.',
    broker: 'Marine Listings Pacific',
  },
]

const categories = ['All', 'Yachts', 'Catamarans', 'Boats', 'Inflatables', 'Spare Parts', 'Marina Berths']
const regions = ['All', 'Fiji', 'Australia', 'New Zealand', 'French Polynesia', 'Vanuatu', 'New Caledonia']

function CurrencyBadge({ children }) {
  return (
    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
      {children}
    </span>
  )
}

function SectionTitle({ eyebrow, title, text, action }) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="text-sm uppercase tracking-[0.28em] text-cyan-300">{eyebrow}</div>
        <h2 className="mt-2 text-3xl font-semibold md:text-4xl">{title}</h2>
        {text ? <p className="mt-3 max-w-2xl text-slate-400">{text}</p> : null}
      </div>
      {action}
    </div>
  )
}

function ListingCard({ item, onOpen }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className="group overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 text-left shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-400/30"
    >
      <div className="relative">
        <img src={item.image} alt={item.title} className="h-64 w-full object-cover" />
        {item.featured ? (
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
            <Star className="h-3.5 w-3.5" /> Featured
          </div>
        ) : null}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-cyan-300">
          <MapPin className="h-4 w-4" />
          {item.location}
        </div>
        <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
        <div className="mt-3 text-2xl font-semibold text-white">{item.price}</div>
        <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-400">
          <span>{item.year}</span>
          <span>•</span>
          <span>{item.length}</span>
          <span>•</span>
          <span>{item.cabins} cabins</span>
        </div>
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-400">{item.description}</p>
        <div className="mt-5 flex items-center text-sm font-medium text-cyan-300">
          View listing <ChevronRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  )
}

function Header({ page, setPage }) {
  const [open, setOpen] = useState(false)
  const nav = [
    ['Home', 'home'],
    ['Browse Listings', 'browse'],
    ['Sell Your Boat', 'sell'],
    ['Broker Dashboard', 'dashboard'],
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button onClick={() => setPage('home')} className="text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500 text-slate-950">
              <Anchor className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-wide">Marine Listings Pacific</div>
              <div className="text-xs text-slate-400">South Pacific Yacht Marketplace</div>
            </div>
          </div>
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map(([label, key]) => (
            <button
              key={key}
              onClick={() => setPage(key)}
              className={`text-sm transition ${page === key ? 'text-white' : 'text-slate-300 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => setPage('sell')}
            className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-500/20"
          >
            Create Listing
          </button>
        </nav>

        <button className="md:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {nav.map(([label, key]) => (
              <button
                key={key}
                onClick={() => {
                  setPage(key)
                  setOpen(false)
                }}
                className="rounded-2xl bg-white/5 px-4 py-3 text-left text-sm"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}

function Hero({ setPage }) {
  const [category, setCategory] = useState('All Categories')
  const [region, setRegion] = useState('All Locations')

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-28">
        <div>
          <CurrencyBadge>Boats for Sale Across Fiji, Australia, New Zealand & Beyond</CurrencyBadge>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            A premium yacht listing platform built for the South Pacific.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
            Showcase boats with broker-quality presentation, attract international buyers, and make it easy for private sellers and brokers to list vessels across the region.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => setPage('browse')} className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-950">
              Browse Listings
            </button>
            <button onClick={() => setPage('sell')} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 font-medium text-white">
              List Your Boat
            </button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Broker & private listings</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Featured upgrades</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Mobile-ready design</span>
          </div>
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 text-lg font-medium">
            <Search className="h-5 w-5 text-cyan-300" /> Find your next boat
          </div>
          <div className="mt-5 grid gap-3">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm outline-none">
              <option>All Categories</option>
              {categories.slice(1).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm outline-none">
              <option>All Locations</option>
              {regions.slice(1).map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-3">
              <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm outline-none" placeholder="Min Price" />
              <input className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm outline-none" placeholder="Max Price" />
            </div>
            <button onClick={() => setPage('browse')} className="rounded-2xl bg-cyan-500 px-4 py-3 font-medium text-slate-950">
              Search Listings
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function HomePage({ setPage, openListing }) {
  const featured = listings.filter((l) => l.featured)

  return (
    <>
      <Hero setPage={setPage} />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <SectionTitle
          eyebrow="Categories"
          title="Search by boat type"
          text="Make it easy for buyers to find the right vessel, from premium catamarans and yachts through to inflatables, parts and marina berths."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.slice(1).map((category) => (
            <button key={category} onClick={() => setPage('browse')} className="rounded-[24px] border border-white/10 bg-slate-900 p-5 text-left shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-400/40">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                <Sailboat className="h-6 w-6" />
              </div>
              <div className="text-lg font-medium">{category}</div>
              <div className="mt-2 text-sm text-slate-400">Premium South Pacific listings</div>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-slate-900/60 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            eyebrow="Featured"
            title="Premium featured listings"
            text="This is your high-value section for promoted listings and broker inventory."
            action={
              <button onClick={() => setPage('browse')} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm">
                View all listings
              </button>
            }
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {featured.map((item) => (
              <ListingCard key={item.id} item={item} onOpen={openListing} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <SectionTitle
          eyebrow="Regions"
          title="Browse by Pacific location"
          text="Location filtering is one of your strongest differentiators because Pacific buyers often search by cruising region first."
        />
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {regions.slice(1).map((region) => (
            <button key={region} onClick={() => setPage('browse')} className="rounded-[24px] border border-white/10 bg-slate-900 px-5 py-6 text-center font-medium transition hover:border-cyan-400/40">
              {region}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white text-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionTitle
              eyebrow="Why it works"
              title="A cleaner, more premium listing experience"
              text="This structure is built to feel stronger than a basic site builder while remaining practical for real enquiries, paid listings and future scale."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {[
                'Broker-quality listing pages',
                'Private seller upload flow',
                'Featured listing monetisation',
                'South Pacific regional focus',
              ].map((item) => (
                <div key={item} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 text-cyan-700" />
                    <div className="font-medium">{item}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl">
            <div className="text-sm uppercase tracking-[0.25em] text-cyan-300">Seller Funnel</div>
            <h3 className="mt-2 text-3xl font-semibold">List your boat in minutes</h3>
            <p className="mt-4 text-slate-300">
              Collect photos, specs, pricing and seller details cleanly, then upgrade listings to featured placement once your traffic grows.
            </p>
            <div className="mt-6 space-y-4">
              {[
                'Create account',
                'Upload images and vessel specs',
                'Select standard or featured listing',
                'Receive direct buyer enquiries',
              ].map((step, i) => (
                <div key={step} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-semibold text-slate-950">{i + 1}</div>
                  <div className="font-medium">{step}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setPage('sell')} className="mt-8 rounded-2xl bg-white px-5 py-3 font-medium text-slate-950">
              Start your listing
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

function BrowsePage({ openListing }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [region, setRegion] = useState('All')

  const filtered = useMemo(() => {
    return listings.filter((item) => {
      const matchesSearch =
        !search ||
        [item.title, item.location, item.category, item.region]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      const matchesCategory = category === 'All' || item.category === category
      const matchesRegion = region === 'All' || item.region === region
      return matchesSearch && matchesCategory && matchesRegion
    })
  }, [search, category, region])

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <SectionTitle
        eyebrow="Browse Listings"
        title="Search the marketplace"
        text="This page functions as your main listings hub, with filters for category, location and keywords."
      />

      <div className="mb-8 grid gap-4 rounded-[28px] border border-white/10 bg-slate-900 p-5 md:grid-cols-[1.2fr_0.8fr_0.8fr_auto]">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3">
          <Search className="h-5 w-5 text-cyan-300" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by model, location or type"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none">
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select value={region} onChange={(e) => setRegion(e.target.value)} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none">
          {regions.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-4 py-3 font-medium text-slate-950">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
      </div>

      <div className="mb-5 text-sm text-slate-400">{filtered.length} listings found</div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <ListingCard key={item.id} item={item} onOpen={openListing} />
        ))}
      </div>
    </section>
  )
}

function ListingPage({ item, setPage }) {
  if (!item) return null

  const specs = [
    ['Builder', item.title.split(' ').slice(1).join(' ')],
    ['Year', item.year],
    ['Length', item.length],
    ['Cabins', item.cabins],
    ['Location', item.location],
    ['Engines', item.engines],
    ['Category', item.category],
    ['Broker', item.broker],
  ]

  return (
    <section className="bg-white text-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <button onClick={() => setPage('browse')} className="mb-6 text-sm font-medium text-cyan-700">
          ← Back to listings
        </button>

        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">
          <img src={item.image} alt={item.title} className="h-[420px] w-full object-cover" />
          <div className="grid gap-10 p-6 lg:grid-cols-[1fr_340px] lg:p-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {item.location}</span>
                <span>•</span>
                <span>{item.year}</span>
                <span>•</span>
                <span>{item.length}</span>
              </div>
              <h1 className="mt-3 text-3xl font-semibold md:text-4xl">{item.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700">
                Offered for sale by {item.broker}. {item.description} This sample detail page is designed to mirror a polished brokerage presentation, with room for a full specification sheet, inventory breakdown, equipment list, financing language, regional positioning and enquiry capture.
              </p>

              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {specs.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-medium text-slate-900">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                {[
                  {
                    title: 'Highlights',
                    items: ['Never chartered / private presentation', 'Strong South Pacific cruising appeal', 'Ready for immediate use', 'Premium broker marketing format'],
                  },
                  {
                    title: 'Inventory sections',
                    items: ['Electronics & navigation', 'Electrical & solar', 'Safety equipment', 'Tender, spares & extras'],
                  },
                ].map((block) => (
                  <div key={block.title} className="rounded-[24px] border border-slate-200 p-5">
                    <div className="text-lg font-semibold">{block.title}</div>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      {block.items.map((entry) => (
                        <li key={entry} className="flex items-start gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-cyan-600" />
                          <span>{entry}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm lg:sticky lg:top-24">
              <div className="text-sm text-slate-500">Asking Price</div>
              <div className="mt-1 text-3xl font-semibold">{item.price}</div>
              <div className="mt-6 rounded-[24px] bg-white p-4">
                <div className="text-sm font-semibold">Contact Broker</div>
                <div className="mt-3 text-sm text-slate-600">Tom Adams</div>
                <div className="text-sm text-slate-600">{item.broker}</div>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-cyan-700" /> +61 XXX XXX XXX</div>
                  <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-cyan-700" /> sales@marinelistingspacific.com</div>
                </div>
              </div>
              <button className="mt-5 w-full rounded-2xl bg-cyan-600 px-4 py-3 font-medium text-white">Send Enquiry</button>
              <button className="mt-3 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-medium text-slate-900">Request Specs</button>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

function SellPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <SectionTitle
        eyebrow="Sell Your Boat"
        title="A clean seller flow that can evolve into a real paid listing platform"
        text="This page is structured so you can later connect user accounts, image uploads, Stripe payments and seller dashboards without redesigning the experience."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[32px] border border-white/10 bg-slate-900 p-6 shadow-2xl">
          <div className="grid gap-4 md:grid-cols-2">
            <input className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none" placeholder="Vessel title" />
            <input className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none" placeholder="Asking price" />
            <select className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none">
              {categories.slice(1).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none">
              {regions.slice(1).map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <input className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none" placeholder="Year" />
            <input className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none" placeholder="Length" />
            <textarea className="md:col-span-2 min-h-[150px] rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none" placeholder="Describe your boat, specifications, condition and equipment" />
          </div>

          <div className="mt-5 rounded-[28px] border border-dashed border-white/15 bg-slate-950/60 p-8 text-center">
            <Upload className="mx-auto h-8 w-8 text-cyan-300" />
            <div className="mt-3 font-medium">Upload listing photos</div>
            <div className="mt-2 text-sm text-slate-400">This area can later connect to real image upload and storage.</div>
          </div>

          <button className="mt-6 rounded-2xl bg-cyan-500 px-5 py-3 font-medium text-slate-950">Submit Listing</button>
        </div>

        <aside className="rounded-[32px] border border-white/10 bg-slate-900 p-6 shadow-2xl">
          <div className="text-sm uppercase tracking-[0.25em] text-cyan-300">Monetisation</div>
          <h3 className="mt-2 text-2xl font-semibold">Example listing packages</h3>
          <div className="mt-6 space-y-4">
            {[
              ['Standard Listing', 'Basic marketplace placement'],
              ['Featured Listing', 'Homepage featured placement'],
              ['Broker Package', 'Multiple active listings and enhanced branding'],
            ].map(([name, note]) => (
              <div key={name} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <div className="font-medium">{name}</div>
                <div className="mt-1 text-sm text-slate-400">{note}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}

function DashboardPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <SectionTitle
        eyebrow="Broker Dashboard"
        title="A future broker and seller control panel"
        text="This gives you the structure for login, listing management, upgrade payments and enquiry handling later on."
      />

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[28px] border border-white/10 bg-slate-900 p-5">
          <div className="space-y-3">
            {['Overview', 'My Listings', 'Enquiries', 'Payments', 'Profile'].map((item) => (
              <button key={item} className="w-full rounded-2xl bg-white/5 px-4 py-3 text-left text-sm hover:bg-white/10">
                {item}
              </button>
            ))}
          </div>
        </aside>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Active Listings', '12'],
              ['Featured Listings', '4'],
              ['New Enquiries', '18'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[28px] border border-white/10 bg-slate-900 p-5">
                <div className="text-sm text-slate-400">{label}</div>
                <div className="mt-2 text-3xl font-semibold">{value}</div>
              </div>
            ))}
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900 p-5">
            <div className="text-lg font-semibold">Recent listings</div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-slate-300">
                  <tr>
                    <th className="px-4 py-3 font-medium">Listing</th>
                    <th className="px-4 py-3 font-medium">Location</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.slice(0, 4).map((item) => (
                    <tr key={item.id} className="border-t border-white/10">
                      <td className="px-4 py-3">{item.title}</td>
                      <td className="px-4 py-3 text-slate-400">{item.location}</td>
                      <td className="px-4 py-3">{item.price}</td>
                      <td className="px-4 py-3"><span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">Live</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [page, setPage] = useState('home')
  const [selectedListing, setSelectedListing] = useState(listings[0])

  const openListing = (item) => {
    setSelectedListing(item)
    setPage('listing')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header page={page} setPage={setPage} />

      {page === 'home' ? <HomePage setPage={setPage} openListing={openListing} /> : null}
      {page === 'browse' ? <BrowsePage openListing={openListing} /> : null}
      {page === 'listing' ? <ListingPage item={selectedListing} setPage={setPage} /> : null}
      {page === 'sell' ? <SellPage /> : null}
      {page === 'dashboard' ? <DashboardPage /> : null}

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
          <div>
            <div className="text-lg font-semibold">Marine Listings Pacific</div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              A premium South Pacific yacht marketplace designed for brokers, private sellers and international buyers.
            </p>
          </div>
          <div>
            <div className="font-medium">Marketplace</div>
            <div className="mt-3 space-y-2 text-sm text-slate-400">
              <div>Browse listings</div>
              <div>Featured listings</div>
              <div>Sell your boat</div>
            </div>
          </div>
          <div>
            <div className="font-medium">Regions</div>
            <div className="mt-3 space-y-2 text-sm text-slate-400">
              <div>Fiji</div>
              <div>Australia</div>
              <div>New Zealand</div>
              <div>French Polynesia</div>
            </div>
          </div>
          <div>
            <div className="font-medium">Contact</div>
            <div className="mt-3 space-y-2 text-sm text-slate-400">
              <div>sales@marinelistingspacific.com</div>
              <div>+61 XXX XXX XXX</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
