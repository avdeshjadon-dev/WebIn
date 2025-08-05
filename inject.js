(() => {
  if (document.getElementById("webhub-shadow-host")) {
    document.getElementById("webhub-shadow-host").remove();
    return;
  }

  const host = document.createElement("div");
  host.id = "webhub-shadow-host";
  host.style.position = "fixed";
  host.style.zIndex = "999999";

  const shadow = host.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = `
    * {
      box-sizing: border-box !important;
      margin: 0 !important;
      padding: 0 !important;
      font-family: 'Segoe UI', Roboto, -apple-system, sans-serif !important;
      line-height: 1.5 !important;
    }
    .wrapper {
      width: 90vw !important;
      max-width: 800px !important;
      height: 45vh !important;
      background: #ffffff !important;
      color: #000000 !important;
      border-radius: 14px !important;
      box-shadow: 0 12px 30px rgba(0,0,0,0.15) !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
    }
    .header {
      background: #f0f0f0 !important;
      color: #111 !important;
      padding: 12px 16px !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      cursor: grab !important;
      font-weight: 600 !important;
      font-size: 16px !important;
      border-top-left-radius: 14px !important;
      border-top-right-radius: 14px !important;
      user-select: none !important;
    }
    .title-container {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
    }
    .header-logo {
        width: 24px !important;
        height: 24px !important;
    }
    .close {
      background: transparent !important;
      border: none !important;
      font-size: 20px !important;
      cursor: pointer !important;
      color: inherit !important;
      width: 24px !important;
      height: 24px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    .nav {
      display: flex !important;
      gap: 10px !important;
      padding: 10px !important;
      background: #eaeaea !important;
      justify-content: center !important;
    }
    .nav button {
      padding: 6px 14px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      border: none !important;
      border-radius: 8px !important;
      cursor: pointer !important;
      background: #fff !important;
      color: #333 !important;
    }
    .nav button:hover {
      background: #f0f0f0 !important;
    }
    .content {
      flex: 1 !important;
      overflow-y: auto !important;
      padding: 16px !important;
      display: grid !important;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)) !important;
      gap: 14px !important;
      background: #fff !important;
    }
    .card {
      background: #fff !important;
      border-radius: 10px !important;
      padding: 10px 6px !important;
      text-align: center !important;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05) !important;
      transition: transform 0.2s ease, box-shadow 0.2s ease !important;
      cursor: pointer !important;
      border: 1px solid rgba(0,0,0,0.05) !important;
      height: 100px !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
    }
    .card:hover {
      transform: scale(1.03) !important;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
    }
    .card img {
      width: 36px !important;
      height: 36px !important;
      margin-bottom: 6px !important;
      object-fit: contain !important;
    }
    .card p {
      margin: 0 !important;
      font-size: 12px !important;
      color: #222 !important;
      font-weight: 500 !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
      width: 100% !important;
    }
    .content::-webkit-scrollbar {
      width: 8px !important;
    }
    .content::-webkit-scrollbar-track {
      background: #f1f1f1 !important;
    }
    .content::-webkit-scrollbar-thumb {
      background: #c1c1c1 !important;
      border-radius: 4px !important;
    }
    .content::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8 !important;
    }
  `;
  shadow.appendChild(style);

  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";

  const header = document.createElement("div");
  header.className = "header";

  const titleContainer = document.createElement("div");
  titleContainer.className = "title-container";

  const logo = document.createElement("img");
  logo.src = "https://img.icons8.com/?size=200&id=nDNCmmDBtU8l&format=png";
  logo.alt = "WebHub Logo";
  logo.className = "header-logo";

  const title = document.createElement("span");
  title.textContent = "WebHub";

  titleContainer.appendChild(logo);
  titleContainer.appendChild(title);

  const close = document.createElement("button");
  close.className = "close";
  close.innerHTML = "×";
  close.onclick = () => host.remove();

  header.appendChild(titleContainer);
  header.appendChild(close);
  wrapper.appendChild(header);

  const nav = document.createElement("div");
  nav.className = "nav";
  const tabs = [
    "Coding Platforms",
    "OpenSource Tools",
    "AI Tools",
    "Social",
    "Entertainment",
  ];

  let currentTab = "OpenSource Tools";

  const content = document.createElement("div");
  content.className = "content";

  const tabContent = {
    "Coding Platforms": [
      {
        name: "LeetCode",
        url: "https://leetcode.com",
        icon: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
      },
      {
        name: "Codeforces",
        url: "https://codeforces.com",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAsVBMVEX///9PgcH/1ACuDwpHfL+ctNj/0QD/9typAADv3NxhjMatBAD/4XTTl5f/1zC0NDI9d72Co9Fpksm6y+Tc5fGnvd08dr3T3u5WhsPo7vawxOGhudv/9tP/7rH/1hP//vfZoJ+wFxP/54v/7az/6JT//fL/9Mr/3VL/31z/4Wz/5ID/8Lv/2z/57u3lwcDqzMveray/U1G6RkTJc3HQiIfNgYD/++nEZmX25+a5QT7CXVtLKWyXAAADgElEQVR4nO3daVPaQBjA8RhjDAQxAcJlBe8DgXJVab//B2s4qu10Zo+nQ5Nt///XZmd/86zgG7OeR0RERERERERERERE9F/UytJGVVUjzVpFb/IPanaTIDhSFwRJt1n0RoW1qjrdu7Lq5BybbUPfpraDY8xsgDkxK3rDtjUTK+DRUeLYFHu2wJzYK3rTVjVMP2Q+ChpFb9qmjv0I8yF2it62Ran9CPMhpkVv2yLJCPMhFr1t80SH1Klj2pcc0vyY9oveuHEXQuFF0Rs37kQoPCl648YhRFj+ECIsfwgRlj+ECMsfQoTlDyHC8ocQYflDiLD8IUR4qE4vb2rKRrefzFYqp/CyHoahry4MB3f3jgoffJ3uHXnrpPDG0Lc1Pg7dEz5ZAPMGOmLphDU7oO/XHRNe2gL98Nkp4b01MCc+uCQcCYSac1ou4VDg0w2xXMIXyQh9v+aOcCQC+r47wrEMGKr+eiuXcCAUnjojlAERIkSIECFChAgRIkSI0HnhZHp1pmz22Wnh7DyKolhZ/gPzqavC6XUUHxsUR4uKk8KlmW9nvHJQuIhMfZuipXPCufEA98SVY8KV1QS3xKlTwoo18DiOnRIuLM/odogrh4SCEe6G6Izwi2CE299EZ4TXImG8ckY4kRzSXLhwRij6Ncy7/ueFxwgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSI8ADCQ7xH+BB3q8v/H78uFL4qdtMXCvuKNdfCdyqcezWZUPk+704iEiYd1aKxiBgvBTcjbHtSbcYTCpVrvsnebTITXY2QH9IX5W5SyTENUuWaU9EMo4nnPYlmqNyM7JiqD6ns9S3xW/7gq+R+C911Og37IQYNzZozwRCj9eZJm2t09o01m/F69kNMerpFv1oPcfc6M8nlAfpLn5q2xKSpXXMSWxLj+f7Joe13ourb/kdZ2wrYzgzWrNgR8+/C9x5t7nsaqL7sP2raENv6CW5a23zaRPOfH70zJobP2gut9rWqpic1qbYM1/TeTF8NGUdnvz75WtPeurbhhY+Gl8tta3aTQPehGgRJ12yAuypz3dtLd28wXU5+e3T4MhrXlY1rt2YH9KNWljaqqhppZjy/fevZcnGu7Ntqql+GiIiIiIiIiIiIiIjob/cdbx3Q0gt9Dn0AAAAASUVORK5CYII=",
      },
      {
        name: "HackerRank",
        url: "https://www.hackerrank.com",
        icon: "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png",
      },
      {
        name: "CodeChef",
        url: "https://www.codechef.com",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4CHTzdlZAsS_9wR7mXJuQKZeqGH1jaS4tLw&s",
      },
      {
        name: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org",
        icon: "https://media.geeksforgeeks.org/gfg-gg-logo.svg",
      },
      {
        name: "Exercism",
        url: "https://exercism.org",
        icon: chrome.runtime.getURL("images/exercism.svg"),
      },
      {
        name: "freeCodeCamp",
        url: "https://www.freecodecamp.org",
        icon: "data:image/png;base64,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",
      },
      {
        name: "W3Schools",
        url: "https://www.w3schools.com",
        icon: "https://www.w3schools.com/favicon.ico",
      },
    ],
    "OpenSource Tools": [
      {
        name: "GitHub",
        url: "https://github.com",
        icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
      },
      {
        name: "Stack Overflow",
        url: "https://stackoverflow.com",
        icon: "https://cdn-icons-png.flaticon.com/512/2111/2111628.png",
      },
      {
        name: "SourceForge",
        url: "https://sourceforge.net",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIKTr3PXDrlyqSD3sICodXs36SpIUK9XsoxUn3lW50-HwFoC70Q1QCScdGyg4Gnl5PLCA&usqp=CAU",
      },
    ],
    Social: [
      {
        name: "LinkedIn",
        url: "https://linkedin.com",
        icon: "https://cdn-icons-png.flaticon.com/128/145/145807.png",
      },
      {
        name: "WhatsApp",
        url: "https://www.whatsapp.com",
        icon: "https://cdn-icons-png.flaticon.com/128/15707/15707820.png",
      },
      {
        name: "Facebook",
        url: "https://facebook.com",
        icon: "https://cdn-icons-png.flaticon.com/128/5968/5968764.png",
      },
      {
        name: "Instagram",
        url: "https://instagram.com",
        icon: "https://cdn-icons-png.flaticon.com/128/15707/15707749.png",
      },
      {
        name: "Threads",
        url: "https://www.threads.net",
        icon: "https://cdn-icons-png.flaticon.com/128/12105/12105338.png",
      },
      {
        name: "Twitter",
        url: "https://twitter.com",
        icon: "https://cdn-icons-png.flaticon.com/128/3670/3670151.png",
      },
      {
        name: "Snapchat",
        url: "https://snapchat.com",
        icon: "https://cdn-icons-png.flaticon.com/128/15707/15707784.png",
      },
      {
        name: "Reddit",
        url: "https://reddit.com",
        icon: "https://cdn-icons-png.flaticon.com/128/3670/3670226.png",
      },
      {
        name: "Discord",
        url: "https://discord.com",
        icon: "https://cdn-icons-png.flaticon.com/128/3670/3670157.png",
      },
      {
        name: "Quora",
        url: "https://www.quora.com",
        icon: "https://cdn-icons-png.flaticon.com/128/4494/4494531.png",
      },
    ],
    Entertainment: [
      {
        name: "YouTube",
        url: "https://youtube.com",
        icon: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
      },
      {
        name: "Netflix",
        url: "https://netflix.com",
        icon: "https://cdn-icons-png.flaticon.com/512/732/732228.png",
      },
      {
        name: "Prime Video",
        url: "https://primevideo.com",
        icon: "https://img.icons8.com/?size=520&id=Rs68BrhxH0XZ&format=png",
      },
    ],
    "AI Tools": [
      {
        name: "ChatGPT",
        url: "https://chat.openai.com",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/ChatGPT-Logo.svg/640px-ChatGPT-Logo.svg.png",
      },
      {
        name: "DeepSeek",
        url: "https://chat.deepseek.com/",
        icon: chrome.runtime.getURL("images/deepseek.svg"),
      },
      {
        name: "Perplexity",
        url: "https://www.perplexity.ai",
        icon: chrome.runtime.getURL("images/perplexity.svg"),
      },
      {
        name: "Claude",
        url: "https://claude.ai/new",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Claude_AI_symbol.svg/1200px-Claude_AI_symbol.svg.png?20250427183551",
      },
      {
        name: "Gemini",
        url: "https://gemini.google.com",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/688px-Google_Gemini_logo.svg.png?20240222040508",
      },
      {
        name: "Copilot",
        url: "https://copilot.com",
        icon: "https://1000logos.net/wp-content/uploads/2023/11/Copilot-Logo.png",
      },
      {
        name: "Grok",
        url: "https://grok.com",
        icon: chrome.runtime.getURL("images/grok.svg"),
      },
    ],
  };

  const renderContent = (tab) => {
    content.innerHTML = "";
    if (tabContent[tab]) {
      tabContent[tab].forEach((app) => {
        const card = document.createElement("div");
        card.className = "card";
        card.onclick = () => window.open(app.url, "_blank");

        const img = document.createElement("img");
        img.src = app.icon;
        img.alt = app.name;
        img.onerror = () => {
          img.style.display = "none";
        };

        const name = document.createElement("p");
        name.textContent = app.name;

        card.appendChild(img);
        card.appendChild(name);
        content.appendChild(card);
      });
    }
  };

  tabs.forEach((tab) => {
    const btn = document.createElement("button");
    btn.textContent = tab;
    btn.onclick = () => {
      currentTab = tab;
      renderContent(tab);
      Array.from(nav.children).forEach((b) => (b.style.background = "#fff"));
      btn.style.background = "#e0e0e0";
    };
    nav.appendChild(btn);
  });

  wrapper.appendChild(nav);
  wrapper.appendChild(content);
  shadow.appendChild(wrapper);
  document.body.appendChild(host);

  renderContent(currentTab);

  const centerWindow = () => {
    const width = host.offsetWidth;
    const height = host.offsetHeight;
    host.style.left = `${(window.innerWidth - width) / 2}px`;
    host.style.top = `${(window.innerHeight - height) / 2}px`;
  };
  setTimeout(centerWindow, 0);

  let offsetX = 0,
    offsetY = 0,
    isDragging = false;
  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - host.getBoundingClientRect().left;
    offsetY = e.clientY - host.getBoundingClientRect().top;
    header.style.cursor = "grabbing";
    wrapper.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;
    const maxX = window.innerWidth - host.offsetWidth;
    const maxY = window.innerHeight - host.offsetHeight;
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));
    host.style.left = `${x}px`;
    host.style.top = `${y}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    header.style.cursor = "grab";
    wrapper.style.userSelect = "";
  });

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "y") {
      if (document.getElementById("webhub-shadow-host")) {
        document.getElementById("webhub-shadow-host").remove();
      } else {
        document.body.appendChild(host);
        centerWindow();
      }
    }
  });
})();
