const fs = require('fs');
const content = fs.readFileSync('c:/Users/mirak/OneDrive/Desktop/protocolo-zero-academy/index.html', 'utf8');
const oldSnippet = `                <!-- ANTIGRAVITY AGENT TRAJECTORY COMPONENT -->
                <div class="agent-trajectory" id="simTrajectory" style="display:none">
                  <div class="agent-step agent-step--header">
                    <span class="step-text">Editing <span class="step-file">index.html</span></span>
                    <span class="step-caret">⌵</span>
                  </div>
                  <div class="agent-step">
                    <span class="step-text">Ran <span class="step-cmd">list all buttons in index.html</span></span>
                    <span class="step-shield"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
                    <span class="step-chevron">›</span>
                  </div>
                  <div class="agent-step agent-step--thought">
                    <span class="step-text">Thought for 8s</span>
                    <span class="step-chevron">›</span>
                  </div>
                  <div class="agent-step">
                    <span class="step-text">Ran <span class="step-cmd">find all href=#oferta</span></span>
                    <span class="step-shield"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
                    <span class="step-exit">· Exited with code 1</span>
                    <span class="step-chevron">›</span>
                  </div>
                  <div class="agent-step">
                    <span class="step-text">Created <span class="badge-code badge-code--js">JS</span> <span class="step-file">find_oferta.js</span></span>
                  </div>
                  <div class="agent-step">
                    <span class="step-text">Ran <span class="step-cmd">run find_oferta.js</span></span>
                    <span class="step-shield"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
                    <span class="step-chevron">›</span>
                  </div>
                  <div class="agent-step agent-step--thought">
                    <span class="step-text">Thought for 7s</span>
                    <span class="step-chevron">›</span>
                  </div>
                  <div class="agent-step">
                    <span class="step-text">Analyzed <span class="badge-code badge-code--tag">&lt;/&gt;</span> <span class="step-file">index.html</span> <span class="step-lines">#L48-68</span></span>
                  </div>
                  <div class="agent-step">
                    <span class="step-text">Edited <span class="badge-code badge-code--tag">&lt;/&gt;</span> <span class="step-file">index.html</span> <span class="diff-add">+2</span> <span class="diff-del">-2</span></span>
                  </div>
                  <div class="agent-step agent-step--working">
                    <span class="working-pill">
                      <span class="working-dot"></span>
                      <span class="working-text">Working</span>
                    </span>
                  </div>
                </div>`;

const newSnippet = `                <!-- ANTIGRAVITY AGENT TRAJECTORY COMPONENT -->
                <div class="agent-trajectory" id="simTrajectory" style="display:none">
                  <div class="agent-step agent-step--header">
                    <span class="step-text">Editing <span class="step-file">bypass_kernel.py</span></span>
                    <span class="step-caret">⌵</span>
                  </div>
                  <div class="agent-step">
                    <span class="step-text">Ran <span class="step-cmd">inject_semantic_override</span></span>
                    <span class="step-shield"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
                    <span class="step-chevron">›</span>
                  </div>
                  <div class="agent-step agent-step--thought">
                    <span class="step-text">Thought for 5s</span>
                    <span class="step-chevron">›</span>
                  </div>
                  <div class="agent-step">
                    <span class="step-text">Ran <span class="step-cmd">audit target endpoints</span></span>
                    <span class="step-shield"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
                    <span class="step-exit">· Exited with code 0</span>
                    <span class="step-chevron">›</span>
                  </div>
                  <div class="agent-step">
                    <span class="step-text">Created <span class="badge-code badge-code--py">PY</span> <span class="step-file">endpoint_cloner.py</span></span>
                  </div>
                  <div class="agent-step">
                    <span class="step-text">Ran <span class="step-cmd">run endpoint_cloner.py</span></span>
                    <span class="step-shield"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
                    <span class="step-chevron">›</span>
                  </div>
                  <div class="agent-step agent-step--thought">
                    <span class="step-text">Thought for 3s</span>
                    <span class="step-chevron">›</span>
                  </div>
                  <div class="agent-step">
                    <span class="step-text">Analyzed <span class="badge-code badge-code--tag">&lt;/&gt;</span> <span class="step-file">target_dom_tree.html</span> <span class="step-lines">#L48-260</span></span>
                  </div>
                  <div class="agent-step">
                    <span class="step-text">Edited <span class="badge-code badge-code--tag">&lt;/&gt;</span> <span class="step-file">cloned_payload.json</span> <span class="diff-add">+128</span> <span class="diff-del">-0</span></span>
                  </div>
                  <div class="agent-step agent-step--working">
                    <span class="working-pill">
                      <span class="working-dot"></span>
                      <span class="working-text">Working</span>
                    </span>
                  </div>
                </div>`;

if (content.includes('id="simTrajectory"')) {
  const start = content.indexOf('<!-- ANTIGRAVITY AGENT TRAJECTORY COMPONENT -->');
  const end = content.indexOf('</div>', content.indexOf('class="agent-step agent-step--working"')) + 6;
  const replaced = content.substring(0, start) + newSnippet + content.substring(end + 17); // adjust closing
  console.log('Found start at', start, 'end at', end);
}
