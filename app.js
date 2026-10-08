const content = {
  meanings: [
    { name: "花卉", hint: "绽放", detail: "花卉纹样常被用于表达对美好生活的向往。" },
    { name: "蝴蝶", hint: "灵动", detail: "蝶形纹样以轻盈、变化的姿态，为画面带来灵动的生命感。" },
    { name: "云纹", hint: "相连", detail: "连绵的云纹让画面拥有流动感，也呼应人与山川相依的想象。" },
    { name: "几何纹", hint: "秩序", detail: "连续的几何边饰以重复与节奏，构成服饰上的秩序之美。" }
  ],
  creations: [
    { src: "文创.jpg", label: "绣饰挂件" },
    { src: "文创 (2).jpg", label: "日常器物" },
    { src: "文创 (3).jpg", label: "花纹别饰" },
    { src: "文创 (4).jpg", label: "纹样新用" },
    { src: "文创 (5).jpg", label: "生活礼物" }
  ],
  wishes: ["愿美好绽放", "愿山河相连", "愿匠心长存"],
  palettes: [
    { name: "朱砂与金", a: "#9b243d", b: "#d4a749" },
    { name: "靛蓝与青绿", a: "#19355d", b: "#2b877b" },
    { name: "绛红与米白", a: "#a23847", b: "#eadbc8" }
  ],
  review: {
    problem: { label: "问题", title: "好技艺，如何持续被需要？", body: "宁强羌绣面临的不只是“被遗忘”，还有记录不足、青年接触有限、产品与当代生活脱节、价值回流路径不清晰等现实问题。", proof: "从真实的传承现场出发，寻找更有生命力的表达。" },
    method: { label: "方法", title: "以共创，而不是替代的方式参与", body: "以传承人为知识主体，连接田野采集、青年体验、文创打样和数字传播，使保护、使用与传播形成协作。", proof: "让技艺、设计与体验在一次次相遇中形成连接。" },
    evidence: { label: "成果", title: "每一项成果，都应能回到真实的人", body: "成果不以空泛口号呈现，而以参与、共创、作品与传播等真实行动，回应一针一线背后的劳动和创造。", proof: "每一次被看见、被使用，都是新的延续。" },
    future: { label: "未来", title: "让一次体验，成为可持续的连接", body: "持续建立纹样档案、共创产品机制、青年志愿网络与线上展示窗口，让乡村技艺拥有更长久的市场与表达空间。", proof: "后续方向：档案化、体验常态化、产品化与品牌化" }
  },
  videos: {
    short: { src: "羌绣短介绍.mp4", caption: "15 秒，看见羌绣的一针一线。" },
    craft: { src: "羌绣视频.mp4", caption: "工艺片段：针线往复，图案由此生长。" },
    long: { src: "羌绣介绍.mp4", caption: "完整纪录片。建议在 Wi-Fi 环境播放。" }
  }
};

const state = { wish: 0, palette: 0, explored: new Set() };
const $ = (selector) => document.querySelector(selector);

function renderMeaningButtons() {
  const grid = $("#meaning-grid");
  content.meanings.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = "meaning-button";
    button.type = "button";
    button.setAttribute("aria-pressed", "false");
    button.disabled = true;
    button.innerHTML = `<b>${item.name}</b><small>${item.hint}</small>`;
    button.addEventListener("click", () => {
      grid.querySelectorAll("button").forEach((other) => other.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      $("#meaning-detail").textContent = item.detail;
      markExplored("patterns");
    });
    grid.append(button);
  });
}

