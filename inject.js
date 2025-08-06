(() => {
  let tabs,
    tabContent,
    isDeleteMode = false;

  const saveState = () => {
    try {
      localStorage.setItem("webhub_tabs_v1", JSON.stringify(tabs));
      localStorage.setItem("webhub_tabContent_v1", JSON.stringify(tabContent));
    } catch (e) {
      console.error("WebIn Error: Failed to save state.", e);
    }
  };

  const initializeDefaultState = () => {
    tabs = [
      "Coding Platforms",
      "OpenSource Tools",
      "AI Tools",
      "Social",
      "Entertainment",
    ];
    tabContent = {
      "Coding Platforms": [
        {
          name: "LeetCode",
          url: "https://leetcode.com",
          icon: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
        },
        {
          name: "Codeforces",
          url: "https://codeforces.com",
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAnFBMVEX///9PgcH/1ACuDwrt8fdLfsBpkMj//PX/1jqtAwD69fWzOzvK1un/8L//9dXy4uL/1im3QkHjwL+Trtb/0ADX4O+ft9r19/s2c7tBeb67zORaiMR2ms2mAAD/2ELqz8//++z/4nr37Oz/88v/+eL/6qT/3GL/5Yr/55b/21ffs7PHenm6U1OzLCqwHRvUmJe/X1/GbWzPi4raqKdO0TxAAAACN0lEQVR4nO3ca1OCQBTG8TW8rWWlkJqKKN5SSDS//3cLoXFq2suZ2alDzfN/jcNvzoKv2BUCIYQQQuiHqz/dKXuqc8uK6n6z1lBWa/oVIA5GuURTozEaMPOG/kinKxv5Q1ag/2z21WrPPqdvbJlfMcMxn2840T5+nx7ECd8ij60LXCwy3wjtT2ABZHsKh1PCCudrPOVa43qTBmxy/V0DCCCAAAIIIIAAAggggH8G2FrdK1tVBLjezB6VzTbrCgC7wY2+IOhyA7cGXtGCF7g1za/shRPYtfLylKv8O8DWjgJs8wGX9gXOU74ovwO0viFlGzZgmwacsQFpvpt2C0AAAQQQQAArCYwflMUVAe6TtKcsTfYVAEavodR3iLiBmZSeISkzXuA5NPpyYZhxAvuexXeZYcQITK2+XHjssAGj0O7zvDBiA54IA8xH+MYG7NGAPS5g55YE9DwAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBPB/Ah+JwO/3cDvGgAaUr2JBA+4U33A6COJIAybm3TjXAuXGIZejNPa0D3v6Yj4jTVB1D7fDSA6UT6N6sRBrygg1O69cjnM5E0YYni9Xbuw+zaYmtwNxEqtQnsorbcJAtZmkzOlIoZNFGH74ROvFuMrBVvEfeM3hUKZOdvlCVDM8KcOsc710tdC+KruFaXOicDvWKk7Sg+YD1vTt4cul82VX2XJuvkVBdDgYLI76yqLY/luEEEIIISHeAWxkhFCi17KTAAAAAElFTkSuQmCC",
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
          icon: "data:image/png;base64,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",
        },
        {
          name: "freeCodeCamp",
          url: "https://www.freecodecamp.org",
          icon: "data:image/png;base64,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",
        },
        {
          name: "W3Schools",
          url: "https://www.w3schools.com",
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8Eqm0ApmWn3cYApmQAqWqEz7AApWQ6uYcApGD6/v3z+/gAqmu65NP2/fsArG/s+PTF6Nng8+zS7eJxx6J7y6ib171pxZ5dwJba8OeQ07YRrXMrsn3Z8edNvI1Hu4vB49Kk28Sw38uV1brL6t0ztYBVwJRiw5pn62CtAAAH9UlEQVR4nO2d6XqyPBCGbUpqERSqb+2C1mq38z/Dz6UgSxKeSULod11z/y44WWfmmYROJgzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzD/GW2j3dmxjbQmXksjKRjG+jMPLoxko1toDPcQm7h36enhXIztoHOzGPZ5drAbDm2gc48bO477MoGptHn2PYNw2M5iPFhbFOG4a1cmvHr2KYMw7f4bWD0b2xThuG5bKDYjW3KMNzFlZ+YjW3LIByqBt7kY9syCKtyit6I1di2DEKeydIRzqEHlvtbjD32vskBfeHlrdQGznaVI1xjTyQiMqeXJVEMzYltDL7vQnxLbOFTOUenj+gjt+W67UO+Ia/7lv1vqpMtSA38KD29gKy58IXaFAPztC/R6SBIIsu82kYJDZw8oEbJov9lG+IQ3qSSkBm8pJUtP7eE555Rq6a9a/uWOoTHQXyCDU1q/Scjcf+BusMXkRosaNDzyhl1BE9gO9iJnWg8KIW4A2OaR6H58TaiZ/+6Q1/UMPQLbOCysyemoniAHk3QQUzli9EECU+GOsgOduatO0VkhHnFjylojHw2vebJZpKedjBwrj0oHFuKOf5ZAXsMg2TwSd9mLogPrIWXnbo9T7AkH3ZjJl1rZzeERzJwU9xnRVFkcioaywHzN7B1U22YNUeDoy59O1hFfmK52v+I2taB+Rt4hslCF2Zl1g08zjSqIJi/Ckl8Gnb7QiP9vNp4ihJSEPbbxvvKYizyy+FtQioXTe4yhMdhwPxanUUV4SDh5ITgrdXTHo4a1MBuv8aqGhQBTdME9xjb7tNbPPJTE1ETxUktUxPYDICjZqmQ8BThBg1ZJOQWVks/eof+fgZnPl2BRBVtENHtYAYO5ZhMsRbiDk1+tcMsclqoICZLg+QW4m6/He7ubeO1OuaYV8W60mzQFr7Acy1rLJoc3qSMmMpkyhyy8uECLrD9s0sUrdLCLqod7JeDyl9uy59N1S5aRQ5v+fVAKXf1FCVaiffoyRQbUSWhUcrcH+ho1BcNHPD1vlSXKP6Im3S6aQ7j4vuq7hO24QW8oq5OduXuKUo0UtfFF8l4d7hG/e+b62CQ4vYD7DGqRXPvawhPpQhV4lJ1u4yKf/Ntniw/11+11IK4CcOerdTjDz48RYlQlXTrIa/8rRnUrEyxqLTiEx7E7LxoFj6cfc3abszbp1j3q7gtiIni2ucQHvvtu2PQNjNaJMiBAqwPp+LohRKfI3gi6jq+vDDs8KITQfaD68NPtWKXL1S+bfYc6ToyerOo5CeoMalYdWVo3d9K6g7WYL6Zqp6XMVxEbLDG9WG4WigOBfiXN6lqVGbrIm7/loxBTb8L7PbhgTluIGt48mt0pYfvKBLHX0xPorCUItrYn/d69xel/HKKOtB+01cUk/fH3SaTUqbF5nut0FJwnDWJFudUBE6wjQrvLF++vCydz9F8et4h07NFcHgXBTgnY1lF0ll8iTrgEF3eD9/CPPKU8p0NLk+fwc4Trig64CltPzMt7YUrqKCI7cTC3xjW5hyuq6MVRQf8JUU1iRzvN7Si6MDMV2Lb2PthXR2uKDoAHyQy0/LfuK4e4IoB9YSamlYMBodLBmnRG3DeYDS0XXCB+82iokgG1ocNTNsHSFdogm1TUaSSu09ThWODwyWbiiIVWB/WophqCbwSLSqKVPCKos7Irq40mbzCHiPA/V5Ht6/SBgm6ehoFuGwAnx9WotR3KeV0slBIx60moSt6weESfvTUHpe6krYkhB/ACuH27Y6MntFfz4XdPnhpxAn7RNFwKhIOl0Jc3UpsT3MZZxisq08DJIq25yyM55TgU3CpGN7t4/pwA6WzvwKXrDQexyt255168js4XEqF8fC8H2z04d4cHT93bZ4MXoATnrpdvcsH14cDJIr0IiFQecb14b+YKEJuDNeHydcw6VDPcAskFMHDJWVF0S8z2kIE6w64PvznEsUY2+AXaFmYdEfRFoo+LH/Al8LhksTvKFrzgK9EQo/jp+gCJIq4PkxYNXC4FKKiuIR1Tu21IQVov4Uot8H6sKDInOg1jRCZ8CTB3Bfxs1RYv1lci7IBO0hELDfkSL+lgT7xASU85N5GwqUQOeIZIOGhZ3PABd0gyvCFfrdv0dv9564t7gvZ0p/w2JTf+27qwFe9ffDTY4xVb/cdwIpCfpCtz+1nVr1t1tVDhDM1zAnP1K63zfpw4I8GGi+aWve2SR8OUX9qsDcdKrftbdO5a/I9dmf0bt+ht/X6cIiTQy20CQ/16kodfbiUBRD12+j0Yafe1qkkIoDM1mGrXompoH20q4Xa7Y/0XUR1wgN+CUeHOlwKkhZ2ydW97fhW1UGiwM7+iirhce5tlT4MqpID0C1vekjCu+ES4TtnvukmPB7uD3TDJfyGtn/aiaIXxbZ9kChgWtildSDmfBPRnabbJ6mS/mkmPJ4qJ81waeTvdDd2Pm+9XdeHR/9Yfj3hIWnAJur6sOnDcEFYXI3xWIW+hkvB08Iu14TH45Hzqpwe5IxJH+XO51VxL89dj5AWdin14chrb/+GS2OkhV0uiaLn3r6ES+TPJAzD5XNpvq9gncKlINVChFPC4/0a3UkfDnFdBiKP0gEU9x8ZqFqIcCcsNWATy+gP/UOAJBviyNkjelglBJ9Ot/415P//f27EMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMEH5D0LMbTWDbTsyAAAAAElFTkSuQmCC",
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
          icon: "data:image/png;base64,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",
        },
        {
          name: "Perplexity",
          url: "https://www.perplexity.ai",
          icon: "data:image/png;base64,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",
        },
        {
          name: "Claude",
          url: "https://claude.ai/new",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Claude_AI_symbol.svg/1200px-Claude_AI_symbol.svg.png?20250427183551",
        },
        {
          name: "Gemini",
          url: "https://gemini.google.com",
          icon: "data:image/png;base64,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",
        },
        {
          name: "Grok",
          url: "https://www.grok.com",
          icon: "data:image/png;base64,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",
        },
      ],
    };
  };

  const loadState = () => {
    const savedTabs = localStorage.getItem("webhub_tabs_v1");
    const savedTabContent = localStorage.getItem("webhub_tabContent_v1");
    if (savedTabs && savedTabContent) {
      try {
        tabs = JSON.parse(savedTabs);
        tabContent = JSON.parse(savedTabContent);
        if (!Array.isArray(tabs) || typeof tabContent !== "object") {
          throw new Error("Corrupt data");
        }
      } catch (e) {
        console.error("WebIn Error: Failed to load state.", e);
        initializeDefaultState();
      }
    } else {
      initializeDefaultState();
    }
  };

  loadState();

  if (document.getElementById("webhub-shadow-host")) {
    const existingHost = document.getElementById("webhub-shadow-host");
    const existingBackdrop = document.querySelector(".webhub-backdrop");
    if (existingHost) existingHost.remove();
    if (existingBackdrop) existingBackdrop.remove();
    return;
  }

  isDeleteMode = false;
  const host = document.createElement("div");
  host.id = "webhub-shadow-host";
  host.style.cssText =
    "position:fixed; z-index:999999; opacity:0; transform:scale(0.95); transition:opacity 0.5s cubic-bezier(0.25,0.1,0.25,1), transform 0.5s cubic-bezier(0.25,0.1,0.25,1);";

  const backdrop = document.createElement("div");
  backdrop.className = "webhub-backdrop";
  backdrop.style.cssText =
    "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.3); backdrop-filter:blur(5px); z-index:999998; opacity:0; transition:opacity 0.5s cubic-bezier(0.25,0.1,0.25,1);";
  document.body.appendChild(backdrop);

  const shadow = host.attachShadow({
    mode: "open",
  });

  const style = document.createElement("style");
  style.textContent = `
* {
  box-sizing: border-box !important;
  margin: 0 !important;
  padding: 0 !important;
  font-family: 'Inter', 'Segoe UI', Roboto, -apple-system, sans-serif !important;
}
.modal-input,
.modal-select {
  width: 100% !important;
  padding: 12px !important;
  border: 1px solid #ccc !important;
  border-radius: 10px !important;
  font-size: 14px !important;
  background: #fff !important;
  color: #333 !important;
}
.modal-input:focus,
.modal-select:focus {
  outline: none !important;
  border-color: #888 !important;
  box-shadow: 0 0 0 3px rgba(100, 100, 100, 0.15) !important;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes modal-scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.wrapper {
 width: 90vw;
 max-width: 800px;
 height: 65vh;
 min-height: 500px;
 background: rgba(247, 248, 250, 0.95) !important;
 color: #000 !important;
 border-radius: 16px !important;
 box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2) !important;
 display: flex !important;
 flex-direction: column !important;
 overflow: hidden !important;
 border: 1px solid rgba(0, 0, 0, 0.1) !important;
 backdrop-filter: blur(15px) !important;
}
.header {
  background: rgba(230, 232, 235, 0.9) !important;
  padding: 14px 20px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  cursor: grab !important;
  user-select: none !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}
.header-logo {
  width: 24px !important;
  height: 24px !important;
}
.header-title {
  font-weight: 600 !important;
  font-size: 16px !important;
  color: #333 !important;
}
.close {
  background: rgba(0, 0, 0, 0.08) !important;
  border: none !important;
  font-size: 24px !important;
  cursor: pointer !important;
  color: #333 !important;
  width: 28px !important;
  height: 28px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 50% !important;
  transition: all 0.2s ease !important;
  line-height: 1 !important;
  padding-bottom: 2px !important;
}
.close svg {
  width: 16px !important;
  height: 16px !important;
  fill: #333 !important;
}
.close:hover {
  background: rgba(0, 0, 0, 0.15) !important;
  transform: rotate(90deg) !important;
}
.nav {
  display: flex !important;
  padding: 12px !important;
  background: rgba(255, 255, 255, 0.8) !important;
  align-items: center !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}
.nav-tabs {
  display: flex !important;
  gap: 8px !important;
  flex-grow: 1 !important;
  overflow-x: auto !important;
  flex-wrap: nowrap !important;
  padding-bottom: 10px !important;
  margin-bottom: -10px !important;
}
.nav-tabs::-webkit-scrollbar {
  height: 6px !important;
}
.nav-tabs::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05) !important;
}
.nav-tabs::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2) !important;
  border-radius: 3px !important;
}
.nav button {
  line-height: 1.5 !important;
  padding: 8px 16px !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  border: 1px solid #dcdcdc !important;
  border-radius: 10px !important;
  cursor: pointer !important;
  background: #fff !important;
  color: #555 !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
  transition: all 0.2s ease !important;
  flex-shrink: 0 !important;
}
.nav button.active {
  background: #e0e0e0 !important;
  color: #333 !important;
  border-color: #c0c0c0 !important;
}
.nav.delete-mode .nav-tabs button {
  background: #ffebee !important;
  color: #b71c1c !important;
  border-color: #ef9a9a !important;
  cursor: crosshair !important;
}
.search-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px !important;
  background: #f0f2f5 !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}
.search-input {
  flex-grow: 1;
  width: 100% !important;
  padding: 10px 15px !important;
  border-radius: 10px !important;
  border: 1px solid #ccc !important;
  font-size: 14px !important;
  outline: none !important;
  transition: all 0.2s ease !important;
  background-color: #fff !important;
  color: #333 !important;
}
.search-input::placeholder {
  color: #999 !important;
  opacity: 1 !important;
}
.action-btn {
  background: #f0f0f0 !important;
  border: 1px solid #dcdcdc !important;
  padding: 8px !important;
  width: 36px !important;
  height: 38px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 10px !important;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s ease;
}
.action-btn svg {
  width: 18px !important;
  height: 18px !important;
  fill: #333 !important;
  transition: all 0.2s ease;
}
.action-btn:hover {
  background: #e0e0e0 !important;
}
.delete-mode-btn.active {
  background: #f8b3b0 !important;
  border-color: #e57373 !important;
}
.delete-mode-btn.active svg {
  fill: #c0392b !important;
  transform: scale(1.1);
}
.content {
  position: relative !important;
  flex: 1 !important;
  overflow-y: auto !important;
  padding: 20px !important;
  background: #fff !important;
}
.card {
  position: relative !important;
  background: #f9f9f9 !important;
  border: 1px solid #eee !important;
  border-radius: 12px !important;
  padding: 16px 8px !important;
  text-align: center !important;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03) !important;
  transition: all 0.3s ease !important;
  cursor: pointer !important;
  height: 120px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  animation: fadeIn 0.4s ease forwards;
  opacity: 0;
}
.card:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.07) !important;
  border-color: #ddd !important;
}
.card img {
  width: 40px !important;
  height: 40px !important;
  margin-bottom: 10px !important;
  object-fit: contain !important;
}
.card p {
  line-height: 1.5 !important;
  font-size: 13px !important;
  color: #333 !important;
  font-weight: 500 !important;
}
.content.grid-view {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)) !important;
  gap: 16px !important;
}
.category-header {
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #555 !important;
  padding-bottom: 5px !important;
  margin-top: 10px !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}
.category-header:first-of-type {
  margin-top: 0 !important;
}
.category-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)) !important;
  gap: 16px !important;
  padding-top: 16px !important;
}
.footer {
  padding: 12px !important;
  text-align: center !important;
  font-size: 12px !important;
  color: #888 !important;
  background: #f0f2f5 !important;
  border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
}
.empty-state {
  padding: 40px !important;
  text-align: center !important;
  color: #666 !important;
  grid-column: 1 / -1;
}
.empty-state p {
  font-size: 15px !important;
  line-height: 1.5 !important;
}
.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: modal-scale-in 0.3s ease forwards;
  opacity: 0;
}
.modal {
  background: #fdfdfd !important;
  padding: 24px !important;
  border-radius: 12px !important;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15) !important;
  border: 1px solid #eee !important;
  width: 90% !important;
  max-width: 420px !important;
  text-align: left !important;
  transform: scale(0.95);
  animation: modal-scale-in 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}
.modal-title {
  font-size: 20px !important;
  font-weight: 600 !important;
  margin-bottom: 8px !important;
  color: #333 !important;
  line-height: 1.5 !important;
}
.modal-message {
  font-size: 15px !important;
  color: #666 !important;
  margin-bottom: 20px !important;
  line-height: 1.5 !important;
}
.modal-footer {
  display: flex !important;
  justify-content: flex-end !important;
  gap: 10px !important;
  margin-top: 24px !important;
}
.modal-button {
  padding: 10px 20px !important;
  border-radius: 8px !important;
  border: none !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.2s ease;
  line-height: 1.5 !important;
}
.modal-button.primary {
  background: #2c3e50 !important;
  color: #fff !important;
}
.modal-button.primary:hover {
  background: #34495e !important;
}
.modal-button.secondary {
  background: #ecf0f1 !important;
  color: #34495e !important;
}
.modal-button.secondary:hover {
  background: #e0e6e8 !important;
}
.card-menu-btn {
  position: absolute !important;
  top: 6px !important;
  right: 6px !important;
  background: rgba(0, 0, 0, 0.08) !important;
  border: none !important;
  border-radius: 50% !important;
  width: 26px !important;
  height: 26px !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  opacity: 0 !important;
  transition: opacity 0.2s ease, background 0.2s ease !important;
  z-index: 5 !important;
}
.card:hover .card-menu-btn {
  opacity: 1 !important;
}
.card-menu-btn:hover {
  background: rgba(0, 0, 0, 0.15) !important;
}
.card-menu-btn svg {
  width: 16px !important;
  height: 16px !important;
  fill: #333 !important;
}
.modal-form-group {
  margin-bottom: 16px !important;
}
.modal-form-group label {
  display: block !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  color: #555 !important;
  margin-bottom: 6px !important;
}
.modal-footer {
  justify-content: space-between !important;
  align-items: center !important;
}
.modal-button.danger {
  background: #f1f1f1 !important;
  color: #c0392b !important;
  margin-right: auto;
}
.modal-button.danger:hover {
  background: #e74c3c !important;
  color: #fff !important;
}
.action-btn {
  position: relative !important;
}
.action-btn::before {
  content: attr(data-tooltip) !important;
  position: absolute !important;
  bottom: 125% !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  background-color: #2c3e50 !important;
  color: #fff !important;
  padding: 6px 10px !important;
  border-radius: 6px !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  white-space: nowrap !important;
  opacity: 0 !important;
  visibility: hidden !important;
  transition: opacity 0.2s ease, visibility 0.2s ease !important;
  pointer-events: none !important;
  z-index: 10 !important;
}
.action-btn::after {
  content: '' !important;
  position: absolute !important;
  bottom: 125% !important;
  left: 50% !important;
  transform: translate(-50%, 10px) !important;
  border: 6px solid transparent !important;
  border-top-color: #2c3e50 !important;
  opacity: 0 !important;
  visibility: hidden !important;
  transition: opacity 0.2s ease, visibility 0.2s ease !important;
  pointer-events: none !important;
  z-index: 10 !important;
}
.action-btn:hover::before,
.action-btn:hover::after {
  opacity: 1 !important;
  visibility: visible !important;
}
.add-card {
  border: 2px dashed #b0bec5 !important;
  background: #eceff1 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}
.add-card:hover {
  background: #cfd8dc !important;
  border-color: #90a4ae !important;
  transform: translateY(-5px) !important;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.07) !important;
}
.add-card svg {
  width: 48px !important;
  height: 48px !important;
  fill: #546e7a !important;
  transition: transform 0.2s ease !important;
}
.add-card:hover svg {
  transform: scale(1.1) !important;
}
  .resizer {
  position: absolute !important;
  background: transparent !important;
  z-index: 10 !important;
}
.resizer.se {
  width: 16px !important;
  height: 16px !important;
  bottom: 0 !important;
  right: 0 !important;
  cursor: se-resize !important;
  /* Yeh lines handle ko thoda visible banayengi */
  border-right: 2px solid rgba(0,0,0,0.2) !important;
  border-bottom: 2px solid rgba(0,0,0,0.2) !important;
}
   `;
  shadow.appendChild(style);

  const ICONS = {
    add: `<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
    delete: `<svg viewBox="0 0 24 24"><path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z"/></svg>`,
    reset: `<svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>`,
    more: `<svg viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`,
  };

  const showModal = (config) => {
    const {
      type,
      title,
      message,
      placeholder = "",
      primaryActionText = "Confirm",
      onConfirm,
      onCancel,
    } = config;
    const existingModal = shadow.querySelector(".modal-backdrop");
    if (existingModal) existingModal.remove();
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `<p class="modal-title">${title}</p><p class="modal-message">${message}</p>${
      type === "prompt"
        ? `<input type="text" class="modal-input" placeholder="${placeholder}">`
        : ""
    }<div class="modal-footer"></div>`;
    const footer = modal.querySelector(".modal-footer");
    const closeModal = () => backdrop.remove();

    if (type === "prompt" || type === "confirm") {
      const confirmBtn = document.createElement("button");
      confirmBtn.textContent = primaryActionText;
      confirmBtn.className = "modal-button primary";
      confirmBtn.onclick = () => {
        if (onConfirm) {
          const val =
            type === "prompt"
              ? modal.querySelector(".modal-input").value
              : true;
          onConfirm(val);
        }
        closeModal();
      };
      footer.appendChild(confirmBtn);

      if (type === "prompt") {
        const inputField = modal.querySelector(".modal-input");
        setTimeout(() => inputField.focus(), 50);
        inputField.onkeydown = (e) => {
          if (e.key === "Enter") confirmBtn.click();
        };
      }
    }

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = type === "alert" ? "OK" : "Cancel";
    cancelBtn.className = "modal-button secondary";
    cancelBtn.onclick = () => {
      if (onCancel) onCancel();
      if (onConfirm && type === "confirm") onConfirm(false);
      closeModal();
    };
    footer.appendChild(cancelBtn);

    backdrop.onclick = (e) => {
      if (e.target === backdrop) cancelBtn.click();
    };
    backdrop.appendChild(modal);
    shadow.appendChild(backdrop);
  };

  const showAddAppModal = (categoryName) => {
    const existingModal = shadow.querySelector(".modal-backdrop");
    if (existingModal) existingModal.remove();

    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    const modal = document.createElement("div");
    modal.className = "modal";

    modal.innerHTML = `
        <p class="modal-title">Add App to "${categoryName}"</p>
        <div class="modal-form-group">
            <label for="add-name-input">App Name</label>
            <input type="text" id="add-name-input" class="modal-input" placeholder="e.g., Google">
        </div>
        <div class="modal-form-group">
            <label for="add-url-input">App URL</label>
            <input type="url" id="add-url-input" class="modal-input" placeholder="https://google.com">
        </div>
        <div class="modal-footer"></div>
    `;

    const nameInput = modal.querySelector("#add-name-input");
    const urlInput = modal.querySelector("#add-url-input");
    const footer = modal.querySelector(".modal-footer");
    const closeModal = () => backdrop.remove();

    const rightSideButtons = document.createElement("div");
    rightSideButtons.style.cssText =
      "display: flex; gap: 10px; margin-left: auto;";

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add App";
    addBtn.className = "modal-button primary";
    addBtn.onclick = () => {
      const name = nameInput.value.trim();
      let url = urlInput.value.trim();

      if (!name || !url) {
        showModal({
          type: "alert",
          title: "Error",
          message: "Please fill out all fields.",
        });
        return;
      }
      if (!/^https?:\/\//i.test(url)) url = "https://" + url;

      const icon = `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`;
      const newApp = {
        name,
        url,
        icon,
      };
      tabContent[categoryName].push(newApp);
      saveState();
      setActiveTab(categoryName);
      closeModal();
    };

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "modal-button secondary";
    cancelBtn.onclick = closeModal;

    rightSideButtons.appendChild(cancelBtn);
    rightSideButtons.appendChild(addBtn);
    footer.appendChild(rightSideButtons);

    backdrop.appendChild(modal);
    shadow.appendChild(backdrop);
    setTimeout(() => nameInput.focus(), 50);
  };

  const showEditAppModal = (item, categoryName) => {
    const existingModal = shadow.querySelector(".modal-backdrop");
    if (existingModal) existingModal.remove();
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `<p class="modal-title">Edit App</p><div class="modal-form-group"><label for="edit-name-input">Name</label><input type="text" id="edit-name-input" class="modal-input" value="${item.name}"></div><div class="modal-form-group"><label for="edit-url-input">URL</label><input type="text" id="edit-url-input" class="modal-input" value="${item.url}"></div><div class="modal-footer"></div>`;
    const nameInput = modal.querySelector("#edit-name-input");
    const urlInput = modal.querySelector("#edit-url-input");
    const footer = modal.querySelector(".modal-footer");
    const closeModal = () => backdrop.remove();
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete App";
    deleteBtn.className = "modal-button danger";
    deleteBtn.onclick = () => {
      showModal({
        type: "confirm",
        title: "Delete App?",
        message: `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
        primaryActionText: "Yes, Delete",
        onConfirm: (confirmed) => {
          if (confirmed) {
            const categoryItems = tabContent[categoryName];
            const itemIndex = categoryItems.findIndex(
              (i) => i.name === item.name && i.url === item.url
            );
            if (itemIndex > -1) {
              categoryItems.splice(itemIndex, 1);
              saveState();
              searchInput.value
                ? renderSearchResults(searchInput.value)
                : renderContent();
            }
            closeModal();
          }
        },
      });
    };
    const actionButtons = document.createElement("div");
    actionButtons.style.cssText = "display: flex; gap: 10px;";
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className = "modal-button primary";
    saveBtn.onclick = () => {
      const newName = nameInput.value.trim();
      const newUrl = urlInput.value.trim();
      if (!newName || !newUrl) return;
      const categoryItems = tabContent[categoryName];
      const itemToUpdate = categoryItems.find(
        (i) => i.name === item.name && i.url === item.url
      );
      if (itemToUpdate) {
        itemToUpdate.name = newName;
        itemToUpdate.url = newUrl;
        saveState();
        searchInput.value
          ? renderSearchResults(searchInput.value)
          : renderContent();
      }
      closeModal();
    };
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "modal-button secondary";
    cancelBtn.onclick = closeModal;
    footer.appendChild(deleteBtn);
    actionButtons.appendChild(cancelBtn);
    actionButtons.appendChild(saveBtn);
    footer.appendChild(actionButtons);
    backdrop.appendChild(modal);
    shadow.appendChild(backdrop);
    setTimeout(() => nameInput.focus(), 50);
  };

  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";

  const header = document.createElement("div");
  header.className = "header";
  const titleContainer = document.createElement("div");
  titleContainer.style.cssText = "display:flex; align-items:center; gap:10px;";
  titleContainer.innerHTML = `<img src="https://img.icons8.com/?size=200&id=nDNCmmDBtU8l&format=png" class="header-logo"><span class="header-title">WebIn</span>`;
  const headerActions = document.createElement("div");
  headerActions.style.cssText = "display: flex; align-items: center; gap: 8px;";
  const resetBtn = document.createElement("button");
  resetBtn.className = "close";
  resetBtn.innerHTML = ICONS.reset;
  resetBtn.title = "Reset Extension";
  resetBtn.onclick = () => {
    showModal({
      type: "confirm",
      title: "Reset Extension?",
      message:
        "Are you sure? All your custom categories and links will be permanently deleted.",
      primaryActionText: "Yes, Reset",
      onConfirm: (confirmed) => {
        if (confirmed) {
          initializeDefaultState();
          saveState();
          searchInput.value = "";
          navTabsContainer.innerHTML = "";
          tabs.forEach((tab) =>
            navTabsContainer.appendChild(createTabButton(tab))
          );
          setActiveTab(tabs.length > 0 ? tabs[0] : null);
          showModal({
            type: "alert",
            title: "Reset Complete",
            message: "The extension has been successfully reset.",
          });
        }
      },
    });
  };

  const closeBtn = document.createElement("button");
  closeBtn.className = "close";
  closeBtn.innerHTML = "×";
  closeBtn.onclick = () => {
    host.style.opacity = "0";
    host.style.transform = "scale(0.95)";
    backdrop.style.opacity = "0";
    setTimeout(() => {
      host.remove();
      backdrop.remove();
    }, 500);
  };
  headerActions.appendChild(resetBtn);
  headerActions.appendChild(closeBtn);
  header.appendChild(titleContainer);
  header.appendChild(headerActions);
  wrapper.appendChild(header);

  const searchContainer = document.createElement("div");
  searchContainer.className = "search-container";
  const searchInput = document.createElement("input");
  searchInput.className = "search-input";
  searchInput.placeholder = "Search all apps...";
  searchContainer.appendChild(searchInput);

  const addCategoryBtn = document.createElement("button");
  addCategoryBtn.innerHTML = ICONS.add;
  addCategoryBtn.setAttribute("data-tooltip", "Add new category");
  addCategoryBtn.className = "action-btn";

  const deleteModeBtn = document.createElement("button");
  deleteModeBtn.innerHTML = ICONS.delete;
  deleteModeBtn.setAttribute("data-tooltip", "delete");
  deleteModeBtn.className = "action-btn delete-mode-btn";

  searchContainer.appendChild(addCategoryBtn);
  searchContainer.appendChild(deleteModeBtn);
  wrapper.appendChild(searchContainer);

  const nav = document.createElement("div");
  nav.className = "nav";
  const navTabsContainer = document.createElement("div");
  navTabsContainer.className = "nav-tabs";
  nav.appendChild(navTabsContainer);

  let currentTab = tabs.length > 0 ? tabs[0] : null;
  const content = document.createElement("div");

  const createCard = (item, categoryName, index = 0) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.animationDelay = `${index * 0.04}s`;
    card.onclick = () => window.open(item.url, "_blank");
    card.innerHTML = `<img src="${item.icon}" alt="${item.name}"><p>${item.name}</p>`;
    const menuBtn = document.createElement("button");
    menuBtn.className = "card-menu-btn";
    menuBtn.innerHTML = ICONS.more;
    menuBtn.title = "Edit app";
    menuBtn.onclick = (e) => {
      e.stopPropagation();
      showEditAppModal(item, categoryName);
    };
    card.appendChild(menuBtn);
    return card;
  };

  const renderContent = (filter = "") => {
    content.innerHTML = "";
    content.className = "content";
    const isSearching = filter !== "";

    if (!currentTab) {
      content.innerHTML = `<div class="empty-state"><p>No categories available. Add one!</p></div>`;
      return;
    }

    const items = tabContent[currentTab] || [];
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (isSearching && filteredItems.length === 0) {
      content.innerHTML = `<div class="empty-state"><p>No results found for "${filter}"</p></div>`;
      return;
    }

    content.classList.add("grid-view");

    filteredItems.forEach((item, index) => {
      content.appendChild(createCard(item, currentTab, index));
    });

    if (!isSearching) {
      if (filteredItems.length === 0) {
        content.innerHTML += `<div class="empty-state"><p>This category is empty. Click the '+' card to add an app!</p></div>`;
      }
      const addCard = document.createElement("div");
      addCard.className = "card add-card";
      addCard.innerHTML = `<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`;
      addCard.title = `Add new app to ${currentTab}`;
      addCard.onclick = () => showAddAppModal(currentTab);
      content.appendChild(addCard);
    }
  };

  const renderSearchResults = (query) => {
    content.innerHTML = "";
    content.className = "content";
    let totalResults = 0;
    Object.entries(tabContent).forEach(([category, items]) => {
      const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      if (filteredItems.length > 0) {
        totalResults++;
        const headerEl = document.createElement("h3");
        headerEl.className = "category-header";
        headerEl.textContent = category;
        content.appendChild(headerEl);
        const grid = document.createElement("div");
        grid.className = "category-grid";
        filteredItems.forEach((item, index) =>
          grid.appendChild(createCard(item, category, index))
        );
        content.appendChild(grid);
      }
    });
    if (totalResults === 0) {
      content.innerHTML = `<div class="empty-state"><p>No results found for "${query}"</p></div>`;
    }
  };

  const setActiveTab = (tabName) => {
    if (isDeleteMode) return;
    if (!tabName) {
      currentTab = null;
      navTabsContainer
        .querySelectorAll("button")
        .forEach((btn) => btn.classList.remove("active"));
      renderContent();
      return;
    }
    currentTab = tabName;
    navTabsContainer.querySelectorAll("button").forEach((btn) => {
      btn.classList.toggle("active", btn.textContent === tabName);
    });
    renderContent();
  };

  const createTabButton = (tabName) => {
    const button = document.createElement("button");
    button.textContent = tabName;
    button.onclick = () => {
      if (isDeleteMode) {
        showModal({
          type: "confirm",
          title: "Delete Category",
          message: `Are you sure you want to delete "${tabName}"? All links inside will be lost.`,
          primaryActionText: "Yes, Delete",
          onConfirm: (confirmed) => {
            if (confirmed) {
              delete tabContent[tabName];
              tabs.splice(tabs.indexOf(tabName), 1);
              saveState();
              button.remove();
              isDeleteMode = false;
              nav.classList.remove("delete-mode");
              deleteModeBtn.classList.remove("active");
              if (currentTab === tabName)
                setActiveTab(tabs.length > 0 ? tabs[0] : null);
            }
          },
        });
      } else {
        if (currentTab === tabName && searchInput.value === "") return;
        searchInput.value = "";
        setActiveTab(tabName);
      }
    };
    return button;
  };

  tabs.forEach((tab) => navTabsContainer.appendChild(createTabButton(tab)));

  addCategoryBtn.onclick = () => {
    if (isDeleteMode) return;
    showModal({
      type: "prompt",
      title: "Add New Category",
      message: "Enter a name for the new category.",
      placeholder: "e.g., Study Material",
      primaryActionText: "Add",
      onConfirm: (newCategoryName) => {
        if (newCategoryName && newCategoryName.trim() !== "") {
          const trimmedName = newCategoryName.trim();
          if (tabContent.hasOwnProperty(trimmedName)) {
            showModal({
              type: "alert",
              title: "Error",
              message: "A category with this name already exists.",
            });
            return;
          }
          tabContent[trimmedName] = [];
          tabs.push(trimmedName);
          saveState();
          const newButton = createTabButton(trimmedName);
          navTabsContainer.appendChild(newButton);
          setActiveTab(trimmedName);
          newButton.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "end",
          });
        }
      },
    });
  };

  deleteModeBtn.onclick = () => {
    isDeleteMode = !isDeleteMode;
    nav.classList.toggle("delete-mode", isDeleteMode);
    deleteModeBtn.classList.toggle("active", isDeleteMode);
  };

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      navTabsContainer
        .querySelectorAll("button")
        .forEach((btn) => btn.classList.remove("active"));
      renderSearchResults(query);
    } else {
      setActiveTab(currentTab);
    }
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const firstResult = shadow.querySelector(".content .card:not(.add-card)");
      if (firstResult) firstResult.click();
    }
  });

  wrapper.appendChild(nav);
  wrapper.appendChild(content);
  wrapper.appendChild(document.createElement("div")).className = "footer";
  wrapper.querySelector(".footer").textContent =
    "Powered by caffeine and creativity — Avdesh Jadon ☕";
  shadow.appendChild(wrapper);
  document.body.appendChild(host);
  const resizerSE = document.createElement("div");
  resizerSE.className = "resizer se";
  resizerSE.dataset.direction = "se";
  wrapper.appendChild(resizerSE);

  const positionHost = () => {
    host.style.top = `calc(50% - ${wrapper.offsetHeight / 2}px)`;
    host.style.left = `calc(50% - ${wrapper.offsetWidth / 2}px)`;
  };
  positionHost();
  setActiveTab(currentTab);

  setTimeout(() => {
    host.style.opacity = "1";
    host.style.transform = "scale(1)";
    backdrop.style.opacity = "1";
    searchInput.focus();
  }, 100);

  let isDragging = false,
    isResizing = false,
    offsetX,
    offsetY,
    initialWidth,
    initialHeight,
    initialX,
    initialY,
    currentResizerDirection = null;
  header.addEventListener("mousedown", (e) => {
    if (e.target.closest("button")) return;
    isDragging = true;
    offsetX = e.clientX - host.offsetLeft;
    offsetY = e.clientY - host.offsetTop;
    header.style.cursor = "grabbing";
    e.preventDefault();
  });
  resizerSE.addEventListener("mousedown", (e) => {
    isResizing = true;
    currentResizerDirection = resizerSE.dataset.direction;
    initialWidth = wrapper.offsetWidth;
    initialHeight = wrapper.offsetHeight;
    initialX = e.clientX;
    initialY = e.clientY;
    e.preventDefault();
    e.stopPropagation();
  });
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      host.style.left = `${e.clientX - offsetX}px`;
      host.style.top = `${e.clientY - offsetY}px`;
    } else if (isResizing) {
      const dx = e.clientX - initialX;
      const dy = e.clientY - initialY;

      if (currentResizerDirection.includes("e")) {
        wrapper.style.width = `${initialWidth + dx}px`;
      }
      if (currentResizerDirection.includes("s")) {
        wrapper.style.height = `${initialHeight + dy}px`;
      }
    }
  });
  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      header.style.cursor = "grab";
    }
    if (isResizing) {
      isResizing = false;
      currentResizerDirection = null;
    }
  });
  window.addEventListener("resize", positionHost);
})();
