'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'

interface CommandResult {
  command: string
  output: string | JSX.Element | JSX.Element[] | any[]
  isError: boolean
}

export default function TerminalPortfolio() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<CommandResult[]>([])
  const [loading, setLoading] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new history entry
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history, input])

  const executeCommand = async (command: string) => {
    setLoading(true)
    let output: any = ''
    let isError = false
    const lowerCommand = command.toLowerCase().trim()

    if (lowerCommand !== 'clear') {
      setHistory(prev => [...prev, { command, output: '', isError: false }])
    }

    const helpOutput = `
Available commands:
  help        - Display this help message
  clear       - Clear the terminal screen
  about       - Information about me
  skills      - List my technical skills
  services    - Services I offer
  projects    - List my featured projects
  contact     - Contact information
`

    const aboutOutput = `
Name: Roshish Parajuli
Role: Data Engineer
Location: Lalitpur, Nepal
Email: contact@roshishparajuli.com.np
LinkedIn: linkedin.com/in/roshish-parajuli-60abb7210
`

    const skillsOutput = `
Skills:
- Python, SQL, JavaScript, TypeScript, PHP
- ETL, Web Scraping, Automation
- Git, REST APIs, Linux
- MySQL, PostgreSQL, SQL Server
- Data Analysis, Reporting, Problem Solving
`

    const servicesOutput = `
Services:
- Professional Websites & Landing Pages
- Full Stack Development
- Web Scraping & Automation
- Data Analysis & Visualization
- AI Tool Integration
`

    const contactOutput = `
Contact:
- Phone: +977 9810126471
- Email: contact@roshishparajuli.com.np
- LinkedIn: linkedin.com/in/roshish-parajuli-60abb7210
`

    if (lowerCommand === 'clear') {
      setHistory([])
      setInput('')
      setLoading(false)
      return
    } else if (lowerCommand === 'help') {
      output = helpOutput
    } else if (lowerCommand === 'about' || lowerCommand === 'whoami') {
      output = aboutOutput
    } else if (lowerCommand === 'skills') {
      output = skillsOutput
    } else if (lowerCommand === 'services') {
      output = servicesOutput
    } else if (lowerCommand === 'contact') {
      output = contactOutput
    } else if (lowerCommand.startsWith('select * from projects')) {
      output = 'For projects, please check the Portfolio page.'
    } else {
      output = `Command not found: ${command}. Type 'help' for list.`
      isError = true
    }

    setHistory(prev => {
      const newHistory = [...prev]
      const lastIndex = newHistory.length - 1
      if (newHistory[lastIndex].command === command) {
        newHistory[lastIndex].output = output
        newHistory[lastIndex].isError = isError
      } else {
        newHistory.push({ command, output, isError })
      }
      return newHistory
    })
    setLoading(false)
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const commandToExecute = input
      setInput('')
      executeCommand(commandToExecute)
    }
  }

  return (
    <article className="terminal-portfolio active w-full min-h-screen px-6 py-10 md:px-12 md:py-16 bg-black text-green-400 font-mono flex flex-col">
      <header className="mb-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-2 text-green-400">Terminal Portfolio</h2>
        <p className="text-green-300 text-sm md:text-base">Type commands to explore. Try <code>help</code> or <code>about</code>.</p>
      </header>

      <div
        ref={terminalRef}
        className="flex-1 bg-black p-4 rounded-md overflow-y-auto border border-green-700 space-y-1"
      >
        {history.map((entry, idx) => (
          <div key={idx}>
            <span className="text-green-300">user@portfolio</span>:<span className="text-green-500">~</span>$ <span className="text-green-400">{entry.command}</span>
            {entry.output && (
              <pre className={`${entry.isError ? 'text-red-500' : 'text-green-400'} whitespace-pre-wrap ml-4 mt-1`}>
                {typeof entry.output === 'string' ? entry.output : JSON.stringify(entry.output, null, 2)}
              </pre>
            )}
          </div>
        ))}

        {/* Active input inside terminal */}
        <div className="flex items-center">
          <span className="text-green-300">user@portfolio</span>:<span className="text-green-500">~</span>$
          <input
            type="text"
            className="flex-1 bg-black border-none outline-none text-green-400 ml-2 caret-green-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            autoFocus
          />
          {loading && <span className="animate-pulse ml-1">_</span>}
        </div>
      </div>
    </article>
  )
}
