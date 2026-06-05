import { useState, useRef, useEffect } from 'react'
import { 
  Brain, 
  Terminal, 
  Cpu, 
  Database, 
  Send, 
  Code, 
  Play, 
  RefreshCw, 
  Flame,
  Shield,
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react'
import './App.css'

interface Message {
  id: string
  sender: 'user' | 'agent'
  text: string
  timestamp: string
  agentName?: string
}

interface ConsoleLine {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  text: string
}

const AGENTS = {
  rag: {
    name: 'RAG Architect',
    role: 'RAG & Search Engineer',
    icon: Database,
    color: '#3b82f6',
    initial: 'Hello! I am your RAG Architect. I can help you design semantic search, vector databases, and document ingestion systems. What are we building today?'
  },
  code: {
    name: 'Code Optimizer',
    role: 'React & Python Specialist',
    icon: Code,
    color: '#a855f7',
    initial: 'Hey there! Code Optimizer here. Paste a code snippet or ask for help fixing TypeScript compilation, React Hooks issues, or Python performance optimization.'
  },
  scraper: {
    name: 'Scraper Orchestrator',
    role: 'Playwright & CLI Specialist',
    icon: Cpu,
    color: '#10b981',
    initial: 'Scraper Orchestrator ready. Ask me to setup a target selector, manage rate-limiting, parse pages, or test mock pharmacy endpoints.'
  }
}

const PROJECTS = [
  {
    name: 'PharmaScraper',
    desc: 'Full-stack pharmaceutical comparison system with React frontend, FastAPI backend, and Supabase integration.',
    tags: ['React', 'FastAPI', 'Supabase', 'Python'],
    status: 'ready'
  },
  {
    name: 'G65 Agent Hub',
    desc: 'Multi-agent orchestration and development workspace for GenAI cohorts.',
    tags: ['Vite', 'TypeScript', 'Agents', 'Vanilla CSS'],
    status: 'building'
  },
  {
    name: 'RAG Document Search',
    desc: 'Local search engine leveraging chunking strategies, OpenAI embeddings, and pgvector.',
    tags: ['pgvector', 'RAG', 'PDF Chunker'],
    status: 'ready'
  }
]

function App() {
  const [activeTab, setActiveTab] = useState<'agents' | 'skills' | 'projects'>('agents')
  const [selectedAgentKey, setSelectedAgentKey] = useState<keyof typeof AGENTS>('rag')
  const [inputMessage, setInputMessage] = useState('')
  const [chatHistories, setChatHistories] = useState<Record<string, Message[]>>({
    rag: [
      { id: '1', sender: 'agent', text: AGENTS.rag.initial, timestamp: '15:00', agentName: AGENTS.rag.name }
    ],
    code: [
      { id: '1', sender: 'agent', text: AGENTS.code.initial, timestamp: '15:00', agentName: AGENTS.code.name }
    ],
    scraper: [
      { id: '1', sender: 'agent', text: AGENTS.scraper.initial, timestamp: '15:00', agentName: AGENTS.scraper.name }
    ]
  })
  
  const [consoleLines, setConsoleLines] = useState<ConsoleLine[]>([
    { id: '1', type: 'info', text: 'Initializing Outskill G65 secure sandbox environment...' },
    { id: '2', type: 'success', text: 'Vite HMR server ready. Welcome, Cohort Engineer!' }
  ])
  const [isRunningSim, setIsRunningSim] = useState(false)
  
  const chatEndRef = useRef<HTMLDivElement>(null)
  const consoleEndRef = useRef<HTMLDivElement>(null)

  const activeAgent = AGENTS[selectedAgentKey]
  const currentChat = chatHistories[selectedAgentKey]

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentChat])

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [consoleLines])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: inputMessage,
      timestamp: time
    }

    // Update history with User Message
    const updatedHistory = [...currentChat, userMsg]
    setChatHistories(prev => ({
      ...prev,
      [selectedAgentKey]: updatedHistory
    }))
    
    const query = inputMessage.toLowerCase()
    setInputMessage('')

    // Simulate Agent Reply
    setTimeout(() => {
      let replyText = "I've analyzed your query. To implement this pattern, we should design a robust pipeline with custom error reporting and modular components."
      
      if (selectedAgentKey === 'rag') {
        if (query.includes('vector') || query.includes('db') || query.includes('supabase') || query.includes('postgres')) {
          replyText = "For your vector database, Supabase (pgvector) is an excellent choice. I recommend using OpenAI's text-embedding-3-small model for lightweight and cost-effective vector representation."
        } else if (query.includes('chunk') || query.includes('split')) {
          replyText = "When chunking files, prefer a recursive character text splitter. I suggest a chunk size of 500 characters with a 100 character overlap to avoid splitting key sentences."
        } else if (query.includes('search') || query.includes('retrieve')) {
          replyText = "We can setup a hybrid search index. This combines BM25 keyword matching with pgvector cosine similarity to capture both direct keywords and semantic intent."
        }
      } else if (selectedAgentKey === 'code') {
        if (query.includes('react') || query.includes('useeffect') || query.includes('hook')) {
          replyText = "To optimize your React hooks, use useCallback to memoize complex loaders. This ensures dependencies stay stable and prevents infinite re-render cycles."
        } else if (query.includes('type') || query.includes('typescript') || query.includes('tsc')) {
          replyText = "TypeScript lint checks prevent production runtime exceptions. Never use the 'any' type. Let's explicitly define interfaces for all our Supabase structures."
        } else if (query.includes('python') || query.includes('loop') || query.includes('performance')) {
          replyText = "For resource-intensive Python code, leverage async-await generators. They defer heavy evaluation and free up the main event thread, optimizing CPU utilization."
        }
      } else if (selectedAgentKey === 'scraper') {
        if (query.includes('scrape') || query.includes('playwright') || query.includes('crawler')) {
          replyText = "When crawling web data, always configure random user-agents and polite download intervals (jitter). This keeps requests aligned with standard traffic profiles."
        } else if (query.includes('selector') || query.includes('css') || query.includes('html')) {
          replyText = "Prefer unique attribute selectors (e.g. data-testid) rather than dynamic classes. If selectors are unstable, build custom XPath routes or regular expression matches."
        } else if (query.includes('rate') || query.includes('limit') || query.includes('delay')) {
          replyText = "To handle aggressive server throttling, implement token-bucket rate limiting on the scraper core and queue items for backoff retries."
        }
      }

      const agentMsg: Message = {
        id: Math.random().toString(),
        sender: 'agent',
        text: replyText,
        timestamp: time,
        agentName: activeAgent.name
      }

      setChatHistories(prev => ({
        ...prev,
        [selectedAgentKey]: [...updatedHistory, agentMsg]
      }))
    }, 800)
  }

  const runSimulation = (type: 'scrape' | 'review' | 'rag') => {
    if (isRunningSim) return
    setIsRunningSim(true)
    
    setConsoleLines(prev => [
      ...prev,
      { id: Math.random().toString(), type: 'info', text: `> Running task: ${type.toUpperCase()} command...` }
    ])

    let steps: { type: 'info' | 'success' | 'warning' | 'error'; text: string; delay: number }[] = []

    if (type === 'scrape') {
      steps = [
        { type: 'info', text: 'Connecting to Playwright browser context...', delay: 600 },
        { type: 'info', text: 'Navigating to: https://mock-pharmacy-direct.local/search?q=amoxicillin', delay: 1300 },
        { type: 'success', text: 'Successfully parsed drug rate card: Amoxicillin 500mg - $14.99', delay: 2000 },
        { type: 'success', text: 'Completed scraping simulation. 12 cards fetched, database updated.', delay: 2700 }
      ]
    } else if (type === 'review') {
      steps = [
        { type: 'info', text: 'Scanning project files in workspace...', delay: 500 },
        { type: 'warning', text: 'L26 in src/App.tsx: missing dependency callback in useEffect hook.', delay: 1100 },
        { type: 'warning', text: 'Detected duplicate component file: PriceHistory_2.tsx', delay: 1800 },
        { type: 'success', text: 'Static scan complete. 2 issues identified and logged to CODE_REVIEW.md.', delay: 2400 }
      ]
    } else if (type === 'rag') {
      steps = [
        { type: 'info', text: 'Loading PDF document: cohort_syllabi.pdf', delay: 600 },
        { type: 'info', text: 'Splitting text into chunks (size: 500, overlap: 100)...', delay: 1200 },
        { type: 'info', text: 'Generating vector embeddings via text-embedding-3-small...', delay: 1900 },
        { type: 'success', text: 'Indexed 42 vectors to pgvector database store. Latency: 310ms.', delay: 2500 }
      ]
    }

    steps.forEach(step => {
      setTimeout(() => {
        setConsoleLines(prev => [
          ...prev,
          { id: Math.random().toString(), type: step.type, text: step.text }
        ])
        if (step === steps[steps.length - 1]) {
          setIsRunningSim(false)
        }
      }, step.delay)
    })
  }

  const clearConsole = () => {
    setConsoleLines([
      { id: Math.random().toString(), type: 'info', text: 'Terminal cleared. Active sandbox session refreshed.' }
    ])
  }

  return (
    <>
      <header className="header" id="header-main">
        <div className="container header-inner">
          <div className="logo" id="logo-g65">
            <Brain size={26} color="#a855f7" />
            OUTSKILL G65
            <span className="logo-badge" id="badge-version">v1.2.0</span>
          </div>
          <nav className="nav-links" id="nav-tabs">
            <button 
              id="btn-tab-agents"
              className={`nav-btn ${activeTab === 'agents' ? 'active' : ''}`}
              onClick={() => setActiveTab('agents')}
            >
              <Cpu size={16} />
              AI Agents
            </button>
            <button 
              id="btn-tab-skills"
              className={`nav-btn ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              <Flame size={16} />
              Skills Gauge
            </button>
            <button 
              id="btn-tab-projects"
              className={`nav-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <Layers size={16} />
              Projects
            </button>
          </nav>
        </div>
      </header>

      <main className="container" id="main-content">
        <section className="hero" id="hero-section">
          <h1>Accelerating Agentic Development</h1>
          <p>
            An interactive playground for exploring multi-agent workflows, fine-tuning custom scrapers, and measuring vector-retrieval pipeline performance.
          </p>
        </section>

        <div className="dashboard-grid" id="dashboard-grid-layout">
          {/* Main Display Area based on Tabs */}
          <div className="card" id="card-main-display">
            <div className="card-content">
              {activeTab === 'agents' && (
                <div className="agent-chat" id="agent-chat-container">
                  <div className="card-title" id="chat-title">
                    <span>Active Agent: {activeAgent.name}</span>
                    <span style={{ fontSize: '0.85rem', color: activeAgent.color, fontWeight: '500' }}>
                      {activeAgent.role}
                    </span>
                  </div>

                  <div className="chat-history" id="chat-history-box">
                    {currentChat.map(msg => {
                      const Icon = activeAgent.icon
                      return (
                        <div key={msg.id} className={`chat-bubble ${msg.sender}`} id={`msg-${msg.id}`}>
                          <div className="chat-bubble-meta">
                            {msg.sender === 'agent' ? (
                              <>
                                <Icon size={12} color={activeAgent.color} />
                                <span>{msg.agentName}</span>
                              </>
                            ) : (
                              <span>You (Engineer)</span>
                            )}
                            <span style={{ marginLeft: 'auto', opacity: 0.6 }}>{msg.timestamp}</span>
                          </div>
                          <div className="chat-bubble-text">{msg.text}</div>
                        </div>
                      )
                    })}
                    <div ref={chatEndRef} />
                  </div>

                  <form className="chat-input-area" onSubmit={handleSendMessage} id="chat-form">
                    <input
                      id="input-chat-message"
                      type="text"
                      className="chat-input"
                      placeholder={`Ask ${activeAgent.name} a question... (e.g. "Supabase vector" or "optimize react")`}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <button id="btn-chat-send" type="submit" className="btn-primary">
                      <Send size={16} />
                      Send
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'skills' && (
                <div id="skills-gauge-container">
                  <div className="card-title" id="skills-title">
                    <span>Outskill G65 Cohort Skills Gauge</span>
                    <Sparkles size={18} color="#f59e0b" />
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Visual tracker representing progress in core GenAI Engineering proficiencies.
                  </p>
                  
                  <div className="skills-list" id="skills-list">
                    <div className="skill-item" id="skill-prompt">
                      <div className="skill-header">
                        <span className="skill-name">
                          <BookOpen size={16} color="#3b82f6" /> Prompt Engineering & Structured Outputs
                        </span>
                        <span className="skill-level">92%</span>
                      </div>
                      <div className="skill-bar-container">
                        <div className="skill-bar" style={{ width: '92%', background: '#3b82f6' }}></div>
                      </div>
                    </div>

                    <div className="skill-item" id="skill-rag">
                      <div className="skill-header">
                        <span className="skill-name">
                          <Database size={16} color="#c084fc" /> RAG Architectures & Chunking Strategies
                        </span>
                        <span className="skill-level">85%</span>
                      </div>
                      <div className="skill-bar-container">
                        <div className="skill-bar" style={{ width: '85%', background: '#c084fc' }}></div>
                      </div>
                    </div>

                    <div className="skill-item" id="skill-agents">
                      <div className="skill-header">
                        <span className="skill-name">
                          <Cpu size={16} color="#10b981" /> Multi-Agent Orchestration & Tool Use
                        </span>
                        <span className="skill-level">78%</span>
                      </div>
                      <div className="skill-bar-container">
                        <div className="skill-bar" style={{ width: '78%', background: '#10b981' }}></div>
                      </div>
                    </div>

                    <div className="skill-item" id="skill-scraping">
                      <div className="skill-header">
                        <span className="skill-name">
                          <Code size={16} color="#f59e0b" /> Robust Web Scraping & Jitter Logic
                        </span>
                        <span className="skill-level">90%</span>
                      </div>
                      <div className="skill-bar-container">
                        <div className="skill-bar" style={{ width: '90%', background: '#f59e0b' }}></div>
                      </div>
                    </div>

                    <div className="skill-item" id="skill-sec">
                      <div className="skill-header">
                        <span className="skill-name">
                          <Shield size={16} color="#ef4444" /> Guardrails & Model Evaluation
                        </span>
                        <span className="skill-level">70%</span>
                      </div>
                      <div className="skill-bar-container">
                        <div className="skill-bar" style={{ width: '70%', background: '#ef4444' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div id="projects-gallery-container">
                  <div className="card-title" id="projects-title">
                    <span>Cohort Project Registries</span>
                    <Layers size={18} color="#3b82f6" />
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Active projects built and maintained by G65 cohort members.
                  </p>
                  
                  <div className="project-gallery" id="projects-gallery">
                    {PROJECTS.map(proj => (
                      <div key={proj.name} className="project-card" id={`project-${proj.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        <div className="project-header">
                          <span className="project-name">{proj.name}</span>
                          <span className={`status-indicator ${proj.status}`}>
                            {proj.status === 'ready' ? 'Ready' : 'Building'}
                          </span>
                        </div>
                        <p className="project-desc">{proj.desc}</p>
                        <div className="project-tags">
                          {proj.tags.map(tag => (
                            <span key={tag} className="project-tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar Area: Agent Selection & Interactive Terminal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} id="sidebar-layout">
            
            {/* Agent Picker Panel */}
            <div className="card" id="card-agent-picker">
              <div className="card-content">
                <div className="card-title" id="agent-picker-title">Orchestrate Agent</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }} id="agent-buttons-group">
                  {(Object.keys(AGENTS) as Array<keyof typeof AGENTS>).map(key => {
                    const agent = AGENTS[key]
                    const Icon = agent.icon
                    const isSelected = selectedAgentKey === key
                    return (
                      <button
                        key={key}
                        id={`btn-agent-select-${key}`}
                        className="btn-secondary"
                        style={{
                          justifyContent: 'flex-start',
                          borderLeft: isSelected ? `4px solid ${agent.color}` : '1px solid var(--border-color)',
                          background: isSelected ? 'rgba(255, 255, 255, 0.03)' : '',
                          padding: '0.85rem 1.25rem'
                        }}
                        onClick={() => setSelectedAgentKey(key)}
                      >
                        <Icon size={18} color={agent.color} />
                        <div style={{ textAlign: 'left', marginLeft: '0.5rem' }}>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                            {agent.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {agent.role}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Micro-System Sandbox */}
            <div className="card" id="card-system-sandbox" style={{ background: '#0e0e13' }}>
              <div className="card-content">
                <div className="card-title" id="sandbox-title" style={{ color: '#10b981' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Terminal size={18} /> Sandbox Console
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    g65-cli
                  </span>
                </div>

                <div className="console-terminal" id="console-terminal-box">
                  {consoleLines.map(line => (
                    <div key={line.id} className="console-line">
                      <span className="console-prompt">$</span>
                      <span className={`console-text ${line.type}`}>{line.text}</span>
                    </div>
                  ))}
                  <div ref={consoleEndRef} />
                </div>

                <div className="console-actions" id="console-actions">
                  <button 
                    id="btn-sandbox-scrape"
                    className="btn-secondary" 
                    onClick={() => runSimulation('scrape')}
                    disabled={isRunningSim}
                    style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                  >
                    <RefreshCw size={12} className={isRunningSim ? 'spin' : ''} />
                    Scrape Demo
                  </button>
                  <button 
                    id="btn-sandbox-review"
                    className="btn-secondary" 
                    onClick={() => runSimulation('review')}
                    disabled={isRunningSim}
                    style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                  >
                    <Play size={12} />
                    Code Review
                  </button>
                  <button 
                    id="btn-sandbox-rag"
                    className="btn-secondary" 
                    onClick={() => runSimulation('rag')}
                    disabled={isRunningSim}
                    style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                  >
                    <Database size={12} />
                    RAG Index
                  </button>
                  <button 
                    id="btn-sandbox-clear"
                    className="btn-secondary" 
                    onClick={clearConsole}
                    style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', marginLeft: 'auto' }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="footer" id="footer-main">
        <div className="container">
          <p>© 2026 Outskill G65 Cohort. All rights reserved.</p>
          <div className="footer-links">
            <a href="https://github.com/DamionLock/G65" target="_blank" className="footer-link" id="link-footer-repo">
              GitHub Repository
            </a>
            <a href="#" className="footer-link" id="link-footer-docs">
              Documentation
            </a>
            <a href="#" className="footer-link" id="link-footer-support">
              Support Channel
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