function setupStitching() {
  const playground = $("#stitch-playground");
  const canvas = $("#stitch-canvas");
  const count = $("#stitch-count");
  const stage = $("#stitch-stage");
  const action = $("#stitch-action");
  const context = canvas.getContext("2d");
  let layer = 0;
  const stages = ["第一层 · 绣上花心", "第二层 · 绣开花瓣", "第三层 · 添上叶片", "第四层 · 勾勒金线"];

  function resizeCanvas() {
    const size = Math.round(playground.getBoundingClientRect().width);
    const ratio = window.devicePixelRatio || 1;
    canvas.width = size * ratio;
    canvas.height = size * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawGuide(size);
  }

  function drawGuide(size) {
    context.clearRect(0, 0, size, size);
    context.save();
    context.translate(size / 2, size / 2);
    drawThreadFlower(size, layer);
    context.restore();
  }

  function petal(radiusX, radiusY, fill, stroke) {
    context.beginPath();
    context.ellipse(0, -radiusY * .75, radiusX, radiusY, 0, 0, Math.PI * 2);
    context.fillStyle = fill; context.fill();
    context.lineWidth = 2; context.strokeStyle = stroke; context.stroke();
    context.beginPath(); context.moveTo(0, -radiusY * 1.55); context.lineTo(0, -radiusY * .1); context.strokeStyle = "rgba(255,239,196,.7)"; context.lineWidth = 1; context.stroke();
  }

  function drawThreadFlower(size, completedLayers) {
    const r = size / 2;
    context.lineCap = "round";
    context.strokeStyle = "rgba(115, 48, 46, .42)";
    context.lineWidth = 1.2;
    context.setLineDash([4, 5]);
    for (let i = 0; i < 8; i += 1) { context.rotate(Math.PI / 4); context.beginPath(); context.ellipse(0, -r * .28, r * .12, r * .25, 0, 0, Math.PI * 2); context.stroke(); }
    context.setLineDash([]);
    if (completedLayers >= 1) { context.fillStyle = "#d49d2c"; context.beginPath(); context.arc(0, 0, r * .15, 0, Math.PI * 2); context.fill(); context.fillStyle = "#f9da75"; context.beginPath(); context.arc(-r*.035, -r*.04, r*.045, 0, Math.PI*2); context.fill(); }
    if (completedLayers >= 2) { for (let i = 0; i < 8; i += 1) { context.rotate(Math.PI / 4); petal(r * .13, r * .3, "#b9344e", "#7d1931"); } }
    if (completedLayers >= 3) { for (let i = 0; i < 8; i += 1) { context.rotate(Math.PI / 4); context.beginPath(); context.ellipse(r*.23, -r*.25, r*.07, r*.18, .7, 0, Math.PI*2); context.fillStyle="#317d63"; context.fill(); context.strokeStyle="#155345"; context.stroke(); } }
    if (completedLayers >= 4) { context.strokeStyle = "#efc861"; context.lineWidth = 5; context.beginPath(); context.arc(0, 0, r * .42, 0, Math.PI * 2); context.stroke(); for (let i = 0; i < 8; i += 1) { context.rotate(Math.PI/4); context.beginPath(); context.moveTo(0, -r*.43); context.lineTo(0, -r*.54); context.stroke(); } }
  }

  function completeStitching() {
    playground.classList.add("is-complete");
    $("#stitch-overlay").innerHTML = "<span>你已绣成一朵花</span><strong>纹样，在你手中亮起来</strong><small>下方纹样卡已解锁</small>";
    $("#meaning-detail").textContent = "一朵花由四层针线完成。现在点选下方纹样，继续阅读它们承载的祝愿。";
    document.querySelectorAll(".meaning-button").forEach((button) => { button.disabled = false; });
    markExplored("patterns");
  }

  action.addEventListener("click", () => {
    if (layer >= 4) return;
    layer += 1;
    playground.classList.add("is-stitching");
    drawGuide(Math.round(playground.getBoundingClientRect().width));
    count.textContent = layer;
    if (layer < 4) { stage.textContent = stages[layer]; action.innerHTML = `<i>✦</i> ${stages[layer].split(" · ")[1]}`; }
    if (layer === 4) { stage.textContent = "完成 · 羌绣花已亮起"; action.textContent = "绣花完成"; action.disabled = true; completeStitching(); }
  });
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
}

