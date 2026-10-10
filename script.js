/**
 * 共用邏輯：搜尋、篩選、卡片渲染
 * 首頁（index.html）與資源總覽頁（resources.html）都會載入這支檔案，
 * 各自呼叫需要的函式。
 */

// ---------- 偏差值區間篩選 ----------

// 固定級距（跟補習班慣用的偏差值分段一致），選到的區間只要跟
// 這間學校的偏差值範圍有重疊，就算符合（學校本身的 level 常常是個範圍，
// 例如東京大學「67.5～72.5」橫跨了 65～69 跟 70以上兩個級距）。
const LEVEL_BRACKETS = [
  { key: "70+", label: "70以上", min: 70, max: Infinity },
  { key: "65-69", label: "65～69", min: 65, max: 69.999 },
  { key: "60-64", label: "60～64", min: 60, max: 64.999 },
  { key: "55-59", label: "55～59", min: 55, max: 59.999 },
  { key: "50-54", label: "50～54", min: 50, max: 54.999 },
  { key: "45-49", label: "45～49", min: 45, max: 49.999 },
  { key: "40-44", label: "40～44", min: 40, max: 44.999 },
  { key: "<40", label: "40未滿", min: -Infinity, max: 39.999 },
];

// 把 level 字串（例如 "67.5～72.5"）解析成數字範圍。
// level 是陣列（JLPT N 級數那種）或根本沒有數字格式的，回傳 null，
// 代表這筆資源不適用偏差值篩選。
function parseLevelRange(res) {
  if (!res.level || typeof res.level !== "string") return null;
  const m = res.level.match(/([\d.]+)\s*[～~]\s*([\d.]+)/);
  if (!m) return null;
  return { min: parseFloat(m[1]), max: parseFloat(m[2]) };
}

function matchesLevelBracket(res, bracket) {
  const range = parseLevelRange(res);
  if (!range) return false;
  return range.max >= bracket.min && range.min <= bracket.max;
}

// ---------- 小工具 ----------

function priceBadgeClass(price) {
  if (price === "免費") return "price-free";
  if (price === "部分免費") return "price-partial";
  return "price-paid";
}

function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key) || "";
}

// level 有兩種來源格式：陣列（如 JLPT 的 ["N5","N4"...]）
// 或字串（如大學的偏差值範圍 "67.5～72.5"），兩種都要能正確顯示。
function formatLevel(level) {
  if (!level) return "不限程度";
  if (Array.isArray(level)) return level.length ? level.join(" / ") : "不限程度";
  return String(level);
}

// target 同樣有兩種來源格式：一句話的字串，或條列式的陣列（如大學的適合對象標籤）。
function formatTarget(target) {
  if (!target) return "";
  return Array.isArray(target) ? target.join("、") : target;
}

// 找出這筆資源的 fields 裡，跟搜尋關鍵字相符的那個科系（純粹用來做精準篩選，不含排名）。
function findMatchedField(res, query) {
  if (!res.fields || !query) return null;
  const q = query.trim().toLowerCase();
  if (!q) return null;
  const match = res.fields.find((f) => {
    const name = typeof f === "string" ? f : f.name;
    return name && name.toLowerCase().includes(q);
  });
  if (!match) return null;
  return typeof match === "string" ? { name: match } : match;
}

// QS 學科排名跟「科系（fields／学部）」是兩個不同維度：
// 同一個学部底下可能橫跨好幾個 QS 學科。排名比對獨立在 qsRankings 裡做，
// 不掛在 fields 上，避免錯誤對應誤導使用者。
function findMatchedQsSubject(res, query) {
  if (!res.qsRankings || !query) return null;
  const q = query.trim().toLowerCase();
  if (!q) return null;
  return (
    res.qsRankings.find((r) => r.subject && r.subject.toLowerCase().includes(q)) || null
  );
}

// QS 排名格式：有時是純數字("31")，有時帶並列記號("=31")，
// 有時是區間("101-150")，顯示時要分別處理成易讀的樣子。
function formatRank(rank) {
  if (rank == null) return "未公開";
  const r = String(rank);
  if (r.startsWith("=")) return "#" + r.slice(1) + "（並列）";
  return "#" + r;
}

