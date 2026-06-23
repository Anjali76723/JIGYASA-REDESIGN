export default function Testimonials() {
  const testimonial = {
    quote: "Jigyasa Technologies transformed our digital presence completely. Their team delivered exceptional results on time and within budget.",
    author: "Sarah Johnson",
    title: "CTO",
    company: "TechCorp"
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
        </div>
        
        <div className="max-w-3xl mx-auto bg-slate-800/50 border border-slate-700 rounded-xl p-8">
          <p className="text-xl text-slate-300 mb-6 italic">"{testimonial.quote}"</p>
          <div className="flex items-center justify-center gap-4">
            <div>
              <div className="text-white font-semibold">{testimonial.author}</div>
              <div className="text-slate-400 text-sm">{testimonial.title}, {testimonial.company}</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-12 mt-12 text-center">
          <div>
            <div className="text-3xl font-bold text-white">50+</div>
            <div className="text-slate-400 text-sm">Clients</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">100+</div>
            <div className="text-slate-400 text-sm">Projects</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">98%</div>
            <div className="text-slate-400 text-sm">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  )
}