function setupTrail() {
  document.querySelectorAll(".trail-stop").forEach((stop, index) => stop.addEventListener("click", () => {
    document.querySelectorAll(".trail-stop").forEach((other) => other.classList.remove("active"));
    stop.classList.add("active");
    $("#trail-story").innerHTML = `<span>0${index + 1} · ${stop.querySelector("span").textContent}</span><h3>${stop.dataset.title}</h3><p>${stop.dataset.body}</p>`;
    markExplored("craft");
  }));
}

function renderCreations() {
  const track = $("#creation-track");
  content.creations.forEach((item) => {
    const figure = document.createElement("figure");
    figure.className = "creation-card";
    figure.innerHTML = `<img src="${item.src}" alt="羌绣文创：${item.label}" loading="lazy"><span>${item.label}</span>`;
    track.append(figure);
  });
  track.addEventListener("scroll", () => markExplored("creations"), { once: true });
}

function renderMaker() {
  const wishes = $("#wish-options");
  content.wishes.forEach((wish, index) => {
    const button = document.createElement("button");
    button.className = "wish-button";
    button.type = "button";
    button.textContent = wish;
    button.setAttribute("aria-pressed", index === state.wish ? "true" : "false");
    button.addEventListener("click", () => {
      state.wish = index;
      wishes.querySelectorAll("button").forEach((other, otherIndex) => other.setAttribute("aria-pressed", otherIndex === index ? "true" : "false"));
      markExplored("maker");
      updateMotif();
    });
    wishes.append(button);
  });
  const palettes = $("#palette-options");
  content.palettes.forEach((palette, index) => {
    const button = document.createElement("button");
    button.className = "palette-button";
    button.type = "button";
    button.style.setProperty("--c1", palette.a);
    button.style.setProperty("--c2", palette.b);
    button.setAttribute("aria-label", palette.name);
    button.setAttribute("aria-pressed", index === state.palette ? "true" : "false");
    button.addEventListener("click", () => {
      state.palette = index;
      palettes.querySelectorAll("button").forEach((other, otherIndex) => other.setAttribute("aria-pressed", otherIndex === index ? "true" : "false"));
      markExplored("maker");
      updateMotif();
    });
    palettes.append(button);
  });
  updateMotif();
}

function updateMotif() {
  const palette = content.palettes[state.palette];
  [$("#motif-preview"), $("#card-motif")].forEach((el) => {
    el.style.setProperty("--palette-a", palette.a);
    el.style.setProperty("--palette-b", palette.b);
  });
  $("#card-wish").textContent = content.wishes[state.wish];
  const participation = [
    "你选择了“愿美好绽放”：可延展为花卉纹样的书签、香囊或节庆礼物，让祝愿进入日常。",
    "你选择了“愿山河相连”：可延展为连续边饰的织带、帆布包或服饰配件，让纹样成为陪伴。",
    "你选择了“愿匠心长存”：可延展为纹样档案卡与体验材料包，让学习和传承有迹可循。"
  ];
  $("#participation-note").textContent = participation[state.wish];
}

function setupLineage() {
  document.querySelectorAll(".lineage-step").forEach((step, index) => step.addEventListener("click", () => {
    document.querySelectorAll(".lineage-step").forEach((other) => other.classList.remove("active"));
    step.classList.add("active");
    $("#lineage-detail").innerHTML = `<span>0${index + 1} · ${step.querySelector("span").textContent}</span><h3>${step.dataset.title}</h3><p>${step.dataset.body}</p>`;
    markExplored("craft");
  }));
}

function setupReview() {
  const panel = $("#review-panel");
  function render(key) { const item = content.review[key]; panel.innerHTML = `<span>${item.label} · 项目闭环</span><h3>${item.title}</h3><p>${item.body}</p><small>${item.proof}</small>`; }
  document.querySelectorAll(".review-tab").forEach((tab) => tab.addEventListener("click", () => {
    document.querySelectorAll(".review-tab").forEach((other) => { other.classList.remove("active"); other.setAttribute("aria-selected", "false"); });
    tab.classList.add("active"); tab.setAttribute("aria-selected", "true"); render(tab.dataset.key); markExplored("creations");
  }));
  render("problem");
}