// 排序用：從排名字串中取出開頭數字（區間取下界），没有排名的視為最大值排到最後。
function parseRankNumber(rank) {
  if (rank == null) return null;
  const match = String(rank).match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

// ---------- 卡片渲染 ----------

function renderResourceCard(res, matchedQs) {
  const strengthsHtml = (res.strengths || []).map((s) => `<li>${s}</li>`).join("");
  const weaknessesHtml = (res.weaknesses || []).map((w) => `<li>${w}</li>`).join("");
  const tagsHtml = (res.tags || [])
    .map((t) => `<span class="tag-pill">${t}</span>`)
    .join("");
  const levelText = formatLevel(res.level);
  const targetText = formatTarget(res.target);
  const primaryCategory = res.category[0];

  const fieldsHtml =
    res.fields && res.fields.length
      ? `
        <div class="fields-block">
          <div class="section-label">科系（點擊可直接搜尋）</div>
          <div class="tags-row">
            ${res.fields
              .map((f) => {
                const name = typeof f === "string" ? f : f.name;
                return `<button type="button" class="tag-pill field-pill field-pill-btn" data-field-name="${name}">${name}</button>`;
              })
              .join("")}
          </div>
        </div>
      `
      : "";

  const admissionPdfHtml = res.admissionPdfUrl
    ? `
        <a class="pdf-link" href="${res.admissionPdfUrl}" target="_blank" rel="noopener">
          📄 查看官方招生簡章（PDF）
        </a>
      `
    : "";

  const admissionNoteHtml = res.admissionNote
    ? `
        <div class="admission-note">
          <span class="note-icon" aria-hidden="true">⚠️</span>
          <span>${res.admissionNote}</span>
        </div>
      `
    : "";

  // 搜尋命中 QS 學科時，卡片一開始（不用展開）就顯示排名提示，
  // 沒有排名資料的先標「未公開」，之後補上數字就會自動顯示。
  const rankCalloutHtml = matchedQs
    ? `
        <div class="rank-callout">
          <span class="rank-icon" aria-hidden="true">🏆</span>
          <span class="rank-field-name">${matchedQs.subject}</span>
          <span class="rank-value">QS 世界排名 ${formatRank(matchedQs.worldRank)}</span>
        </div>
      `
    : "";

  return `
    <article class="resource-card" data-cat="${primaryCategory}" data-expanded="false">
      <div class="top-row">
        <h3>${res.name}</h3>
        <span class="badge ${priceBadgeClass(res.price)}">${res.price}</span>
      </div>
      <div class="meta-row">
        <span class="tag-pill">${primaryCategory}</span>
        <span class="tag-pill">${res.subcategory.join(" / ")}</span>
        <span class="tag-pill">${levelText}</span>
      </div>
      <p class="target">適合對象：${targetText}</p>
      ${rankCalloutHtml}
      ${admissionNoteHtml}
      <div class="detail-panel">
        <div class="detail-inner">
          ${fieldsHtml}
          ${admissionPdfHtml}
          <div class="pros-cons">
            <div class="strengths">
              <div class="label">優點</div>
              <ul>${strengthsHtml}</ul>
            </div>
            <div class="weaknesses">
              <div class="label">缺點</div>
              <ul>${weaknessesHtml}</ul>
            </div>
          </div>
          <div class="tags-row">${tagsHtml}</div>
        </div>
      </div>
      <div class="bottom-row">
        <button class="expand-toggle" type="button" aria-expanded="false">
          <span class="toggle-label">查看詳情</span>
          <span class="chevron" aria-hidden="true">▾</span>
        </button>
        <a class="go-link" href="${res.officialUrl}" target="_blank" rel="noopener">
          前往官方網站 ↗
        </a>
      </div>
    </article>
  `;
}

// 展開／收合 + 科系標籤點擊：事件委派掛在列表容器上，只需綁一次，
// 搜尋/篩選重繪卡片列表時不會漏掉新卡片的按鈕。
function bindListInteractions(listEl, { onFieldClick } = {}) {
  listEl.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest(".expand-toggle");
    if (toggleBtn) {
      const card = toggleBtn.closest(".resource-card");
      const wasExpanded = card.dataset.expanded === "true";
      card.dataset.expanded = String(!wasExpanded);
      toggleBtn.setAttribute("aria-expanded", String(!wasExpanded));
      const label = toggleBtn.querySelector(".toggle-label");
      if (label) label.textContent = wasExpanded ? "查看詳情" : "收合";
      return;
    }

    const fieldBtn = e.target.closest(".field-pill-btn");
    if (fieldBtn && onFieldClick) {
      onFieldClick(fieldBtn.dataset.fieldName);
    }
  });
}

