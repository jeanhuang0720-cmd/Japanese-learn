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

// ---------- 首頁 ----------

function initHomePage() {
  const form = document.getElementById("home-search-form");
  const input = document.getElementById("home-search-input");
  const gridEl = document.getElementById("category-grid");

  gridEl.innerHTML = CATEGORIES.map((c) => {
    const count = RESOURCES.filter((r) => r.category.includes(c.key)).length;
    return `
      <a class="category-card" data-cat="${c.key}" href="resources.html?category=${encodeURIComponent(
        c.key
      )}">
        <span class="icon">${c.icon}</span>
        <span class="name">${c.label}</span>
        <span class="count">${count} 筆資源</span>
      </a>
    `;
  }).join("");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    window.location.href = `resources.html?q=${encodeURIComponent(q)}`;
  });
}
