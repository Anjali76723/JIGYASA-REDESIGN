const trustItems = [
  { title: '500+ Projects Delivered', detail: 'End-to-end launch support' },
  { title: '98% Client Satisfaction', detail: 'Trusted by growth teams' },
  { title: '15+ Industries Served', detail: 'B2B, SaaS, fintech, and more' },
  { title: '24/7 Support', detail: 'Always-on agency collaboration' },
]

export default function TrustStrip() {
  return (
    <section className="w-full bg-[#020617] py-10">
      <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:px-8 md:grid-cols-2 xl:grid-cols-4">
        {trustItems.map((item) => (
          <div
            key={item.title}
            className="group rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-lg shadow-[#000000]/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#6366F1]/20 hover:bg-white/10"
          >
            <h3 className="text-lg font-semibold text-[#F8FAFC]">{item.title}</h3>
            <p className="mt-2 text-sm text-[#D1D9E8]">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