// ---------- 篩選邏輯 ----------

function filterResources({ query = "", category = "" }) {
  const q = query.trim().toLowerCase();

  return RESOURCES.filter((res) => {
    if (category && !res.category.includes(category)) return false;

    if (!q) return true;

    const haystack = [
      res.name,
      res.target,
      res.priceDetail || "",
      ...res.category,
      ...res.subcategory,
      ...(res.level || []),
      ...res.tags,
      ...res.strengths,
      ...res.weaknesses,
    ]
      .join(" ")
      .toLowerCase();

    if (haystack.includes(q)) return true;

    // QS 學科排名的學科名稱（如「物理」「AI／資料科學」）也要算進搜尋範圍，
    // 不然搜學科名稱時，排名比對找得到符合的學校，但這裡的基本篩選卻先把它濾掉，
    // 導致排名系統跟搜尋系統判斷不一致、資源直接消失。
    if (
      res.qsRankings &&
      res.qsRankings.some((r) => r.subject && r.subject.toLowerCase().includes(q))
    ) {
      return true;
    }

    return false;
  });
}

// ---------- 資源總覽頁 ----------

function initResourcesPage() {
  const listEl = document.getElementById("resource-list");
  const countEl = document.getElementById("result-count");
  const searchInput = document.getElementById("search-input");
  const chipContainer = document.getElementById("category-filters");

  let state = {
    query: getQueryParam("q"),
    category: getQueryParam("category"),
    fieldFilter: null, // 由「點科系標籤」觸發，精準比對 fields，不用模糊搜尋
    levelBracket: null, // 偏差值區間篩選，例如 "65-69"
  };

  const levelFilterContainer = document.getElementById("level-filters");

  searchInput.value = state.query;
  bindListInteractions(listEl, {
    onFieldClick: (fieldName) => {
      state.query = fieldName;
      state.fieldFilter = fieldName;
      searchInput.value = fieldName;
      renderList();
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      searchInput.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "center" });
      searchInput.focus({ preventScroll: true });
    },
  });

  // #2：篩選標籤的 DOM 只建立一次，之後點擊只切換 aria-pressed，
  // 不重建整段 HTML，讓 CSS 的 :active / transition 回饋能正常接住。
  function buildChips() {
    const allChip = `<button class="filter-chip" data-cat="">全部</button>`;
    const chips = CATEGORIES.map(
      (c) => `<button class="filter-chip" data-cat="${c.key}">${c.icon} ${c.label}</button>`
    ).join("");
    chipContainer.innerHTML = allChip + chips;

    chipContainer.querySelectorAll(".filter-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.category = btn.dataset.cat;
        syncChipState();
        renderList();
      });
    });
  }

  function syncChipState() {
    chipContainer.querySelectorAll(".filter-chip").forEach((btn) => {
      btn.setAttribute(
        "aria-pressed",
        String(btn.dataset.cat === state.category)
      );
    });
  }

  function buildLevelChips() {
    if (!levelFilterContainer) return;
    const allChip = `<button class="filter-chip" data-bracket="">不限</button>`;
    const chips = LEVEL_BRACKETS.map(
      (b) => `<button class="filter-chip" data-bracket="${b.key}">${b.label}</button>`
    ).join("");
    levelFilterContainer.innerHTML = allChip + chips;

    levelFilterContainer.querySelectorAll(".filter-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.levelBracket = btn.dataset.bracket || null;
        syncLevelChipState();
        renderList();
      });
    });
  }

  function syncLevelChipState() {
    if (!levelFilterContainer) return;
    levelFilterContainer.querySelectorAll(".filter-chip").forEach((btn) => {
      btn.setAttribute(
        "aria-pressed",
        String((btn.dataset.bracket || null) === state.levelBracket)
      );
    });
  }

  function renderList() {
    // 點科系標籤觸發的搜尋：精準比對「這間學校的 fields 真的有這個科系」，
    // 不用模糊搜尋，避免像「經濟商管」這種複合詞子字串誤命中「商管」。
    const results = state.fieldFilter
      ? RESOURCES.filter((res) => {
          if (state.category && !res.category.includes(state.category)) return false;
          if (!res.fields) return false;
          return res.fields.some(
            (f) => (typeof f === "string" ? f : f.name) === state.fieldFilter
          );
        })
      : filterResources(state);

    // 偏差值區間篩選：只保留範圍有重疊的資源（沒有偏差值資料的資源，
    // 例如字典、檢定這類非大學資源，選了區間之後就不會出現）。
    const bracketObj = state.levelBracket
      ? LEVEL_BRACKETS.find((b) => b.key === state.levelBracket)
      : null;
    const bracketFiltered = bracketObj
      ? results.filter((res) => matchesLevelBracket(res, bracketObj))
      : results;

    // 把每筆資源跟目前搜尋字串比對出符合的 QS 學科排名。
    // 有命中的排到最前面，依世界排名由小到大排序；沒命中的維持原本順序排在後面。
    const withMatch = bracketFiltered.map((res) => ({
      res,
      matched: findMatchedQsSubject(res, state.query),
    }));

    withMatch.sort((a, b) => {
      const aHas = a.matched ? 1 : 0;
      const bHas = b.matched ? 1 : 0;
      if (aHas !== bHas) return bHas - aHas;
      if (a.matched && b.matched) {
        const ar = parseRankNumber(a.matched.worldRank);
        const br = parseRankNumber(b.matched.worldRank);
        if (ar == null && br == null) return 0;
        if (ar == null) return 1;
        if (br == null) return -1;
        return ar - br;
      }
      return 0;
    });

    countEl.textContent = `共 ${bracketFiltered.length} 筆資源`;

    if (withMatch.length === 0) {
      // 選了偏差值區間卻查無資料，標示「資料未登錄」而不是沿用一般的空結果文案，
      // 讓使用者知道是這個區間還沒有資料，不是打錯字或分類選錯。
      const emptyMsg = bracketObj
        ? "資料未登錄"
        : "沒有符合條件的資源，試試看換個關鍵字或分類。";
      listEl.innerHTML = `<div class="empty-state">${emptyMsg}</div>`;
    } else {
      listEl.innerHTML = withMatch
        .map(({ res, matched }) => renderResourceCard(res, matched))
        .join("");
    }
  }

  // #6：搜尋輸入防抖動 + 中文組字（IME）判斷。
  // 組字過程中（注音選字還沒確定）不觸發篩選，避免畫面一直閃動重排；
  // 打完字加一個小延遲才篩選，體感更穩。
  let isComposing = false;
  let debounceTimer = null;

  function scheduleFilter() {
    if (isComposing) return;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      state.query = searchInput.value;
      state.fieldFilter = null; // 使用者自己打字，退回一般模糊搜尋
      renderList();
    }, 250);
  }

  searchInput.addEventListener("compositionstart", () => {
    isComposing = true;
  });
  searchInput.addEventListener("compositionend", () => {
    isComposing = false;
    scheduleFilter();
  });
  searchInput.addEventListener("input", scheduleFilter);

  buildChips();
  syncChipState();
  buildLevelChips();
  syncLevelChipState();
  renderList();
}