function setupPuzzle() {
  const board = $("#puzzle-board");
  const movesDisplay = $("#puzzle-moves");
  const progressDisplay = $("#puzzle-progress");
  const message = $("#puzzle-message");
  const startButton = $("#puzzle-start");
  const resetButton = $("#puzzle-reset");
  const solved = Array.from({ length: 9 }, (_, index) => index);
  let tiles = [...solved];
  let selected = null;
  let moves = 0;
  let active = false;

  function shuffle() {
    tiles = [...solved];
    do { tiles.sort(() => Math.random() - .5); } while (tiles.every((tile, index) => tile === index));
    selected = null; moves = 0; active = true;
    message.textContent = "点击两块绣片交换位置。";
    render();
  }

  function render() {
    board.innerHTML = "";
    const correct = tiles.filter((tile, index) => tile === index).length;
    movesDisplay.textContent = String(moves).padStart(2, "0");
    progressDisplay.textContent = `${correct} / 9`;
    tiles.forEach((tile, index) => {
      const button = document.createElement("button");
      button.className = "puzzle-tile";
      button.type = "button";
      button.style.backgroundPosition = `${(tile % 3) * 50}% ${Math.floor(tile / 3) * 50}%`;
      button.setAttribute("aria-label", `第 ${index + 1} 块绣片`);
      if (tile === index) button.classList.add("is-correct");
      if (selected === index) button.classList.add("is-selected");
      button.addEventListener("click", () => {
        if (!active) return;
        if (selected === null) { selected = index; render(); return; }
        if (selected === index) { selected = null; render(); return; }
        [tiles[selected], tiles[index]] = [tiles[index], tiles[selected]];
        selected = null; moves += 1;
        if (tiles.every((tile, tileIndex) => tile === tileIndex)) { active = false; message.textContent = `拼图完成！你用 ${moves} 步复原了羌绣纹样。`; markExplored("patterns"); }
        render();
      });
      board.append(button);
    });
  }
  startButton.addEventListener("click", shuffle);
  resetButton.addEventListener("click", shuffle);
  render();
}

function openVideo(kind) {
  const videoData = content.videos[kind];
  const dialog = $("#media-dialog");
  const video = $("#story-video");
  video.pause();
  video.removeAttribute("src");
  video.load();
  video.src = videoData.src;
  $("#video-caption").textContent = videoData.caption;
  dialog.showModal();
  video.play().catch(() => {});
}

function closeVideo() {
  const dialog = $("#media-dialog");
  const video = $("#story-video");
  video.pause();
  video.removeAttribute("src");
  video.load();
  dialog.close();
}

function markExplored(id) {
  state.explored.add(id);
  const count = state.explored.size;
  $("#journey-count").textContent = `${count} / 6`;
}

function setupLens() {
  const explorer = $("#attire-explorer");
  const lens = $("#lens");
  function moveLens(event) {
    const rect = explorer.getBoundingClientRect();
    const point = event.touches ? event.touches[0] : event;
    const x = Math.max(9, Math.min(rect.width - 9, point.clientX - rect.left));
    const y = Math.max(9, Math.min(rect.height - 9, point.clientY - rect.top));
    lens.style.left = `${x}px`;
    lens.style.top = `${y}px`;
    lens.style.backgroundPosition = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
    markExplored("attire");
  }
  explorer.addEventListener("pointermove", (event) => { if (event.buttons === 1 || event.pointerType === "touch") moveLens(event); });
  explorer.addEventListener("pointerdown", moveLens);
}

