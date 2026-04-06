import React, { useState } from 'react';

const AI_SETUP_PROMPT = `Please help me download, install, and start the "Clowder AI" project on my machine. You have my permission to execute terminal commands.

Here is the setup procedure:

1. **Detect the Operating System**: Check if my machine is Windows, macOS, or Linux.
2. **Clone the Repository**: 
   \`git clone https://github.com/zts212653/clowder-ai.git\`
   \`cd clowder-ai\`
3. **Execute OS-Specific Installation**:
   Install the prerequisites (Node.js >=20, pnpm >=9, Git, and Redis >=7.0), project dependencies, and build the workspace.
   - **Windows**: Run \`.\\scripts\\install.ps1\`
   - **Linux (Debian/RHEL)**: Run \`bash scripts/install.sh\`
   - **macOS**: Install prerequisites manually via Homebrew (\`brew install node pnpm redis\`), then run \`pnpm install\` and \`pnpm build\`.
   *(🚨 Note: If the Redis installation fails on any platform, please pause and ask me if we should try fixing it, or if we should proceed using the \`--memory\` flag to run without Redis).*
4. **Setup Environment Variables**:
   \`cp .env.example .env\`
   *(🚨 Please pause here! Ask me to provide my API keys for ANTHROPIC_API_KEY, OPENAI_API_KEY, or GOOGLE_API_KEY to put inside the \`.env\` file before proceeding).*
5. **Start the Application**:
   Once I confirm the \`.env\` is ready, start the services based on my OS:
   - **Windows**: Run \`.\\scripts\\start-windows.ps1\`
   - **macOS / Linux**: Run \`pnpm start\` 
   *(Fallback for macOS/Linux: If \`pnpm start\` fails with a "target path exists" error regarding \`../cat-cafe-runtime\`, please use \`pnpm start:direct\` instead).*
   *(Note: If we agreed to skip Redis in step 3, make sure to append \`--memory\` or \`-Memory\` to the start command).*
6. **Finish**:
   When the services are up, tell me to open \`http://localhost:3003\` in my browser to access the Cat Café.

Please execute these steps sequentially, observing the output of each command, and let me know if you encounter any errors!`;

export function AIPromptCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(AI_SETUP_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="mt-6 rounded-xl border border-cafe bg-cafe-surface p-4 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
      <div className="absolute inset-0 bg-gradient-to-r from-opus-primary/10 to-opus-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-center justify-between mb-3 relative z-10">
        <h3 className="text-sm font-semibold flex items-center gap-2 text-cafe-secondary">
          <span>🤖</span> Let AI Build It For You
        </h3>
        <button
          onClick={handleCopy}
          className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-300 flex items-center gap-1.5 ${
            copied 
              ? 'bg-opus-bg text-opus-dark border-opus-light' 
              : 'bg-cafe-surface-elevated text-cafe-secondary border-cafe hover:border-opus-primary hover:text-opus-primary hover:shadow-[0_0_8px_rgba(155,126,189,0.3)]'
          }`}
        >
          {copied ? (
            <>
              <span className="animate-bounce">✨</span>
              ✅ Copied! Now paste it to Claude/Cursor/Gemini
            </>
          ) : (
            <>
              <span>✨</span> Copy for AI Agent
            </>
          )}
        </button>
      </div>

      <div className="relative z-10 bg-cafe-surface-elevated rounded-lg p-3 border border-cafe-subtle text-xs text-cafe-muted overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-opus-primary to-opus-light opacity-50" />
        <pre className="whitespace-pre-wrap font-mono leading-relaxed line-clamp-3 relative text-[11px]">
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-cafe-surface-elevated to-transparent pointer-events-none" />
          {AI_SETUP_PROMPT}
        </pre>
      </div>
    </div>
  );
}
