function getMethodColor(method) {
  const colors = {
    GET: "bg-green-100 text-green-800",
    POST: "bg-blue-100 text-blue-800",
    PUT: "bg-yellow-100 text-yellow-800",
    DELETE: "bg-red-100 text-red-800",
    PATCH: "bg-purple-100 text-purple-800",
  };
  return colors[method] || "bg-gray-100 text-gray-800";
}

function getStatusColor(status) {
  if (status >= 200 && status < 300) return "text-green-600";
  if (status >= 300 && status < 400) return "text-yellow-600";
  return "text-red-600";
}

function syntaxHighlight(json) {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }

  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      let cls = "json-number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "json-key";
        } else {
          cls = "json-string";
        }
      } else if (/true|false/.test(match)) {
        cls = "json-number";
      } else if (/null/.test(match)) {
        cls = "syntax-highlight";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}

async function copyToClipboard(text, buttonId) {
  try {
    await navigator.clipboard.writeText(text);
    const button = document.getElementById(buttonId);
    const icon = button.querySelector(".material-icons");

    // Change to check mark with animation
    icon.textContent = "check";
    icon.classList.add("copy-success");

    // Reset after 2 seconds
    setTimeout(() => {
      icon.textContent = "content_copy";
      icon.classList.remove("copy-success");
    }, 2000);
  } catch (err) {
    console.error("Failed to copy: ", err);
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      const button = document.getElementById(buttonId);
      const icon = button.querySelector(".material-icons");
      icon.textContent = "check";
      icon.classList.add("copy-success");
      setTimeout(() => {
        icon.textContent = "content_copy";
        icon.classList.remove("copy-success");
      }, 2000);
    } catch (fallbackErr) {
      console.error("Fallback copy failed: ", fallbackErr);
    }
    document.body.removeChild(textArea);
  }
}

function createApiCard(api, index) {
  const hasTestData = Object.keys(api.testData).length > 0;

  return `
                <div class="bg-white rounded-xl shadow-sm border border-white/20 card-hover overflow-hidden">
                    <!-- Card Header -->
                    <div class="p-6 border-b border-gray-100/50">
                        <div class="flex items-start justify-between gap-4">
                            <div class="flex-1">
                                <div class="flex items-center gap-3 mb-3">
                                    <span class="method-badge px-3 py-1 rounded-full ${getMethodColor(
                                      api.method
                                    )}">
                                        ${api.method}
                                    </span>
                                    <span class="text-sm font-medium ${getStatusColor(
                                      api.statusCode
                                    )}">
                                        ${api.statusCode}
                                    </span>
                                </div>
                                
                                <div class="flex items-center gap-2 mb-3">
                                    <code class="text-sm bg-gray-50/80 px-3 py-2 rounded-lg text-gray-800 flex-1 font-mono backdrop-blur-sm">
                                        ${api.url}
                                    </code>
                                    <button 
                                        id="copy-url-${index}" 
                                        onclick="copyToClipboard('${
                                          api.url
                                        }', 'copy-url-${index}')"
                                        class="copy-button p-2 rounded-lg hover:bg-gray-50/80 transition-all duration-200"
                                        title="Copy URL"
                                    >
                                        <span class="material-icons text-gray-500 text-20">content_copy</span>
                                    </button>
                                </div>
                                
                                <p class="text-gray-600 text-sm leading-relaxed">
                                    ${api.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    ${
                      hasTestData
                        ? `
                    <!-- Test Data Section -->
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                                Test Data
                            </h4>
                            <button 
                                id="copy-data-${index}" 
                                onclick="copyToClipboard('${JSON.stringify(
                                  api.testData,
                                  null,
                                  2
                                )}', 'copy-data-${index}')"
                                class="copy-button p-2 rounded-lg hover:bg-gray-50/80 transition-all duration-200"
                                title="Copy test data"
                            >
                                <span class="material-icons text-gray-500 text-16">content_copy</span>
                            </button>
                        </div>
                        
                        <div class="code-block p-4 overflow-x-auto">
                            <pre class="text-sm"><code>${syntaxHighlight(
                              api.testData
                            )}</code></pre>
                        </div>
                    </div>
                    `
                        : ""
                    }
                </div>
            `;
}

function createSection(sectionName, apis) {
  const sectionTitle =
    sectionName.charAt(0).toUpperCase() + sectionName.slice(1);

  return `
                <section class="space-y-6">
                    <div class="flex items-center gap-3 mb-8">
                        <div class="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                        <h2 class="text-2xl font-bold text-gray-900">${sectionTitle} APIs</h2>
                        <span class="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium border border-blue-100/50">
                            ${apis.length} endpoint${
    apis.length !== 1 ? "s" : ""
  }
                        </span>
                    </div>
                    
                    <div class="grid-two-columns">
                        ${apis
                          .map((api, index) =>
                            createApiCard(api, `${sectionName}-${index}`)
                          )
                          .join("")}
                    </div>
                </section>
            `;
}

function renderApiDocumentation(data = apiData) {
  const container = document.getElementById("api-container");
  const sections = Object.entries(data)
    .map(([sectionName, apis]) => createSection(sectionName, apis))
    .join("");

  container.innerHTML = sections;
}

// For fetching from actual Data.json file
async function loadApiData() {
  try {
    const response = await fetch("./Data.json");
    const data = await response.json();
    renderApiDocumentation(data);
  } catch (error) {
    console.error("Error loading API data:", error);
    // Fallback to sample data
    renderApiDocumentation(apiData);
  }
}

// Initialize the documentation
document.addEventListener("DOMContentLoaded", function () {
  // Try to load from Data.json, fallback to sample data
  loadApiData();
});
