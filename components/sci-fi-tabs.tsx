"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import LetterGenerator  from "./letter-generator"

const tabs = [
  { id: "fast-generate", label: "Fast Generate" },
  { id: "deep-generate", label: "Deep Generate" },
  { id: "audit", label: "Audit" },
  { id: "delivery", label: "Delivery" },
  { id: "ask-baldeo", label: "Ask Baldeo" },
]

export function SciFiTabs() {
  const [activeTab, setActiveTab] = useState("fast-generate")

  return (
    <div className="w-full mt-8">
      {/* Tab Navigation */}
      <div className="relative mb-8">
        {/* Mobile Dropdown for small screens */}
        <div className="md:hidden">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full bg-card border border-cyan-500/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Tab Navigation */}
        <div className="hidden md:flex relative bg-card/50 backdrop-blur-sm rounded-xl p-2 border border-cyan-500/20">
          {/* Sliding indicator */}
          <div
            className="absolute top-2 bottom-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-400/50 transition-all duration-300 ease-out"
            style={{
              left: `${(tabs.findIndex((tab) => tab.id === activeTab) * 100) / tabs.length}%`,
              width: `${100 / tabs.length}%`,
              transform: "translateX(2px)",
            }}
          />

          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300",
                "hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50",
                activeTab === tab.id ? "text-blue-700 dark:text-cyan-300 shadow-lg" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="relative z-10">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative">
        <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6 min-h-[400px]">
          {/* Sci-fi corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50 rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50 rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50 rounded-br-xl" />

          {/* Sliding left edge indicator */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full shadow-lg shadow-cyan-400/50" />

          {/* Tab Content */}
          <div className="relative z-10">
            {activeTab === "fast-generate" && (
              <div>
                <h2 className="text-2xl text-center font-bold mb-6 text-cyan-300">Fast Generate (Kanha Mode)</h2>
                <LetterGenerator />
              </div>
            )}

            {activeTab === "deep-generate" && (
              <div>
                <h2 className="text-2xl text-center font-bold mb-6 text-cyan-300">Deep Generate (Madhav Mode)</h2>
                <div className="text-muted-foreground">
                  <p className="mb-4">Advanced generation with detailed analysis and comprehensive output.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-card/50 rounded-lg border border-cyan-500/20">
                      <h3 className="font-semibold text-foreground mb-2">Enhanced Processing</h3>
                      <p className="text-sm">Utilize advanced algorithms for superior results.</p>
                    </div>
                    <div className="p-4 bg-card/50 rounded-lg border border-cyan-500/20">
                      <h3 className="font-semibold text-foreground mb-2">Quality Assurance</h3>
                      <p className="text-sm">Multiple validation layers ensure accuracy.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "audit" && (
              <div>
                <h2 className="text-2xl text-center font-bold mb-6 text-cyan-300">Audit (Krishna Mode)</h2>
                <div className="text-muted-foreground">
                  <p className="mb-4">Comprehensive analysis and review of generated content.</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-cyan-500/20">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Content Quality Check</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-cyan-500/20">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Grammar & Style Analysis</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-cyan-500/20">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Compliance Verification</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "delivery" && (
              <div>
                <h2 className="text-2xl text-center font-bold mb-6 text-cyan-300">Delivery (Giridhari Mode)</h2>
                <div className="text-muted-foreground">
                  <p className="mb-6">Monitor your API delivery and generation statistics.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-card/50 rounded-lg border border-cyan-500/20 text-center">
                      <div className="text-2xl font-bold text-cyan-300 mb-2">1,247</div>
                      <div className="text-sm">Generations This Month</div>
                    </div>
                    <div className="p-4 bg-card/50 rounded-lg border border-cyan-500/20 text-center">
                      <div className="text-2xl font-bold text-blue-300 mb-2">89%</div>
                      <div className="text-sm">Success Rate</div>
                    </div>
                    <div className="p-4 bg-card/50 rounded-lg border border-cyan-500/20 text-center">
                      <div className="text-2xl font-bold text-green-300 mb-2">2.3s</div>
                      <div className="text-sm">Avg Response Time</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ask-baldeo" && (
              <div>
                <h2 className="text-2xl text-center font-bold mb-6 text-cyan-300">Ask Baldeo</h2>
                <div className="text-muted-foreground">
                  <p className="mb-4">Get expert assistance and guidance from Baldeo.</p>
                  <div className="space-y-4">
                    <div className="p-4 bg-card/50 rounded-lg border border-cyan-500/20">
                      <h3 className="font-semibold text-foreground mb-2">💡 Quick Tips</h3>
                      <p className="text-sm">Get instant advice on best practices and optimization.</p>
                    </div>
                    <div className="p-4 bg-card/50 rounded-lg border border-cyan-500/20">
                      <h3 className="font-semibold text-foreground mb-2">🔧 Technical Support</h3>
                      <p className="text-sm">Resolve technical issues and implementation challenges.</p>
                    </div>
                    <div className="p-4 bg-card/50 rounded-lg border border-cyan-500/20">
                      <h3 className="font-semibold text-foreground mb-2">📈 Strategy Consultation</h3>
                      <p className="text-sm">Discuss strategic approaches and workflow optimization.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