function setupHotspots() {
  document.querySelectorAll(".hotspot").forEach((spot) => spot.addEventListener("click", () => {
    document.querySelectorAll(".hotspot").forEach((other) => other.classList.remove("is-active"));
    spot.classList.add("is-active");
    $("#hotspot-detail").textContent = spot.dataset.detail;
    markExplored("attire");
  }));
}

function setupScroll() {
  const sections = ["puzzle", "introduction", "patterns", "attire", "craft", "lineage", "action", "review", "trail", "creations", "maker"].map((id) => document.getElementById(id));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.14 });
  sections.forEach((section) => observer.observe(section));
  window.addEventListener("scroll", () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    $("#progress-fill").style.width = `${total ? (window.scrollY / total) * 100 : 0}%`;
  }, { passive: true });
}

function setupCard() {
  const dialog = $("#card-dialog");
  const nameInput = $("#guardian-name");
  $("#create-card").addEventListener("click", () => { updateMotif(); markExplored("maker"); dialog.showModal(); nameInput.focus(); });
  nameInput.addEventListener("input", () => { $("#card-name").textContent = nameInput.value.trim() || "羌绣守护人"; });
  $("#card-close").addEventListener("click", () => dialog.close());
  $("#remake-card").addEventListener("click", () => { dialog.close(); document.getElementById("maker").scrollIntoView({ behavior: "smooth" }); });
  $("#save-card").addEventListener("click", () => saveCard());
}

function saveCard() {
  const card = $("#guardian-card");
  const palette = content.palettes[state.palette];
  const canvas = document.createElement("canvas");
  canvas.width = 1000; canvas.height = 1200;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#2b1019"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#c99a50"; ctx.lineWidth = 5; ctx.strokeRect(38, 38, 924, 1124);
  ctx.fillStyle = "#e9ca8a"; ctx.textAlign = "center"; ctx.font = "36px serif"; ctx.fillText("绣见羌来", 500, 128);
  ctx.save(); ctx.translate(500, 500); ctx.rotate(Math.PI / 4); ctx.strokeStyle = palette.a; ctx.lineWidth = 22; ctx.beginPath(); ctx.roundRect(-148, -148, 296, 296, 80); ctx.stroke(); ctx.strokeStyle = palette.b; ctx.lineWidth = 11; ctx.beginPath(); ctx.arc(0, 0, 120, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
  ctx.fillStyle = palette.a; ctx.font = "190px serif"; ctx.fillText("✦", 500, 565);
  ctx.fillStyle = "#f2ddb1"; ctx.font = "bold 64px serif"; ctx.fillText($("#card-name").textContent, 500, 785);
  ctx.fillStyle = "#dac5b9"; ctx.font = "38px serif"; ctx.fillText($("#card-wish").textContent, 500, 850);
  ctx.fillStyle = "#ab8c7d"; ctx.font = "28px serif"; ctx.fillText("从一针一线，到当代新生", 500, 1050);
  const link = document.createElement("a"); link.download = "我的羌绣守护人卡.png"; link.href = canvas.toDataURL("image/png"); link.click();
  card.animate([{ transform: "scale(1)" }, { transform: "scale(1.03)" }, { transform: "scale(1)" }], { duration: 380 });
}

function init() {
  renderMeaningButtons(); renderCreations(); renderMaker(); setupPuzzle(); setupStitching(); setupLineage(); setupReview(); setupTrail(); setupLens(); setupHotspots(); setupScroll(); setupCard();
  $("#enter-button").addEventListener("click", () => { document.getElementById("introduction").scrollIntoView({ behavior: "smooth" }); markExplored("introduction"); });
  $("#short-video-trigger").addEventListener("click", () => openVideo("short"));
  $("#craft-video-trigger").addEventListener("click", () => { markExplored("craft"); openVideo("craft"); });
  $("#dialog-close").addEventListener("click", closeVideo);
  $("#media-dialog").addEventListener("close", closeVideo);
  $("#journey-button").addEventListener("click", () => { const panel = $("#journey-panel"); panel.hidden = !panel.hidden; });
}

init();