// ---------- 首頁：滿版大類別 ----------

// 簡單 HTML escape，資料雖然是自己維護、信任的，但使用者會在搜尋框打字，
// 搜尋結果的高亮/組字內容來自使用者輸入，還是統一跳脫比較保險。
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function initHomePage() {
  // 四個大類別：配色沿用站內分類色（學習藍／檢定朱／留學金／閱讀苔綠）
  const DARK_GLASS = "linear-gradient(135deg,rgba(255,255,255,.16),rgba(255,255,255,0) 42%),rgba(12,18,34,.46)";
  const LIGHT_GLASS = "linear-gradient(135deg,rgba(255,255,255,.34),rgba(255,255,255,.08) 45%,rgba(255,255,255,.2))";
  const CATS = [
    { key: "日語學習", tab: "學習", giant: "日語學習", bg: "#16243f", tone: "#22385f", ink: "#f1ead9", accent: "#7fa6d6", on: "#16243f", glass: DARK_GLASS,
      lead: "辭典、單字、文法等學習網站與 App，比較優缺點、適合程度與費用。" },
    { key: "日語相關檢定", tab: "檢定", giant: "日語檢定", bg: "#8f2e24", tone: "#a8362b", ink: "#f1ead9", accent: "#c6a15b", on: "#1e1b16", glass: DARK_GLASS,
      lead: "JLPT、BJT、J.TEST、JFT-Basic 的報名方式、時間與費用，一次比較。" },
    { key: "日本留學", tab: "留學", giant: "日本留學", bg: "#c6a15b", tone: "#d3b374", ink: "#1e1b16", accent: "#16243f", on: "#f1ead9", glass: LIGHT_GLASS,
      lead: "日本各大學的偏差值區間、科系與入學管道，依程度篩選。" },
    { key: "日文閱讀與影音", tab: "影音", giant: "閱讀影音", bg: "#4f6b52", tone: "#5f7d63", ink: "#f1ead9", accent: "#e0d5b8", on: "#1e1b16", glass: DARK_GLASS,
      lead: "這個分類還沒有收錄資源，整理完成後會出現在這裡。" },
  ];

  const inCat = (key) => RESOURCES.filter((r) => r.category.includes(key));
  const subcats = (rs) => [...new Set(rs.flatMap((r) => r.subcategory))];

  // 每個大類別底下的小類別列：全部由資料算出，不手動維護數量
  function railFor(c) {
    const rs = inCat(c.key);
    if (c.key === "日語學習") {
      return ["文法", "JLPT", "背單字", "字典", "漢字", "聽力"].map((t) => ({
        glyph: t,
        sub: `${rs.filter((r) => (r.tags || []).includes(t)).length} 筆`,
        test: (r) => (r.tags || []).includes(t),
        label: t,
      }));
    }
    if (c.key === "日語相關檢定") {
      return rs.map((r) => {
        const m = r.name.match(/^[A-Za-z.\-]+/);
        const g = m ? m[0] : r.name;
        return { glyph: g, sub: r.name.slice(g.length).trim() || formatLevel(r.level), test: (x) => x.id === r.id, label: g };
      });
    }
    if (c.key === "日本留學") {
      return LEVEL_BRACKETS.map((b) => ({
        glyph: b.label,
        sub: `${rs.filter((r) => matchesLevelBracket(r, b)).length} 所`,
        test: (r) => matchesLevelBracket(r, b),
        label: `偏差值 ${b.label}`,
      }));
    }
    return [];
  }

  const stage = document.getElementById("stage");
  const tabs = document.getElementById("tabs");
  const q = document.getElementById("q");
  const scope = document.getElementById("scope");
  const resultsEl = document.getElementById("results");
  let active = 0;
  let activeItem = null;
  const rails = CATS.map(railFor);

  CATS.forEach((c, i) => {
    const rs = inCat(c.key);
    const s = document.createElement("section");
    s.className = "cat";
    s.dataset.i = i;
    s.setAttribute("aria-label", c.key);
    s.style.cssText = `--c-bg:${c.bg};--c-tone:${c.tone};--c-ink:${c.ink};--c-accent:${c.accent}`;
    s.innerHTML = `
      <div class="giant" aria-hidden="true">${c.giant}</div>
      <header class="intro">
        <h2>${c.key}</h2>
        <p class="lead">${c.lead}</p>
        <div class="facts">
          ${rs.length ? `<span class="count">${rs.length} 筆資源</span>` : ""}
          ${subcats(rs).map((x) => `<span class="pill sub">${esc(x)}</span>`).join("")}
        </div>
      </header>
      <nav class="subs ${rails[i].length ? "" : "empty"}" aria-label="${c.key}小類別">
        ${
          rails[i].length
            ? rails[i].map((x, j) => `<button class="rail-btn" type="button" data-j="${j}" aria-pressed="false"><span class="g">${esc(x.glyph)}</span><span class="l">${esc(x.sub)}</span></button>`).join("")
            : "還沒有資源，先看看其他分類"
        }
      </nav>`;
    stage.appendChild(s);

    const b = document.createElement("button");
    b.type = "button";
    b.textContent = c.tab;
    b.setAttribute("aria-label", c.key);
    b.addEventListener("click", () =>
      s.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
    );
    tabs.appendChild(b);
  });

  function setActive(i) {
    active = i;
    const c = CATS[i];
    const st = document.documentElement.style;
    st.setProperty("--stage-bg", c.bg);
    st.setProperty("--stage-ink", c.ink);
    st.setProperty("--stage-accent", c.accent);
    st.setProperty("--stage-on", c.on);
    st.setProperty("--stage-glass", c.glass);
    [...tabs.children].forEach((b, k) => (k === i ? b.setAttribute("aria-current", "true") : b.removeAttribute("aria-current")));
    clearScope();
  }

  function updatePlaceholder() {
    q.placeholder = activeItem == null ? "試試搜尋「JLPT」、「N2」、「檢定」..." : `在${CATS[active].key}的「${rails[active][activeItem].label}」中搜尋`;
  }

  function clearScope() {
    activeItem = null;
    scope.hidden = true;
    document.querySelectorAll('.rail-btn[aria-pressed="true"]').forEach((x) => x.setAttribute("aria-pressed", "false"));
    updatePlaceholder();
    renderResults();
    queueLens();
  }

  stage.addEventListener("click", (e) => {
    const btn = e.target.closest(".rail-btn");
    if (!btn) return;
    const j = +btn.dataset.j;
    if (activeItem === j) {
      clearScope();
      return;
    }
    btn.parentElement.querySelectorAll(".rail-btn").forEach((x) => x.setAttribute("aria-pressed", x === btn ? "true" : "false"));
    activeItem = j;
    scope.hidden = false;
    scope.textContent = rails[active][j].label + " ×";
    updatePlaceholder();
    renderResults();
    queueLens();
  });
  scope.addEventListener("click", () => {
    clearScope();
    q.focus();
  });

  // 搜尋：未選小類別時搜全站，選了小類別就限縮在該範圍內（沿用全站比對欄位，含 QS 學科名稱）
  function haystack(r) {
    return [r.name, formatTarget(r.target), r.priceDetail || "", ...r.category, ...r.subcategory, ...[].concat(r.level || []), ...(r.tags || []), ...(r.strengths || []), ...(r.weaknesses || []), ...((r.qsRankings || []).map((x) => x.subject || ""))]
      .join(" ")
      .toLowerCase();
  }

  function renderResults() {
    const term = q.value.trim().toLowerCase();
    if (!term && activeItem == null) {
      resultsEl.hidden = true;
      resultsEl.innerHTML = "";
      return;
    }
    let list = RESOURCES;
    if (activeItem != null) list = inCat(CATS[active].key).filter(rails[active][activeItem].test);
    if (term) list = list.filter((r) => haystack(r).includes(term));
    resultsEl.hidden = false;
    const limit = activeItem != null ? list.length : 6;
    resultsEl.innerHTML = list.length
      ? `<p class="rc">符合 ${list.length} 筆${list.length > limit ? `，先列出前 ${limit} 筆` : ""}，點選卡片看詳細資訊</p>` +
        list
          .slice(0, limit)
          .map(
            (r) => `
        <button type="button" class="res" data-id="${esc(r.id)}" data-cat="${esc(r.category[0])}">
          <span class="row"><span class="name">${esc(r.name)}</span><span class="badge ${priceBadgeClass(r.price)}">${esc(r.price)}</span></span>
          <span class="meta"><span class="pill sub">${esc(r.subcategory.join("、"))}</span><span>${r.category[0] === "日本留學" ? "偏差值 " : ""}${esc(formatLevel(r.level))}</span></span>
        </button>`
          )
          .join("")
      : `<div class="empty-state" style="padding:1rem;">沒有符合的資源，換個關鍵字，或清除小類別再試一次。</div>`;
  }

  // ---------- 詳細資訊面板（原生 dialog） ----------
  const detail = document.getElementById("detail");
  let lastTrigger = null;
  const li = (a) => (a || []).map((x) => `<li>${esc(x)}</li>`).join("");

  function openDetail(id, trigger) {
    const r = RESOURCES.find((x) => x.id === id);
    if (!r) return;
    lastTrigger = trigger;
    const isUni = r.category[0] === "日本留學";
    const fields = (r.fields || []).map((f) => (typeof f === "string" ? { name: f } : f));
    const qs = [...(r.qsRankings || [])].sort((a, b) => (parseRankNumber(a.worldRank) ?? 9999) - (parseRankNumber(b.worldRank) ?? 9999));
    const hasJp = qs.some((x) => x.japanRank);
    const note = r.admissionNote ? `<div class="amber"><span aria-hidden="true">⚠️</span><span>${esc(r.admissionNote)}</span></div>` : "";
    const reg =
      r.registrationMethod || r.registrationPeriod
        ? `<div class="kv">${r.registrationMethod ? `<div><div class="lab">報名方式</div><p class="txt">${esc(r.registrationMethod)}</p></div>` : ""}${
            r.registrationPeriod ? `<div><div class="lab">報名時間</div><p class="txt">${esc(r.registrationPeriod)}</p></div>` : ""
          }</div>`
        : "";
    detail.innerHTML = `
      <article class="sheet" data-cat="${esc(r.category[0])}">
        <header class="sheet-head">
          <div>
            <h2 id="d-title">${esc(r.name)}</h2>
            <div class="meta"><span class="tag">${esc(r.subcategory.join("、"))}</span><span class="badge ${priceBadgeClass(r.price)}">${esc(r.price)}</span></div>
          </div>
          <button type="button" class="close" id="d-close" aria-label="關閉">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
          </button>
        </header>
        <div class="sheet-body">
          <div class="kv">
            <div><div class="lab">${isUni ? "偏差值" : "程度"}</div><div class="big">${esc(formatLevel(r.level))}</div>${isUni ? `<p class="note-src">資料來源：河合塾 Kei-Net　2027年度　一般選拔</p>` : ""}</div>
            <div><div class="lab">費用</div><p class="txt">${esc(r.priceDetail || r.price)}</p></div>
          </div>
          ${note}
          ${reg}
          ${r.target ? `<div><div class="lab">適合對象</div><div class="tags-row">${[].concat(r.target).map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div></div>` : ""}
          ${fields.length ? `<div><div class="lab">可報考科系領域</div><div class="tags-row">${fields.map((f) => `<span class="tag field">${esc(f.name)}</span>`).join("")}</div></div>` : ""}
          ${
            qs.length
              ? `<div><div class="lab">QS 學科排名</div>
            <div class="qs" role="table"><span class="h">學科</span><span class="h r">世界</span><span class="h r">${hasJp ? "日本" : ""}</span>
              ${qs.map((x, i) => `<span>${esc(x.subject)}</span><span class="r ${i < 3 ? "top3" : ""}">${esc(formatRank(x.worldRank))}</span><span class="r">${hasJp ? esc(x.japanRank || "—") : ""}</span>`).join("")}
            </div></div>`
              : ""
          }
          <div class="pc">
            <div class="p"><div class="lab">優點</div><ul>${li(r.strengths)}</ul></div>
            <div class="c"><div class="lab">缺點</div><ul>${li(r.weaknesses)}</ul></div>
          </div>
          <div class="links">
            ${r.officialUrl ? `<a class="btn main" href="${esc(r.officialUrl)}" target="_blank" rel="noopener noreferrer">前往官網</a>` : ""}
            ${r.admissionPdfUrl ? `<a class="btn line" href="${esc(r.admissionPdfUrl)}" target="_blank" rel="noopener noreferrer">入學簡章 PDF</a>` : ""}
          </div>
        </div>
      </article>`;
    detail.showModal();
    detail.querySelector(".sheet").scrollTop = 0;
  }

  resultsEl.addEventListener("click", (e) => {
    const b = e.target.closest(".res");
    if (b) openDetail(b.dataset.id, b);
  });
  detail.addEventListener("click", (e) => {
    if (e.target === detail || e.target.closest("#d-close")) detail.close();
  });
  detail.addEventListener("close", () => {
    if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
  });

  // 搜尋輸入：跟資源總覽頁一樣的防抖動 + IME 組字判斷，避免中文/日文輸入法選字中途閃爍重排
  let isComposing = false;
  let debounceTimer = null;
  function scheduleRender() {
    if (isComposing) return;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(renderResults, 250);
  }
  q.addEventListener("compositionstart", () => {
    isComposing = true;
  });
  q.addEventListener("compositionend", () => {
    isComposing = false;
    scheduleRender();
  });
  q.addEventListener("input", scheduleRender);
  document.getElementById("search").addEventListener("submit", (e) => {
    e.preventDefault();
    clearTimeout(debounceTimer);
    renderResults();
  });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !detail.open && (q.value || activeItem != null)) {
      q.value = "";
      clearScope();
    }
  });

  const io = new IntersectionObserver((es) => es.forEach((en) => en.isIntersecting && setActive(+en.target.dataset.i)), { root: stage, threshold: 0.6 });
  document.querySelectorAll(".cat").forEach((s) => io.observe(s));

  // 液態玻璃：以位移貼圖在邊緣做出透鏡折射效果（Chromium 專屬特效，純裝飾不影響功能）；
  // 其他瀏覽器會因 CSS.supports 檢查不通過而直接退回霧面模糊，不會有任何閃爍或報錯。
  const glass = document.getElementById("search");
  const map = document.getElementById("lensMap");
  const filt = document.getElementById("lens");
  let lensRaf = 0;
  function buildLens() {
    const w = Math.round(glass.offsetWidth);
    const h = Math.round(glass.offsetHeight);
    if (!w || !h) return;
    const fx = Math.min(0.5, 22 / w).toFixed(3);
    const fy = Math.min(0.5, 22 / h).toFixed(3);
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><defs>
      <linearGradient id='x' x1='0' x2='1' y1='0' y2='0'><stop offset='0' stop-color='rgb(255,0,0)'/><stop offset='${fx}' stop-color='rgb(128,0,0)'/><stop offset='${1 - fx}' stop-color='rgb(128,0,0)'/><stop offset='1' stop-color='rgb(0,0,0)'/></linearGradient>
      <linearGradient id='y' x1='0' x2='0' y1='0' y2='1'><stop offset='0' stop-color='rgb(0,255,0)'/><stop offset='${fy}' stop-color='rgb(0,128,0)'/><stop offset='${1 - fy}' stop-color='rgb(0,128,0)'/><stop offset='1' stop-color='rgb(0,0,0)'/></linearGradient></defs>
      <rect width='100%' height='100%' fill='rgb(0,0,0)'/><rect width='100%' height='100%' fill='url(#x)'/><rect width='100%' height='100%' fill='url(#y)' style='mix-blend-mode:screen'/></svg>`;
    const href = "data:image/svg+xml," + encodeURIComponent(svg);
    [filt, map].forEach((n) => {
      n.setAttribute("width", w);
      n.setAttribute("height", h);
    });
    map.setAttribute("href", href);
    map.setAttributeNS("http://www.w3.org/1999/xlink", "href", href);
  }
  function queueLens() {
    cancelAnimationFrame(lensRaf);
    lensRaf = requestAnimationFrame(buildLens);
  }
  const isChromium = /Chrome|Chromium|Edg\//.test(navigator.userAgent) && !/OPR\/|Firefox/.test(navigator.userAgent);
  if (isChromium && window.CSS && CSS.supports("backdrop-filter", "url(#lens)")) {
    glass.classList.add("lens");
    new ResizeObserver(queueLens).observe(glass);
    buildLens();
  }

  // 捲動（切換大類別）中先讓搜尋框淡出，停止後立刻浮回來：
  // 優先用 scrollend，瀏覽器沒支援就用 80ms 短防抖頂替，避免搜尋框跟著內容一起跳動。
  let moveTimer = 0;
  const showSearch = () => {
    glass.classList.remove("moving");
    resultsEl.classList.remove("moving");
  };
  stage.addEventListener(
    "scroll",
    () => {
      glass.classList.add("moving");
      resultsEl.classList.add("moving");
      clearTimeout(moveTimer);
      moveTimer = setTimeout(showSearch, 80);
    },
    { passive: true }
  );
  stage.addEventListener("scrollend", () => {
    clearTimeout(moveTimer);
    showSearch();
  });

  setActive(0);
}
