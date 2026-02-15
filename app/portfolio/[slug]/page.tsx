import { notFound } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiGithub, FiExternalLink } from 'react-icons/fi'
import projects from '@/data/projects.json'
import ClientFadeIn from '@/components/ClientFadeIn'

export async function generateStaticParams() {
  return projects.map(project => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <article className="w-full min-h-screen px-6 py-12 md:px-12 md:py-20 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <ClientFadeIn>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-indigo-400 hover:text-white transition-colors mb-8 group">
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-merriweather leading-tight">
              {project.name}
            </h1>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span key={tech} className="bg-indigo-600/10 text-indigo-400 text-xs font-mono px-3 py-1 rounded-full border border-indigo-500/20">
                  {tech}
                </span>
              ))}
            </div>
          </header>

          <section className="glass-panel p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600/5 blur-[100px] -z-10"></div>
            
            <div className="prose prose-invert max-w-none text-gray-300">
              <p className="text-xl leading-relaxed mb-8">
                {project.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 border-t border-white/10 pt-12">
                <div className="space-y-4">
                  <h4 className="text-white font-bold text-lg">Key Challenges</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    {project.challenges?.map((challenge, idx) => (
                      <li key={idx}>{challenge}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-bold text-lg">Outcomes</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    {project.outcomes?.map((outcome, idx) => (
                      <li key={idx}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <button className="flex-1 py-4 rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                <FiExternalLink /> Live Demo
              </button>
              <button className="flex-1 py-4 rounded-2xl bg-white/5 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all border border-white/10">
                <FiGithub /> Source Code
              </button>
            </div>
          </section>
        </ClientFadeIn>
      </div>
    </article>
  )
}
