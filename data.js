/**
 * 資源資料檔
 * ---------------------------------------
 * 這裡只放「資料」，不放任何顯示邏輯。
 * 之後新增資源時，只需要在 RESOURCES 陣列裡加入新的物件即可，
 * 不需要動 HTML / CSS / JS。
 *
 * 欄位說明：
 * - id：唯一識別碼（英文小寫、連字號），未來做詳細頁路由會用到
 * - category：頂層分類，可多個。目前用到的值：
 *      "日語學習" / "日語相關檢定" / "日本留學" / "日文閱讀與影音"
 * - subcategory：次分類，可多個
 * - level：適用日語程度，陣列
 * - price："免費" / "部分免費" / "付費"
 * - priceDetail：價格的文字說明（可留空字串）
 * - registrationMethod / registrationPeriod：僅檢定類資源會用到，其他資源可留空字串
 * - target：適合對象，一句話
 * - strengths / weaknesses：陣列，每項一個重點
 * - tags：搜尋標籤，陣列
 */

const RESOURCES = [
  {
    id: "jlpt",
    name: "JLPT日本語能力試驗",
    officialUrl: "https://www.jlpt.tw",
    category: ["日語相關檢定"],
    subcategory: ["各類日語檢定"],
    level: ["N1", "N2", "N3", "N4", "N5"],
    price: "付費",
    priceDetail: "N1~N3：1800 元／N4~N5：1650 元",
    registrationMethod: "線上",
    registrationPeriod: "3～4月、8～9月",
    target: "需要通用、廣泛被認可日語能力證明的學習者",
    strengths: ["非常通用且最廣為人知"],
    weaknesses: [
      "僅能分段考，無法像多益一樣直接得出精確分數",
      "一年僅能報考兩次",
    ],
    tags: ["JLPT", "檢定", "考試", "官方"],
  },
  {
    id: "bjt",
    name: "BJT商務日語能力考試",
    officialUrl: "https://www.kanken.or.jp/bjt/tw/",
    category: ["日語相關檢定"],
    subcategory: ["各類日語檢定"],
    level: ["J1+", "J1", "J2", "J3", "J4", "J5"],
    price: "付費",
    priceDetail: "72美元",
    registrationMethod: "線上",
    registrationPeriod: "彈性報名，最晚考試前一天皆可報名",
    target: "希望前往日本打工者，或未報名到JLPT而急需證明日文能力者",
    strengths: [
      "近年越來越多公司採用此證書",
      "全台皆有據點可報名",
      "考完直接得分數，分數對照級數",
      "報名彈性高，最晚考試前一天皆可報名",
    ],
    weaknesses: [
      "費用較JLPT高",
      "泛用性沒有JLPT高",
      "相對JLPT而言較不主流、普及度較低",
    ],
    tags: ["BJT", "檢定", "考試", "商用日語"],
  },
  {
    id: "jtest",
    name: "J.TEST實用日本語檢定",
    officialUrl: "https://www.j-test.org.tw",
    category: ["日語相關檢定"],
    subcategory: ["各類日語檢定"],
    level: ["A-C", "D-E", "F-G"],
    price: "付費",
    priceDetail:
      "A-C級：1400元／D-E級：1300元／F-G級：1200元；在學學生、團體或低收入戶可減免200元",
    registrationMethod: "線上",
    registrationPeriod: "全年多次；台灣每年約6回",
    target: "需要實用日語能力證明、求職或留學申請的學習者",
    strengths: [
      "一年舉辦多次，報考彈性較高",
      "可直接取得較細的成績資訊",
      "重視實際生活與職場日語",
      "日本部分大學及企業採認",
    ],
    weaknesses: [
      "台灣普及度與知名度不如JLPT",
      "級別制度與JLPT不同，兩者不能直接視為完全等同",
      "若申請特定日本大學，仍需確認校方是否接受J.TEST",
    ],
    tags: ["J.TEST", "檢定", "實用日語", "日本留學", "考試"],
  },
  {
    id: "jft-basic",
    name: "JFT-Basic 日本語基礎テスト",
    officialUrl: "https://www.jpf.go.jp/jft-basic/",
    category: ["日語相關檢定"],
    subcategory: ["各類日語檢定"],
    level: ["A1", "A2.1", "A2.2", "B1"],
    price: "付費",
    priceDetail: "依報考國家而異；台灣目前沒有固定的 JFT-Basic 台灣考場與報名費",
    registrationMethod: "線上 CBT 預約",
    registrationPeriod: "一年多個考試期間，依各期公告報名",
    target: "希望證明日常生活與基本溝通日語能力，尤其是以赴日工作為目的的學習者",
    strengths: [
      "採 CBT 電腦測驗，考試期間較多",
      "重視實際生活中的日語溝通能力",
      "可判定 CEFR A1～B1 等級",
      "是日本特定技能制度所使用的日語能力測驗之一",
    ],
    weaknesses: [
      "主要定位不是日本大學一般入學用的日語檢定",
      "台灣目前不是主要舉辦國家，因此台灣考生報考選擇有限",
      "如果是日本大學申請，仍需確認校方是否接受 JFT-Basic",
    ],
    tags: ["JFT-Basic", "JFT", "日本語", "檢定", "CBT", "特定技能", "CEFR"],
  },
  {
    id: "sigure",
    name: "時雨の町",
    officialUrl: "https://www.sigure.tw",
    category: ["日語學習"],
    subcategory: ["學習工具"],
    level: ["N5", "N4", "N3", "N2", "N1"],
    price: "部分免費",
    priceDetail: "題庫及部分特定文章需付費",
    target: "想完全自學且確定不會轉換其他學習平台的使用者",
    strengths: ["解說清楚", "網站可視性高"],
    weaknesses: [
      "體系與市面教材較不同，若之後想轉回其他平台或實體教材較困難",
    ],
    tags: ["時雨の町", "自學", "文法", "線上教材"],
  },
  {
    id: "moji-dict",
    name: "MOJi辞書",
    officialUrl: "https://www.mojidict.com",
    category: ["日語學習"],
    subcategory: ["學習工具"],
    level: ["N5", "N4", "N3", "N2", "N1"],
    price: "部分免費",
    priceDetail: "App 內購買，部分進階功能與會員服務需付費",
    target: "希望把日語字典、單字記憶、漢字辨識與閱讀工具整合在同一個 App 的繁體中文使用者",
    strengths: [
      "支援繁體中文",
      "中日互查方便",
      "支援手寫與圖片辨識",
      "動詞活用與例句資訊完整",
      "內建單字複習與艾賓浩斯遺忘曲線",
      "支援離線詞庫",
    ],
    weaknesses: [
      "部分進階功能需要付費",
      "使用者共建內容的品質可能不一致",
    ],
    tags: ["MOJi辞書", "字典", "背單字", "手寫輸入", "漢字", "翻譯"],
  },
  {
    id: "mazii",
    name: "Mazii 日語辭典",
    officialUrl: "https://mazii.net",
    category: ["日語學習"],
    subcategory: ["學習工具"],
    level: ["N5", "N4", "N3", "N2", "N1"],
    price: "部分免費",
    priceDetail: "App 內購買，Premium 與 AI Pro 等進階功能需付費",
    target: "需要繁體中文介面的日語自學者、留學生與 JLPT 考生",
    strengths: [
      "支援繁體中文",
      "字典、文法、單字與 JLPT 功能集中",
      "提供例句與發音資訊",
      "支援 AI 整句翻譯",
      "適合日常查詞與考試準備",
    ],
    weaknesses: [
      "部分進階功能需要訂閱",
      "包含廣告與使用者生成內容",
    ],
    tags: ["Mazii", "日語字典", "字典", "文法", "JLPT", "AI翻譯", "背單字"],
  },
  {
    id: "todaii",
    name: "Todaii Easy Japanese",
    officialUrl: "https://easyjapanese.net",
    category: ["日語學習"],
    subcategory: ["學習工具"],
    level: ["N5", "N4", "N3", "N2", "N1"],
    price: "部分免費",
    priceDetail: "App 內購買，高級版與部分 AI 功能需付費",
    target: "想透過日本新聞、影片、Podcast 與 JLPT 練習提升閱讀及聽力的繁體中文使用者",
    strengths: [
      "支援繁體中文",
      "以日本新聞作為閱讀素材",
      "文章可搭配單字與文法學習",
      "提供 N5-N1 JLPT 練習",
      "具備聽力、影片與 Podcast 素材",
      "提供 AI 日語會話功能",
    ],
    weaknesses: [
      "部分內容與進階功能需要付費",
      "新聞型內容對初學者可能有一定難度",
      "App 內含廣告",
    ],
    tags: ["Todaii", "新聞日語", "新聞", "閱讀", "聽力", "Podcast", "JLPT", "AI會話"],
  },
  {
    id: "migii-jlpt",
    name: "Migii JLPT",
    officialUrl: "https://migii.net",
    category: ["日語學習"],
    subcategory: ["學習工具"],
    level: ["N5", "N4", "N3", "N2", "N1"],
    price: "部分免費",
    priceDetail: "App 內購買，Premium 方案提供完整題庫與進階功能",
    target: "以 JLPT N5-N1 考試為主要目標、需要繁體中文介面的學習者",
    strengths: [
      "支援繁體中文",
      "涵蓋 N5-N1",
      "提供模擬試題與練習題",
      "可分別練習文法、漢字、閱讀與聽力",
      "能追蹤學習進度與弱項",
      "適合考前大量刷題",
    ],
    weaknesses: [
      "完整功能需要付費",
      "部分題目與解說仍需要搭配其他教材理解",
    ],
    tags: ["Migii", "JLPT", "N1", "N2", "N3", "N4", "N5", "題庫", "文法", "漢字"],
  },
  {
    id: "lingodeer",
    name: "LingoDeer",
    officialUrl: "https://www.lingodeer.com",
    category: ["日語學習"],
    subcategory: ["學習工具"],
    level: ["N5", "N4", "N3"],
    price: "部分免費",
    priceDetail: "提供免費基礎內容，完整課程與離線功能需要 Premium",
    target: "希望用繁體中文循序學習日文，從五十音一路建立文法與基礎會話能力的學習者",
    strengths: [
      "支援繁體中文",
      "課程結構清楚",
      "日文文法講解完整",
      "涵蓋五十音、漢字、詞彙與文法",
      "提供母語者錄音",
      "支援離線學習與複習",
    ],
    weaknesses: [
      "完整課程需要付費",
      "較偏向結構化課程，不適合只想自由查詢資料的人",
      "進階 JLPT 內容不如專門考試工具集中",
    ],
    tags: ["LingoDeer", "五十音", "文法", "單字", "會話", "SRS", "初學者", "系統課程"],
  },
  {
    id: "bunpo",
    name: "Bunpo",
    officialUrl: "https://bunpo.app",
    category: ["日語學習"],
    subcategory: ["學習工具"],
    level: ["N5", "N4", "N3", "N2", "N1"],
    price: "部分免費",
    priceDetail: "提供免費內容，完整課程、智慧複習與 AI 功能依方案開放",
    target: "想使用繁體中文介面、以文法和實際輸出為核心學習日語的學生",
    strengths: [
      "支援繁體中文",
      "日文課程涵蓋 N5-N1",
      "文法與單字搭配大量練習",
      "支援 SRS 間隔重複",
      "提供語音辨識與口說練習",
      "有 AI 對話與情境練習功能",
    ],
    weaknesses: [
      "完整課程需要付費",
      "部分 AI 與進階功能需要較高階方案",
      "仍屬 App 型學習，不適合取代完整教材",
    ],
    tags: ["Bunpo", "日文文法", "文法", "單字", "JLPT", "SRS", "口說", "AI", "N5-N1"],
  },
  {
    id: "anki",
    name: "Anki",
    officialUrl: "https://apps.ankiweb.net",
    category: ["日語學習"],
    subcategory: ["學習工具"],
    level: ["N5", "N4", "N3", "N2", "N1"],
    price: "部分免費",
    priceDetail: "電腦版與 AnkiWeb 免費；iPhone/iPad 使用官方 AnkiMobile 為一次付費",
    target: "希望自己建立日語單字卡、教材詞彙或 JLPT 詞彙庫，並長期使用 SRS 複習的學習者",
    strengths: [
      "SRS 間隔重複系統強大",
      "可以完全自訂單字卡",
      "支援文字、圖片、音訊等多種內容",
      "跨裝置同步",
      "適合長期累積自己的日語資料庫",
    ],
    weaknesses: [
      "初次設定比一般學習 App 複雜",
      "需要自己建立或整理牌組",
      "網路上的共享牌組品質不一定一致",
    ],
    tags: ["Anki", "SRS", "單字卡", "背單字", "記憶", "間隔重複", "記憶工具"],
  },
  {
    id: "quizlet",
    name: "Quizlet",
    officialUrl: "https://quizlet.com",
    category: ["日語學習"],
    subcategory: ["學習工具"],
    level: ["N5", "N4", "N3", "N2", "N1"],
    price: "部分免費",
    priceDetail: "提供免費單字卡與部分學習功能，進階學習模式與功能需要訂閱",
    target: "希望快速建立日語單字卡、整理學校教材或 JLPT 詞彙的繁體中文使用者",
    strengths: [
      "建立單字卡很方便",
      "支援繁體中文介面與說明",
      "可自己建立學習資料",
      "提供多種測驗與複習模式",
      "適合學校課程與自製詞彙表",
    ],
    weaknesses: [
      "進階功能需要付費",
      "使用者建立的內容品質不一",
      "相較 Anki，長期 SRS 自訂程度較低",
    ],
    tags: ["Quizlet", "單字卡", "背單字", "測驗"],
  },
  {
    id: "hinative",
    name: "HiNative",
    officialUrl: "https://hinative.com",
    category: ["日語學習"],
    subcategory: ["學習工具"],
    level: ["N3", "N2", "N1"],
    price: "部分免費",
    priceDetail: "基本問答功能免費，Premium 提供書籤、更多音聲回答等進階功能",
    target: "已具備一定日語基礎，希望向日語母語者詢問自然表達、語感與文法差異的繁體中文使用者",
    strengths: [
      "支援繁體中文",
      "可以直接向母語者提問",
      "適合確認自然說法與語感",
      "可以詢問發音、文法、詞彙與例句",
      "對 N2-N1 進階表達特別有幫助",
    ],
    weaknesses: [
      "回答來自不同使用者，正確性需要自行判斷",
      "較適合輔助學習，不適合當作唯一教材",
      "部分進階功能需要付費",
    ],
    tags: ["HiNative", "母語者", "母語者交流", "語感", "口語", "文法", "問答"],
  },
  {
    id: "nihongo-no-mori",
    name: "日本語の森",
    officialUrl: "https://nihongonomori.com",
    category: ["日語學習"],
    subcategory: ["學習工具"],
    level: ["N5", "N4", "N3", "N2", "N1"],
    price: "部分免費",
    priceDetail: "提供免費學習內容，部分課程與功能需要付費",
    target: "希望透過日文授課影片學習文法、JLPT 與實際日語表達的中高階繁體中文學習者",
    strengths: [
      "大量以日語講解日語的影片",
      "涵蓋 JLPT 不同級別",
      "適合訓練日文聽力",
      "可搭配影片理解文法與詞彙",
      "對 N3-N1 學習者特別實用",
    ],
    weaknesses: [
      "主要以日文授課，初學者可能較難",
      "App 介面並非以繁體中文為主",
      "部分內容需要付費",
    ],
    tags: ["日本語の森", "JLPT", "文法", "聽力", "影片", "影片課程", "N3-N1"],
  },
  {
    id: "u-tokyo",
    name: "東京大学",
    officialUrl: "https://www.u-tokyo.ac.jp/",
    category: ["日本留學"],
    subcategory: ["大學"],
    fields: [{ name: "文學", worldRank: null, japanRank: null }, { name: "法律", worldRank: null, japanRank: null }, { name: "經濟", worldRank: null, japanRank: null }, { name: "商管", worldRank: null, japanRank: null }, { name: "理工", worldRank: null, japanRank: null }, { name: "醫學", worldRank: null, japanRank: null }, { name: "農學", worldRank: null, japanRank: null }, { name: "藥學", worldRank: null, japanRank: null }, { name: "資訊", worldRank: null, japanRank: null }],
    qsRankings: [
      { subject: "經濟學", worldRank: "=31", japanRank: null },
      { subject: "商學／管理", worldRank: "72", japanRank: null },
      { subject: "法律", worldRank: "24", japanRank: null },
      { subject: "政治／國際關係", worldRank: "=37", japanRank: null },
      { subject: "資訊／計算機", worldRank: "41", japanRank: null },
      { subject: "AI／資料科學", worldRank: "=23", japanRank: null },
      { subject: "工程", worldRank: "18", japanRank: null },
      { subject: "數學", worldRank: "26", japanRank: null },
      { subject: "物理", worldRank: "8", japanRank: null },
      { subject: "生物科學", worldRank: "23", japanRank: null },
      { subject: "醫學", worldRank: "57", japanRank: null },
      { subject: "教育", worldRank: "59", japanRank: null },
      { subject: "現代語言", worldRank: "11", japanRank: null },
    ],
    level: "67.5～72.5",
    price: "付費",
    priceDetail: "國立大學。入學金約282,000日圓；2027年度起學部年授業料為642,960日圓。",
    target: ["頂尖大學志向", "希望進入東京", "研究型人才", "文理科皆可"],
    strengths: [
      "日本最具代表性的綜合型研究大學之一",
      "學術領域完整，文理科選擇非常多",
      "位於東京，企業、研究機構與國際交流資源集中",
    ],
    weaknesses: [
      "入試難度非常高",
      "東京生活費與住宿成本通常較高",
      "部分學科需要高度扎實的學科基礎",
    ],
    tags: ["東京大学", "東大", "國立大學", "東京", "頂尖大學", "綜合大學"],
    admissionPdfUrl: "https://www.u-tokyo.ac.jp/content/400291798.pdf",
  },
  {
    id: "kyoto-u",
    name: "京都大学",
    officialUrl: "https://www.kyoto-u.ac.jp/",
    category: ["日本留學"],
    subcategory: ["大學"],
    fields: [{ name: "文學", worldRank: null, japanRank: null }, { name: "教育", worldRank: null, japanRank: null }, { name: "法律", worldRank: null, japanRank: null }, { name: "經濟", worldRank: null, japanRank: null }, { name: "理工", worldRank: null, japanRank: null }, { name: "醫學", worldRank: null, japanRank: null }, { name: "藥學", worldRank: null, japanRank: null }, { name: "農學", worldRank: null, japanRank: null }],
    qsRankings: [
      { subject: "經濟學", worldRank: "=87", japanRank: null },
      { subject: "商學／管理", worldRank: "151-200", japanRank: null },
      { subject: "法律", worldRank: "=56", japanRank: null },
      { subject: "政治／國際關係", worldRank: "=84", japanRank: null },
      { subject: "資訊／計算機", worldRank: "=95", japanRank: null },
      { subject: "AI／資料科學", worldRank: "51-100", japanRank: null },
      { subject: "工程", worldRank: "50", japanRank: null },
      { subject: "數學", worldRank: "=58", japanRank: null },
      { subject: "物理", worldRank: "26", japanRank: null },
      { subject: "生物科學", worldRank: "49", japanRank: null },
      { subject: "醫學", worldRank: "=83", japanRank: null },
      { subject: "教育", worldRank: "=98", japanRank: null },
      { subject: "現代語言", worldRank: "25", japanRank: null },
    ],
    level: "60.0～70.0",
    price: "付費",
    priceDetail: "國立大學。入學金282,000日圓；學部年授業料535,800日圓。",
    target: ["研究型人才", "頂尖大學志向", "文理科皆可", "重視學術自由"],
    strengths: [
      "研究型大學傳統深厚",
      "人文、社會科學與自然科學領域完整",
      "京都具有強烈的歷史文化與學術氛圍",
    ],
    weaknesses: [
      "入試難度高",
      "京都部分區域住宿資源與交通需要提前規劃",
      "部分學部對數學、理科或論述能力要求高",
    ],
    tags: ["京都大学", "京大", "國立大學", "京都", "頂尖大學", "研究型大學"],
  },
  {
    id: "osaka-u",
    name: "大阪大学",
    officialUrl: "https://www.osaka-u.ac.jp/",
    category: ["日本留學"],
    subcategory: ["大學"],
    fields: [{ name: "文學", worldRank: null, japanRank: null }, { name: "人文", worldRank: null, japanRank: null }, { name: "法律", worldRank: null, japanRank: null }, { name: "經濟", worldRank: null, japanRank: null }, { name: "理工", worldRank: null, japanRank: null }, { name: "醫學", worldRank: null, japanRank: null }, { name: "藥學", worldRank: null, japanRank: null }, { name: "資訊", worldRank: null, japanRank: null }, { name: "基礎科學", worldRank: null, japanRank: null }],
    qsRankings: [
      { subject: "經濟學", worldRank: "=139", japanRank: null },
      { subject: "商學／管理", worldRank: "201-250", japanRank: null },
      { subject: "法律", worldRank: "251-300", japanRank: null },
      { subject: "資訊／計算機", worldRank: "=183", japanRank: null },
      { subject: "工程", worldRank: "=109", japanRank: null },
      { subject: "數學", worldRank: "151-200", japanRank: null },
      { subject: "醫學", worldRank: "141", japanRank: null },
      { subject: "教育", worldRank: "251-300", japanRank: null },
      { subject: "現代語言", worldRank: "64", japanRank: null },
    ],
    level: "55.0～70.0",
    price: "付費",
    priceDetail: "國立大學。入學金282,000日圓；學部年授業料535,800日圓。",
    target: ["關西地區升學", "理工科志向", "研究型人才", "醫藥相關"],
    strengths: [
      "綜合型研究大學，理工與醫學研究資源完整",
      "位於大阪，城市規模大且企業與產業資源豐富",
      "有多元的國際交流與研究環境",
    ],
    weaknesses: [
      "不同學部入試難度差異明顯",
      "部分熱門學系競爭激烈",
      "大阪都市圈的住宿成本仍需納入預算",
    ],
    tags: ["大阪大学", "阪大", "國立大學", "大阪", "關西", "理工", "醫學"],
  },
  {
    id: "hit-u",
    name: "一橋大学",
    officialUrl: "https://www.hit-u.ac.jp/",
    category: ["日本留學"],
    subcategory: ["大學"],
    fields: [{ name: "經濟", worldRank: null, japanRank: null }, { name: "商管", worldRank: null, japanRank: null }, { name: "法律", worldRank: null, japanRank: null }, { name: "社會科學", worldRank: null, japanRank: null }, { name: "社會數據科學", worldRank: null, japanRank: null }],
    qsRankings: [
      { subject: "經濟學", worldRank: "102", japanRank: null },
      { subject: "商學／管理", worldRank: "=134", japanRank: null },
      { subject: "法律", worldRank: "251-300", japanRank: null },
      { subject: "政治／國際關係", worldRank: "301-400", japanRank: null },
      { subject: "社會學", worldRank: "201-250", japanRank: null },
      { subject: "現代語言", worldRank: "251-300", japanRank: null },
    ],
    level: "65.0～72.5",
    price: "付費",
    priceDetail: "國立大學。入學金282,000日圓；2026年度起學部年授業料642,960日圓。",
    target: ["經濟", "商管", "金融", "法律", "社會科學", "商學院志向"],
    strengths: [
      "以商學、經濟、法律及社會科學見長",
      "適合希望往金融、商業、政策與企業方向發展者",
      "東京地區，企業與實習資源集中",
    ],
    weaknesses: [
      "學科領域不像綜合型大學那麼廣",
      "整體入試難度高",
      "如果想主修醫學、自然科學或工程，選擇有限",
    ],
    tags: ["一橋大学", "國立大學", "東京", "經濟", "商管", "法律"],
  },
  {
    id: "isct",
    name: "東京科学大学",
    officialUrl: "https://www.isct.ac.jp/",
    category: ["日本留學"],
    subcategory: ["大學"],
    fields: [{ name: "理工", worldRank: null, japanRank: null }, { name: "資訊", worldRank: null, japanRank: null }, { name: "數學", worldRank: null, japanRank: null }, { name: "物理", worldRank: null, japanRank: null }, { name: "化學", worldRank: null, japanRank: null }, { name: "生命科學", worldRank: null, japanRank: null }, { name: "醫學", worldRank: null, japanRank: null }, { name: "牙醫", worldRank: null, japanRank: null }, { name: "建築", worldRank: null, japanRank: null }],
    qsRankings: [
      { subject: "資訊／計算機", worldRank: "18", japanRank: "1" },
      { subject: "AI／資料科學", worldRank: "101-200", japanRank: "3" },
      { subject: "化學工程", worldRank: "=13", japanRank: "1" },
      { subject: "機械工程", worldRank: "15", japanRank: "1" },
      { subject: "土木工程", worldRank: "19", japanRank: "2" },
      { subject: "電機電子工程", worldRank: "=20", japanRank: "1" },
      { subject: "工程", worldRank: "=245", japanRank: null },
      { subject: "數學", worldRank: "37", japanRank: "2" },
      { subject: "物理", worldRank: "20", japanRank: "2" },
      { subject: "化學", worldRank: "27", japanRank: "2" },
      { subject: "材料科學", worldRank: "28", japanRank: "2" },
      { subject: "生物科學", worldRank: "64", japanRank: "3" },
      { subject: "醫學", worldRank: "=95", japanRank: "3" },
    ],
    level: "60.0～70.0",
    price: "付費",
    priceDetail: "國立大學。理工學系多數學院2027年度一般選拔ボーダー約65.0；實際學費依學系及年度公告為準。",
    target: ["理工科", "資訊", "AI", "工程", "醫療科技", "研究型人才"],
    strengths: [
      "以理工與科技研究為核心",
      "資訊、工程、生命科學等領域集中",
      "位於東京，科技企業與研究機構資源豐富",
    ],
    weaknesses: [
      "文學、法律、商學等傳統文科選擇較少",
      "理工領域課程通常數學與科學要求高",
      "部分研究型路線較適合明確想走 STEM 的學生",
    ],
    tags: ["東京科学大学", "國立大學", "東京", "理工", "資訊", "STEM"],
  },
  {
    id: "nagoya-u",
    name: "名古屋大学",
    officialUrl: "https://www.nagoya-u.ac.jp/",
    category: ["日本留學"],
    subcategory: ["大學"],
    fields: [{ name: "教育学部", worldRank: null, japanRank: null }, { name: "情報学部", worldRank: null, japanRank: null }, { name: "理学部", worldRank: null, japanRank: null }, { name: "経済学部", worldRank: null, japanRank: null }, { name: "文学部", worldRank: null, japanRank: null }, { name: "法学部", worldRank: null, japanRank: null }, { name: "医学部医学科", worldRank: null, japanRank: null }, { name: "医学部保健学科", worldRank: null, japanRank: null }, { name: "農学部", worldRank: null, japanRank: null }],
    qsRankings: [
      { subject: "物理", worldRank: "60", japanRank: "6" },
      { subject: "化學", worldRank: "=109", japanRank: "6" },
      { subject: "自然科學", worldRank: "=99", japanRank: "5" },
      { subject: "經典學／古代史", worldRank: "51-150", japanRank: "7" },
      { subject: "解剖與生理", worldRank: "101-200", japanRank: "3" },
      { subject: "發展研究", worldRank: "101-150", japanRank: "3" },
      { subject: "資訊／計算機", worldRank: "301-350", japanRank: null },
      { subject: "工程", worldRank: null, japanRank: null },
      { subject: "數學", worldRank: null, japanRank: null },
      { subject: "醫學", worldRank: null, japanRank: null },
      { subject: "教育", worldRank: "401-450", japanRank: null },
    ],
    level: "50.0～67.5",
    price: "付費",
    priceDetail: "國立大學。入學金282,000日圓；學部年授業料535,800日圓。",
    target: ["中部地區升學", "理工科", "研究型人才", "經濟商管"],
    strengths: [
      "中部地區代表性研究型大學",
      "理工、自然科學與醫學研究強",
      "名古屋生活成本相較東京通常較容易控制",
    ],
    weaknesses: [
      "學部之間入試難度差異較大",
      "部分學科在海外知名度不如東京、京都等校",
      "想追求超大型國際都市環境者可能較不符合期待",
    ],
    tags: ["名古屋大学", "國立大學", "名古屋", "中部", "理工", "醫學"],
    admissionNote:
      "2028年起，預計廢除以 EJU（日本留学試験）成績為主的入試管道，實際變動請以官方最新公告為準。",
  },
  {
    id: "tohoku-u",
    name: "東北大学",
    officialUrl: "https://www.tohoku.ac.jp/",
    category: ["日本留學"],
    subcategory: ["大學"],
    fields: [{ name: "文學", worldRank: null, japanRank: null }, { name: "教育", worldRank: null, japanRank: null }, { name: "法律", worldRank: null, japanRank: null }, { name: "經濟", worldRank: null, japanRank: null }, { name: "理工", worldRank: null, japanRank: null }, { name: "資訊", worldRank: null, japanRank: null }, { name: "醫學", worldRank: null, japanRank: null }, { name: "農學", worldRank: null, japanRank: null }],
    qsRankings: [
      { subject: "經濟學", worldRank: "401-450", japanRank: null },
      { subject: "商學／管理", worldRank: "451-500", japanRank: null },
      { subject: "法律", worldRank: "301-350", japanRank: null },
      { subject: "政治／國際關係", worldRank: "251-300", japanRank: null },
      { subject: "資訊／計算機", worldRank: "201-250", japanRank: null },
      { subject: "AI／資料科學", worldRank: "101-200", japanRank: null },
      { subject: "工程", worldRank: "89", japanRank: null },
      { subject: "數學", worldRank: "151-200", japanRank: null },
      { subject: "物理", worldRank: "46", japanRank: null },
      { subject: "生物科學", worldRank: "=175", japanRank: null },
      { subject: "醫學", worldRank: "201-250", japanRank: null },
      { subject: "教育", worldRank: "351-400", japanRank: null },
      { subject: "現代語言", worldRank: "101-150", japanRank: null },
    ],
    level: "52.5～67.5",
    price: "付費",
    priceDetail: "國立大學。入學金282,000日圓；學部年授業料535,800日圓。",
    target: ["研究型人才", "理工", "資訊", "自然科學", "希望在東北地區留學"],
    strengths: [
      "研究型大學體系完整",
      "理工、材料、資訊與自然科學領域具特色",
      "仙台是大學城型城市，學生生活圈集中",
    ],
    weaknesses: [
      "仙台的企業與實習市場規模不如東京",
      "冬季氣候對台灣學生可能需要適應",
      "部分學部入試要求仍然很高",
    ],
    tags: ["東北大学", "國立大學", "仙台", "東北", "理工", "資訊"],
  },
  {
    id: "hokudai",
    name: "北海道大学",
    officialUrl: "https://www.hokudai.ac.jp/",
    category: ["日本留學"],
    subcategory: ["大學"],
    fields: [{ name: "文學", worldRank: null, japanRank: null }, { name: "教育", worldRank: null, japanRank: null }, { name: "法律", worldRank: null, japanRank: null }, { name: "經濟", worldRank: null, japanRank: null }, { name: "理工", worldRank: null, japanRank: null }, { name: "資訊", worldRank: null, japanRank: null }, { name: "農學", worldRank: null, japanRank: null }, { name: "醫學", worldRank: null, japanRank: null }, { name: "獸醫", worldRank: null, japanRank: null }],
    qsRankings: [
      { subject: "經濟學", worldRank: "551-700", japanRank: null },
      { subject: "資訊／計算機", worldRank: "551-600", japanRank: null },
      { subject: "工程", worldRank: "=169", japanRank: null },
      { subject: "化學", worldRank: "87", japanRank: null },
      { subject: "自然科學", worldRank: "=117", japanRank: null },
      { subject: "材料科學", worldRank: "151-200", japanRank: null },
      { subject: "生物科學", worldRank: "=193", japanRank: null },
      { subject: "醫學", worldRank: "201-250", japanRank: null },
      { subject: "農林／農業", worldRank: "=93", japanRank: null },
      { subject: "現代語言", worldRank: "201-250", japanRank: null },
    ],
    level: "50.0～67.5",
    price: "付費",
    priceDetail: "國立大學。入學金282,000日圓；學部年授業料535,800日圓。",
    target: ["綜合型大學", "自然科學", "農學", "獸醫", "環境科學", "研究型人才"],
    strengths: [
      "學科領域非常完整",
      "農學、環境、生命科學與自然科學具有特色",
      "校地與校園環境寬廣",
    ],
    weaknesses: [
      "冬季寒冷且積雪較多",
      "北海道與東京、大阪相比距離主要企業聚落較遠",
      "部分學部入試難度與競爭程度差異大",
    ],
    tags: ["北海道大学", "國立大學", "北海道", "札幌", "農學", "獸醫"],
  },
  {
    id: "kyushu-u",
    name: "九州大学",
    officialUrl: "https://www.kyushu-u.ac.jp/",
    category: ["日本留學"],
    subcategory: ["大學"],
    fields: [{ name: "文學", worldRank: null, japanRank: null }, { name: "教育", worldRank: null, japanRank: null }, { name: "法律", worldRank: null, japanRank: null }, { name: "經濟", worldRank: null, japanRank: null }, { name: "商管", worldRank: null, japanRank: null }, { name: "理工", worldRank: null, japanRank: null }, { name: "資訊", worldRank: null, japanRank: null }, { name: "醫學", worldRank: null, japanRank: null }, { name: "農學", worldRank: null, japanRank: null }],
    qsRankings: [
      { subject: "資訊／計算機", worldRank: "301-350", japanRank: null },
      { subject: "工程", worldRank: "125", japanRank: null },
      { subject: "化學", worldRank: "=114", japanRank: null },
      { subject: "物理", worldRank: "151-200", japanRank: null },
    ],
    level: "52.5～67.5",
    price: "付費",
    priceDetail: "國立大學。入學金282,000日圓；學部年授業料535,800日圓。",
    target: ["九州地區升學", "研究型人才", "理工", "經濟商管", "國際化學習"],
    strengths: [
      "九州地區代表性綜合研究型大學",
      "理工、醫學與自然科學領域完整",
      "福岡具城市機能與國際交流環境",
    ],
    weaknesses: [
      "部分校區距離福岡市中心較遠",
      "不同學部入試難度差異大",
      "對希望長期留在東京求職者而言地理位置較遠",
    ],
    tags: ["九州大学", "國立大學", "福岡", "九州", "理工", "醫學"],
  },
  {
    id: "kobe-u",
    name: "神戸大学",
    officialUrl: "https://www.kobe-u.ac.jp/",
    category: ["日本留學"],
    subcategory: ["大學"],
    fields: [{ name: "文學", worldRank: null, japanRank: null }, { name: "法律", worldRank: null, japanRank: null }, { name: "經濟", worldRank: null, japanRank: null }, { name: "商管", worldRank: null, japanRank: null }, { name: "理工", worldRank: null, japanRank: null }, { name: "資訊", worldRank: null, japanRank: null }, { name: "農學", worldRank: null, japanRank: null }, { name: "醫學", worldRank: null, japanRank: null }, { name: "國際", worldRank: null, japanRank: null }],
    qsRankings: [
      { subject: "經濟學", worldRank: "=184", japanRank: null },
      { subject: "商學／管理", worldRank: "201-250", japanRank: null },
      { subject: "法律", worldRank: "301-350", japanRank: null },
      { subject: "政治／國際關係", worldRank: "301-400", japanRank: null },
      { subject: "物理", worldRank: "351-400", japanRank: null },
      { subject: "生物科學", worldRank: "401-450", japanRank: null },
      { subject: "醫學", worldRank: "451-500", japanRank: null },
      { subject: "工程", worldRank: "501-550", japanRank: null },
      { subject: "數學", worldRank: "501-600", japanRank: null },
      { subject: "現代語言", worldRank: "251-300", japanRank: null },
    ],
    level: "52.5～67.5",
    price: "付費",
    priceDetail: "國立大學。入學金282,000日圓；學部年授業料535,800日圓。",
    target: ["經濟", "商管", "法律", "國際", "理工", "關西地區升學"],
    strengths: [
      "經濟、經營與商學相關領域具有明顯特色",
      "位於神戶，兼具都市與國際城市環境",
      "文理科選擇廣泛",
    ],
    weaknesses: [
      "學部間難度落差較大",
      "部分校區位於山坡地，通學需要適應",
      "知名度與資源分布仍較集中於關西地區",
    ],
    tags: ["神戸大学", "國立大學", "神戶", "關西", "經濟", "商管"],
  },
  {
    id: "waseda",
    name: "早稻田大学",
    officialUrl: "https://www.waseda.jp/",
    category: ["日本留學"],
    subcategory: ["大學"],
    fields: [{ name: "政治", worldRank: null, japanRank: null }, { name: "經濟", worldRank: null, japanRank: null }, { name: "商管", worldRank: null, japanRank: null }, { name: "法律", worldRank: null, japanRank: null }, { name: "文學", worldRank: null, japanRank: null }, { name: "國際", worldRank: null, japanRank: null }, { name: "社會科學", worldRank: null, japanRank: null }, { name: "理工", worldRank: null, japanRank: null }, { name: "資訊", worldRank: null, japanRank: null }],
    qsRankings: [
      { subject: "管理", worldRank: "=109", japanRank: null },
      { subject: "資訊／計算機", worldRank: "=149", japanRank: null },
      { subject: "AI／資料科學", worldRank: "101-200", japanRank: null },
      { subject: "工程", worldRank: "=184", japanRank: null },
      { subject: "數學", worldRank: "151-200", japanRank: null },
      { subject: "物理", worldRank: "201-250", japanRank: null },
      { subject: "教育", worldRank: "251-300", japanRank: null },
      { subject: "現代語言", worldRank: "36", japanRank: "3" },
      { subject: "語言學", worldRank: "=92", japanRank: "4" },
      { subject: "人文科學", worldRank: "61", japanRank: "3" },
      { subject: "社會科學與管理", worldRank: "78", japanRank: "3" },
      { subject: "藝術史", worldRank: "26-50", japanRank: "2" },
    ],
    level: "62.5～70.0",
    price: "付費",
    priceDetail: "私立大學，學部差異較大。例如政治經濟學部2026年度初年度合計約1,291,900日圓。",
    target: ["東京留學", "經濟", "商管", "政治", "國際", "文科", "理工"],
    strengths: [
      "私立綜合型大學，學部選擇非常多",
      "政治經濟、商學、社會科學與國際領域完整",
      "東京地區企業、校友與實習資源豐富",
    ],
    weaknesses: [
      "學費通常高於國立大學",
      "熱門學部競爭激烈",
      "東京生活成本高",
    ],
    tags: ["早稻田大学", "早大", "私立大學", "東京", "政治經濟", "國際"],
  },
  {
    id: "keio",
    name: "慶應義塾大学",
    officialUrl: "https://www.keio.ac.jp/",
    category: ["日本留學"],
    subcategory: ["大學"],
    fields: [{ name: "經濟", worldRank: null, japanRank: null }, { name: "商管", worldRank: null, japanRank: null }, { name: "法律", worldRank: null, japanRank: null }, { name: "文學", worldRank: null, japanRank: null }, { name: "理工", worldRank: null, japanRank: null }, { name: "資訊", worldRank: null, japanRank: null }, { name: "醫學", worldRank: null, japanRank: null }, { name: "政策", worldRank: null, japanRank: null }],
    qsRankings: [
      { subject: "經濟學", worldRank: "99", japanRank: null },
      { subject: "商學／管理", worldRank: "138", japanRank: null },
      { subject: "法律", worldRank: "101-150", japanRank: null },
      { subject: "政治／國際關係", worldRank: "101-150", japanRank: null },
      { subject: "資訊／計算機", worldRank: "194", japanRank: null },
      { subject: "AI／資料科學", worldRank: "101-200", japanRank: "3" },
      { subject: "工程", worldRank: "151-200", japanRank: null },
      { subject: "生物科學", worldRank: "251-300", japanRank: null },
      { subject: "數學", worldRank: "251-300", japanRank: null },
      { subject: "物理", worldRank: "251-300", japanRank: null },
      { subject: "醫學", worldRank: "194", japanRank: null },
      { subject: "現代語言", worldRank: "83", japanRank: null },
      { subject: "社會科學與管理", worldRank: "100", japanRank: null },
    ],
    level: "57.5～72.5",
    price: "付費",
    priceDetail: "私立大學，學部差異較大。2026年度文、經濟、法、商學部學費合計約1,500,000日圓；理工學部約2,090,000日圓。",
    target: ["經濟", "商管", "金融", "法律", "理工", "資訊", "醫學"],
    strengths: [
      "私立綜合型大學，商管與經濟相關領域完整",
      "東京地區企業與校友網絡資源豐富",
      "理工、醫學與文商領域皆有完整體系",
    ],
    weaknesses: [
      "私立大學學費負擔通常高於國立",
      "不同學部入試制度與難度差異較大",
      "東京住宿與生活成本高",
    ],
    tags: ["慶應義塾大学", "慶應", "私立大學", "東京", "經濟", "商管", "醫學"],
  },
  {
    "id": "tsukuba",
    "name": "筑波大學",
    "officialUrl": "https://www.tsukuba.ac.jp/en/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "人文",
        "社會科學",
        "教育",
        "資訊",
        "理工",
        "生命科學",
        "醫學",
        "農林",
        "藝術",
        "設計",
        "體育"
    ],
    "level": "55.0～65.0",
    "price": "付費",
    "priceDetail": "2026年度國立大學學部授業料為535,800日圓，入學料282,000日圓；筑波大學已公告2027年4月1日起國際學生學費將調整，2027實際金額需再確認。",
    "target": "想就讀綜合型研究大學，並在文理、資訊、醫療、農學、藝術或體育等領域選擇的學生。",
    "strengths": [
        "學科領域非常廣，能跨領域學習。",
        "資訊、圖書資訊、運動科學、農林、生命科學等領域具有研究特色。",
        "國立大學學費相對私立大學低。"
    ],
    "weaknesses": [
        "校園位於筑波研究學園都市，東京都心通學距離較遠。",
        "不同學群的課程型態差異很大，申請前需要仔細確認各學群入試制度。"
    ],
    "tags": [
        "國立",
        "研究型大學",
        "綜合大學",
        "資訊",
        "理工",
        "醫學",
        "農學",
        "藝術",
        "體育"
    ],
    "qsRankings": [
        {
            "subject": "圖書資訊",
            "worldRank": "20",
            "japanRank": null
        },
        {
            "subject": "運動科學",
            "worldRank": "51-100",
            "japanRank": null
        },
        {
            "subject": "藝術與設計",
            "worldRank": "101-150",
            "japanRank": null
        },
        {
            "subject": "農林",
            "worldRank": "101-150",
            "japanRank": null
        },
        {
            "subject": "解剖與生理",
            "worldRank": "101-200",
            "japanRank": null
        },
        {
            "subject": "語言學",
            "worldRank": "151-200",
            "japanRank": null
        },
        {
            "subject": "地球科學",
            "worldRank": "151-200",
            "japanRank": null
        },
        {
            "subject": "地理",
            "worldRank": "201-250",
            "japanRank": null
        },
        {
            "subject": "生物科學",
            "worldRank": "201-250",
            "japanRank": null
        },
        {
            "subject": "教育",
            "worldRank": "251-300",
            "japanRank": null
        },
        {
            "subject": "化學",
            "worldRank": "251-300",
            "japanRank": null
        },
        {
            "subject": "材料科學",
            "worldRank": "251-300",
            "japanRank": null
        },
        {
            "subject": "化學工程",
            "worldRank": "301-350",
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": "301-350",
            "japanRank": null
        },
        {
            "subject": "環境科學",
            "worldRank": "351-400",
            "japanRank": null
        },
        {
            "subject": "醫學",
            "worldRank": "401-450",
            "japanRank": null
        },
        {
            "subject": "數學",
            "worldRank": "451-500",
            "japanRank": null
        },
        {
            "subject": "經濟學",
            "worldRank": "501-550",
            "japanRank": null
        },
        {
            "subject": "商學與管理",
            "worldRank": "551-600",
            "japanRank": null
        },
        {
            "subject": "法律",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "心理學",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "tus",
    "name": "東京理科大學",
    "officialUrl": "https://www.tus.ac.jp/en/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "理學",
        "資訊",
        "工程",
        "建築",
        "生命科學",
        "藥學",
        "商管"
    ],
    "level": "42.5～62.5",
    "price": "付費",
    "priceDetail": "私立大學，各學部學費與實習費不同；初年度納付金依學部而異，部分理工及藥學相關學科較高。",
    "target": "想以理工、資訊、數學、化學、生命或藥學為主，並希望在東京就讀的學生。",
    "strengths": [
        "理工與自然科學相關學科非常完整。",
        "資訊、數學、物理、化學、工程及藥學都有專門教育。",
        "東京地區企業與研究機構資源方便。"
    ],
    "weaknesses": [
        "私立學費明顯高於國立大學。",
        "理工科課程學習量通常較大。",
        "不同學部校區分布不同。"
    ],
    "tags": [
        "私立",
        "理工",
        "資訊",
        "數學",
        "物理",
        "化學",
        "藥學"
    ],
    "qsRankings": [
        {
            "subject": "物理",
            "worldRank": "351-400",
            "japanRank": null
        },
        {
            "subject": "機械／製造工程",
            "worldRank": "401-450",
            "japanRank": null
        },
        {
            "subject": "材料科學",
            "worldRank": "401-550",
            "japanRank": null
        },
        {
            "subject": "化學",
            "worldRank": "451-500",
            "japanRank": null
        },
        {
            "subject": "數學",
            "worldRank": "501-600",
            "japanRank": null
        },
        {
            "subject": "生物科學",
            "worldRank": "601-650",
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "電機電子",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "醫學",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "sophia",
    "name": "上智大學",
    "officialUrl": "https://www.sophia.ac.jp/eng/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "文學",
        "外語",
        "語言學",
        "國際關係",
        "社會學",
        "經濟",
        "商管",
        "法律",
        "理工"
    ],
    "level": "52.5～70.0",
    "price": "付費",
    "priceDetail": "私立大學，各學部學費不同；2026年度學費依學部、課程而異。",
    "target": "適合喜歡外語、國際關係、人文社會科學，或希望在東京接受國際化教育的學生。",
    "strengths": [
        "外語、語言學、國際關係等領域具有特色。",
        "位於東京四谷，交通與都市資源便利。",
        "國際學生與海外交流環境相對完整。"
    ],
    "weaknesses": [
        "私立大學學費高於國立大學。",
        "部分熱門學部偏差值較高。",
        "校園規模相對集中，不像大型綜合國立大學有多個廣大校區。"
    ],
    "tags": [
        "私立",
        "東京",
        "外語",
        "國際關係",
        "語言學",
        "人文",
        "社會科學"
    ],
    "qsRankings": [
        {
            "subject": "語言學",
            "worldRank": "151-200",
            "japanRank": null
        },
        {
            "subject": "現代語言",
            "worldRank": "151-200",
            "japanRank": null
        },
        {
            "subject": "政治／國際關係",
            "worldRank": "251-300",
            "japanRank": null
        },
        {
            "subject": "社會學",
            "worldRank": "301-375",
            "japanRank": null
        },
        {
            "subject": "人文科學",
            "worldRank": "352",
            "japanRank": null
        },
        {
            "subject": "經濟學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "商學與管理",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "法律",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "tufs",
    "name": "東京外國語大學",
    "officialUrl": "https://www.tufs.ac.jp/english/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "外語",
        "語言學",
        "文學",
        "國際關係",
        "政治",
        "社會科學"
    ],
    "level": "57.5～62.5",
    "price": "付費",
    "priceDetail": "國立大學，2026年度學部授業料535,800日圓／年，入學料282,000日圓。",
    "target": "適合想專攻外語、語言、區域研究、國際關係，並希望未來從事國際交流或跨國相關工作的學生。",
    "strengths": [
        "外語及語言相關領域特色非常鮮明。",
        "國際關係與區域研究具有明確定位。",
        "國立大學學費相對私立低。"
    ],
    "weaknesses": [
        "學科特色集中在人文、語言及國際相關領域。",
        "理工與自然科學選擇較少。"
    ],
    "tags": [
        "國立",
        "外語",
        "語言",
        "國際關係",
        "區域研究"
    ],
    "qsRankings": [
        {
            "subject": "語言學",
            "worldRank": "101-150",
            "japanRank": null
        },
        {
            "subject": "現代語言",
            "worldRank": "101-150",
            "japanRank": null
        },
        {
            "subject": "人文科學",
            "worldRank": "451-500",
            "japanRank": null
        },
        {
            "subject": "政治／國際關係",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "經濟學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "社會學",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "chiba",
    "name": "千葉大學",
    "officialUrl": "https://www.chiba-u.jp/e/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "人文",
        "法政經",
        "理學",
        "工程",
        "資訊",
        "園藝",
        "醫學",
        "藥學",
        "看護",
        "藝術",
        "設計"
    ],
    "level": "45.0～72.5",
    "price": "付費",
    "priceDetail": "國立大學；2026年度學費依國立大學標準為535,800日圓／年，入學料282,000日圓。2027年度金額仍應以最新招生資訊確認。",
    "target": "適合想在國立綜合大學中跨文理、醫學、藥學、工程與設計等領域選擇的學生。",
    "strengths": [
        "學科種類多元。",
        "醫學、藥學、工程、園藝與設計等領域都有完整教育體系。",
        "位於千葉，距東京較近。"
    ],
    "weaknesses": [
        "校區較分散。",
        "不同學部的校園與課程特色差異明顯。"
    ],
    "tags": [
        "國立",
        "綜合大學",
        "醫學",
        "藥學",
        "工程",
        "設計",
        "園藝"
    ],
    "qsRankings": [
        {
            "subject": "藝術與設計",
            "worldRank": "98",
            "japanRank": null
        },
        {
            "subject": "農林",
            "worldRank": "251-300",
            "japanRank": null
        },
        {
            "subject": "藥學",
            "worldRank": "351-400",
            "japanRank": null
        },
        {
            "subject": "醫學",
            "worldRank": "451-500",
            "japanRank": null
        },
        {
            "subject": "化學",
            "worldRank": "451-500",
            "japanRank": null
        },
        {
            "subject": "物理",
            "worldRank": "451-500",
            "japanRank": null
        },
        {
            "subject": "生物科學",
            "worldRank": "501-550",
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "工程",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "數學",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "hiroshima",
    "name": "廣島大學",
    "officialUrl": "https://www.hiroshima-u.ac.jp/en/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "文學",
        "教育",
        "法學",
        "經濟",
        "理學",
        "工程",
        "資訊",
        "醫學",
        "牙醫",
        "藥學",
        "農學",
        "環境"
    ],
    "level": "45.0～65.0",
    "price": "付費",
    "priceDetail": "2026年度學部授業料535,800日圓／年、入學料282,000日圓。2027年度請以最新招生公告為準。",
    "target": "適合希望進入綜合型國立研究大學，並在教育、醫療、理工、人文或農學領域發展的學生。",
    "strengths": [
        "綜合型研究大學，學科選擇廣。",
        "教育、牙醫、石油工程、農林、物理、語言學等領域具有 QS 2026 表現。",
        "國立大學學費相對低。"
    ],
    "weaknesses": [
        "主要校區位於東廣島，與東京、大阪等大城市距離較遠。",
        "不同學部的學習環境與入試難度差異大。"
    ],
    "tags": [
        "國立",
        "研究型大學",
        "教育",
        "醫學",
        "牙醫",
        "理工",
        "農學"
    ],
    "qsRankings": [
        {
            "subject": "牙醫",
            "worldRank": "51-150",
            "japanRank": "=2"
        },
        {
            "subject": "石油工程",
            "worldRank": "101-150",
            "japanRank": "=3"
        },
        {
            "subject": "農林",
            "worldRank": "251-300",
            "japanRank": "=9"
        },
        {
            "subject": "教育",
            "worldRank": "251-300",
            "japanRank": "=3"
        },
        {
            "subject": "語言學",
            "worldRank": "251-300",
            "japanRank": "=10"
        },
        {
            "subject": "物理",
            "worldRank": "251-300",
            "japanRank": "=11"
        },
        {
            "subject": "社會學",
            "worldRank": "301-375",
            "japanRank": "=9"
        },
        {
            "subject": "環境科學",
            "worldRank": "401-450",
            "japanRank": "9"
        },
        {
            "subject": "數學",
            "worldRank": "401-450",
            "japanRank": "11"
        },
        {
            "subject": "醫學",
            "worldRank": "401-450",
            "japanRank": "=10"
        },
        {
            "subject": "化學",
            "worldRank": "451-500",
            "japanRank": null
        },
        {
            "subject": "工程",
            "worldRank": "451-500",
            "japanRank": null
        },
        {
            "subject": "電機電子",
            "worldRank": "451-500",
            "japanRank": null
        },
        {
            "subject": "機械工程",
            "worldRank": "451-500",
            "japanRank": null
        },
        {
            "subject": "生物科學",
            "worldRank": "351-400",
            "japanRank": null
        },
        {
            "subject": "經濟學",
            "worldRank": "551-700",
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "kanazawa",
    "name": "金澤大學",
    "officialUrl": "https://www.kanazawa-u.ac.jp/en/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "人文",
        "法學",
        "經濟",
        "理學",
        "工程",
        "資訊",
        "醫學",
        "藥學",
        "生命科學"
    ],
    "level": "47.5～65.0",
    "price": "付費",
    "priceDetail": "國立大學；官方公布本科入學料282,000日圓、授業料535,800日圓／年。實際入學年度若調整，以最新公告為準。",
    "target": "適合想就讀北陸地區國立綜合大學，並對醫藥、理工、人文與自然科學有興趣的學生。",
    "strengths": [
        "醫學與自然科學研究基礎完整。",
        "國立大學學費相對低。",
        "金澤具有傳統文化與地方城市生活特色。"
    ],
    "weaknesses": [
        "位於北陸地區，與東京、大阪等地交通距離較長。",
        "冬季降雪量較大，需要適應當地氣候。"
    ],
    "tags": [
        "國立",
        "北陸",
        "醫學",
        "理工",
        "生命科學"
    ],
    "qsRankings": [
        {
            "subject": "醫學",
            "worldRank": "501-550",
            "japanRank": null
        },
        {
            "subject": "化學",
            "worldRank": "551-600",
            "japanRank": null
        },
        {
            "subject": "物理",
            "worldRank": "601-675",
            "japanRank": null
        },
        {
            "subject": "生物科學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "工程",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "okayama",
    "name": "岡山大學",
    "officialUrl": "https://www.okayama-u.ac.jp/eng/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "文學",
        "法學",
        "經濟",
        "理學",
        "工程",
        "資訊",
        "醫學",
        "牙醫",
        "農學",
        "生命科學"
    ],
    "level": "50.0～65.0",
    "price": "付費",
    "priceDetail": "截至2026年6月，岡山大學學部授業料535,800日圓／年、入學料282,000日圓；學校已表示2027年度學費調整政策將於2027年1月左右公布詳細內容。",
    "target": "適合想就讀日本國立綜合型研究大學，並希望在醫學、牙醫、農學、理工或人文社會領域發展的學生。",
    "strengths": [
        "醫療、牙醫、農學與自然科學領域完整。",
        "位於岡山市，生活機能與交通相對方便。",
        "國立大學學費相對低。"
    ],
    "weaknesses": [
        "國際知名度通常不如東京、京都等最頂尖國立大學。",
        "部分學科對留學生的入試制度需要單獨確認。"
    ],
    "tags": [
        "國立",
        "醫學",
        "牙醫",
        "農學",
        "理工",
        "綜合大學"
    ],
    "qsRankings": [
        {
            "subject": "牙醫",
            "worldRank": "51-150",
            "japanRank": null
        },
        {
            "subject": "農林",
            "worldRank": "301-350",
            "japanRank": null
        },
        {
            "subject": "生命科學與醫學",
            "worldRank": "501-550",
            "japanRank": null
        },
        {
            "subject": "生物科學",
            "worldRank": "501-550",
            "japanRank": null
        },
        {
            "subject": "醫學",
            "worldRank": "551-600",
            "japanRank": null
        },
        {
            "subject": "化學",
            "worldRank": "601-700",
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "工程",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "數學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "物理",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "kumamoto",
    "name": "熊本大學",
    "officialUrl": "https://www.kumamoto-u.ac.jp/eng/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "文學",
        "法學",
        "理學",
        "工程",
        "資訊",
        "醫學",
        "藥學",
        "保健"
    ],
    "level": "47.5～62.5",
    "price": "付費",
    "priceDetail": "熊本大學已正式公告自2027年度起，學部與學環授業料由535,800日圓提高至594,600日圓／年，2027年度全學年學生一併適用。",
    "target": "適合希望以國立大學學費就讀醫學、藥學、理工與人文領域，並對九州地區生活有興趣的學生。",
    "strengths": [
        "醫學與藥學等生命醫學相關領域完整。",
        "國立大學。",
        "九州地區主要研究型大學之一。"
    ],
    "weaknesses": [
        "2027年度起學費高於多數傳統國立大學標準。",
        "位於熊本，距東京、大阪等主要都市較遠。"
    ],
    "tags": [
        "國立",
        "九州",
        "醫學",
        "藥學",
        "理工"
    ],
    "qsRankings": [
        {
            "subject": "醫學",
            "worldRank": "701-850",
            "japanRank": null
        },
        {
            "subject": "藥學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "生物科學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "化學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "工程",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "tuat",
    "name": "東京農工大學",
    "officialUrl": "https://www.tuat.ac.jp/en/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "農學",
        "生物",
        "生命科學",
        "環境",
        "工程",
        "資訊",
        "化學",
        "機械"
    ],
    "level": "52.5～70.0",
    "price": "付費",
    "priceDetail": "國立大學；學部授業料535,800日圓／年、入學料282,000日圓。",
    "target": "適合對農學、食品、生物、環境、機械、資訊與生命科學有興趣，且希望在東京圈就讀國立大學的學生。",
    "strengths": [
        "農林相關研究在 QS 2026 位居世界第41、全日本第1。",
        "農學與工學兩大領域高度集中。",
        "位於東京地區，研究與企業資源方便。"
    ],
    "weaknesses": [
        "學科方向比較集中於農工與自然科學。",
        "人文、法律、商管類選擇較少。"
    ],
    "tags": [
        "國立",
        "農學",
        "工學",
        "生命科學",
        "環境",
        "資訊"
    ],
    "qsRankings": [
        {
            "subject": "農林",
            "worldRank": "=41",
            "japanRank": "1"
        },
        {
            "subject": "生物科學",
            "worldRank": "501-550",
            "japanRank": null
        },
        {
            "subject": "環境科學",
            "worldRank": "501-550",
            "japanRank": null
        },
        {
            "subject": "化學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "材料科學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "機械工程",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "電機電子",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "ritsumeikan",
    "name": "立命館大學",
    "officialUrl": "https://en.ritsumei.ac.jp/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "文學",
        "法學",
        "政治",
        "經濟",
        "商管",
        "國際關係",
        "社會學",
        "資訊",
        "理工",
        "生命科學",
        "心理學",
        "政策",
        "體育",
        "映像"
    ],
    "level": "50.0～67.5",
    "price": "付費",
    "priceDetail": "2027年度學費依學部差異很大。例如法學部1,147,200日圓、經濟1,185,800日圓、經營1,147,200日圓、情報理工1,801,600日圓、映像學部2,120,400日圓；國際關係與生命科學等學部也有不同費用。",
    "target": "適合希望選擇關西私立大學，並在商管、經濟、國際關係、資訊、理工、人文或心理等領域就讀的學生。",
    "strengths": [
        "學科種類非常多元。",
        "經濟、政治、地理、古典、社會學、資訊等領域都有 QS 2026 上榜。",
        "京都與滋賀等地具有多個校區與國際教育資源。"
    ],
    "weaknesses": [
        "私立大學，理工與映像等學部學費較高。",
        "不同學部與校區差異很大。",
        "大學規模大，選擇多的同時也需要花時間比較課程。"
    ],
    "tags": [
        "私立",
        "關西",
        "京都",
        "經濟",
        "商管",
        "國際關係",
        "資訊",
        "理工",
        "心理"
    ],
    "qsRankings": [
        {
            "subject": "古典／古代史",
            "worldRank": "44",
            "japanRank": "3"
        },
        {
            "subject": "考古學",
            "worldRank": "201-260",
            "japanRank": "7"
        },
        {
            "subject": "政治／國際關係",
            "worldRank": "151-200",
            "japanRank": "5"
        },
        {
            "subject": "地理",
            "worldRank": "151-200",
            "japanRank": "6"
        },
        {
            "subject": "社會學",
            "worldRank": "251-300",
            "japanRank": "8"
        },
        {
            "subject": "現代語言",
            "worldRank": "251-300",
            "japanRank": "13"
        },
        {
            "subject": "經濟學",
            "worldRank": "451-500",
            "japanRank": "13"
        },
        {
            "subject": "資訊／計算機",
            "worldRank": "501-550",
            "japanRank": "12"
        },
        {
            "subject": "機械／航空／製造工程",
            "worldRank": "501-575",
            "japanRank": "15"
        },
        {
            "subject": "商學與管理",
            "worldRank": "501-550",
            "japanRank": "13"
        },
        {
            "subject": "教育",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "心理學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "法律",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "物理",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "電機電子",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "藝術與人文",
            "worldRank": "333",
            "japanRank": "8"
        },
        {
            "subject": "社會科學與管理",
            "worldRank": "451-500",
            "japanRank": "13"
        }
    ]
},
  {
    "id": "doshisha",
    "name": "同志社大學",
    "officialUrl": "https://www.doshisha.ac.jp/english/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "神學",
        "文學",
        "社會學",
        "法學",
        "經濟",
        "商學",
        "政策",
        "國際",
        "理工",
        "生命醫學",
        "心理學",
        "運動"
    ],
    "level": "55.0～62.5",
    "price": "付費",
    "priceDetail": "2027年度各學部學費不同。例如神學部第一年總額約1,196,000日圓、文學部約1,202,000～1,204,000日圓、社會學部約1,203,000日圓；理工等學部會更高。",
    "target": "適合想在京都的私立大學就讀，並對文學、社會、法律、經濟、商學、國際、理工或生命科學有興趣的學生。",
    "strengths": [
        "京都老牌私立綜合大學，學科選擇多。",
        "文學、社會、經濟、法律、商學與理工都有完整學部。",
        "京都的文化與城市環境適合希望體驗日本傳統文化的學生。"
    ],
    "weaknesses": [
        "私立學費高於國立大學。",
        "QS 2026 的細分學科上榜數量比立命館等部分大型私立少。",
        "部分熱門學部競爭較高。"
    ],
    "tags": [
        "私立",
        "京都",
        "文學",
        "法學",
        "經濟",
        "商學",
        "國際",
        "理工"
    ],
    "qsRankings": [
        {
            "subject": "英文語言與文學",
            "worldRank": "251-300",
            "japanRank": null
        },
        {
            "subject": "語言學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "心理學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "工程",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "經濟學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "商學與管理",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "法律",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "tokyo-gakugei",
    "name": "東京學藝大學",
    "officialUrl": "https://www.u-gakugei.ac.jp/english/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "教育",
        "文學",
        "心理學",
        "社會科學",
        "語言",
        "藝術",
        "理學",
        "資訊"
    ],
    "level": "47.5～60.0",
    "price": "付費",
    "priceDetail": "國立大學。授業料535,800日圓／年、入學料282,000日圓；實際入學年度若有調整，以最新官方公告為準。",
    "target": "想以教育學、教職培養、心理、人文、語言與相關領域為主要發展方向的學生。",
    "strengths": [
        "日本代表性的教育類國立大學。",
        "教育、教師培育與人文相關領域特色鮮明。",
        "位於東京，交通與實習資源方便。"
    ],
    "weaknesses": [
        "學科特色高度集中在人文與教育領域。",
        "純理工、商管等選擇較少。"
    ],
    "tags": [
        "國立",
        "教育",
        "教師培育",
        "東京",
        "人文",
        "心理"
    ],
    "qsRankings": [
        {
            "subject": "教育",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "文學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "語言學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "現代語言",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "心理學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "社會學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "政治／國際關係",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "數學",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "uec-tokyo",
    "name": "電氣通信大學",
    "officialUrl": "https://www.uec.ac.jp/eng/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "資訊",
        "人工智慧",
        "電機電子",
        "通訊",
        "工程",
        "數學",
        "物理",
        "機械"
    ],
    "level": "55.0～57.5",
    "price": "付費",
    "priceDetail": "2026年度起學士課程日間部授業料改為642,960日圓／年；入學料282,000日圓。",
    "target": "適合想專攻資訊、AI、電機、電子、通訊與理工技術的學生。",
    "strengths": [
        "日本國立大學中高度專注資訊與理工領域。",
        "AI、資訊、通訊與電子工程方向很明確。",
        "位於東京，科技與企業資源豐富。"
    ],
    "weaknesses": [
        "人文、法律、商管等領域選擇非常少。",
        "理工科課程比重高。"
    ],
    "tags": [
        "國立",
        "東京",
        "資訊",
        "AI",
        "電機",
        "電子",
        "通訊"
    ],
    "qsRankings": [
        {
            "subject": "物理",
            "worldRank": "601-675",
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "電機電子",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "通訊工程",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "工程",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "數學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "材料科學",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "ynu",
    "name": "橫濱國立大學",
    "officialUrl": "https://www.ynu.ac.jp/english/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "經濟",
        "經營",
        "都市科學",
        "工程",
        "理學",
        "教育",
        "資訊"
    ],
    "level": "55.0～67.5",
    "price": "付費",
    "priceDetail": "2026年度官方學費以學校最新公告為準；經濟、經營、都市科學與理工等學部費用需依入學年度確認。",
    "target": "適合想在東京圈就讀國立大學，並對經濟、經營、都市規劃、工程及理工有興趣的學生。",
    "strengths": [
        "經濟、經營與都市科學具有明確特色。",
        "位於橫濱，與東京企業與研究機構距離近。",
        "國立大學。"
    ],
    "weaknesses": [
        "學科數量比大型綜合國立大學少。",
        "部分熱門經濟與都市相關領域競爭較高。"
    ],
    "tags": [
        "國立",
        "橫濱",
        "經濟",
        "經營",
        "都市科學",
        "工程"
    ],
    "qsRankings": [
        {
            "subject": "物理",
            "worldRank": "551-600",
            "japanRank": null
        },
        {
            "subject": "經濟學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "商學與管理",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "工程",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "材料科學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "化學",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "saitama",
    "name": "埼玉大學",
    "officialUrl": "https://en.saitama-u.ac.jp/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "教養",
        "經濟",
        "教育",
        "理學",
        "工學",
        "資訊"
    ],
    "level": "47.5～60.0",
    "price": "付費",
    "priceDetail": "2026年4月以後入學者授業料年額642,960日圓，入學料282,000日圓。",
    "target": "適合想在埼玉、東京圈以相對合理成本就讀國立大學，並選擇文理科系的學生。",
    "strengths": [
        "位於首都圈，與東京連結方便。",
        "教育、經濟、理工與教養領域都有選擇。",
        "國立大學。"
    ],
    "weaknesses": [
        "國際知名度通常不如東京大學、東京科學大學等。",
        "QS 2026 細分學科排名較少。"
    ],
    "tags": [
        "國立",
        "首都圈",
        "經濟",
        "教育",
        "理工",
        "資訊"
    ],
    "qsRankings": [
        {
            "subject": "經濟學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "工程",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "數學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "物理",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "化學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "教育",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "shinshu",
    "name": "信州大學",
    "officialUrl": "https://www.shinshu-u.ac.jp/english/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "人文",
        "教育",
        "經濟",
        "理學",
        "工學",
        "纖維",
        "農學",
        "醫學"
    ],
    "level": "45.0～62.5",
    "price": "付費",
    "priceDetail": "國立大學；授業料535,800日圓／年，入學料282,000日圓。",
    "target": "適合希望選擇國立綜合大學，並對材料、纖維、工學、自然科學、農學或醫學有興趣的學生。",
    "strengths": [
        "材料、纖維、化學與理工研究具有特色。",
        "學科涵蓋文理與醫療。",
        "國立大學學費相對低。"
    ],
    "weaknesses": [
        "校區分布於長野縣不同地區。",
        "冬季生活環境需要適應。"
    ],
    "tags": [
        "國立",
        "長野",
        "材料",
        "纖維",
        "工程",
        "農學",
        "醫學"
    ],
    "qsRankings": [
        {
            "subject": "材料科學",
            "worldRank": "401-550",
            "japanRank": null
        },
        {
            "subject": "化學",
            "worldRank": "601-700",
            "japanRank": null
        },
        {
            "subject": "物理",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "工程",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "機械工程",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "生物科學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "醫學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "農林",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "mie",
    "name": "三重大學",
    "officialUrl": "https://www.mie-u.ac.jp/en/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "人文",
        "法經",
        "教育",
        "工學",
        "資訊",
        "生物資源",
        "醫學",
        "看護"
    ],
    "level": "45.0～65.0",
    "price": "付費",
    "priceDetail": "國立大學；2026年度學部學生授業料535,800日圓／年、入學料282,000日圓。",
    "target": "適合希望就讀地方國立綜合大學，並對醫學、工學、生物資源、教育或人文社會領域有興趣的學生。",
    "strengths": [
        "醫學部特色明確。",
        "工學與生物資源學具有地方產業連結。",
        "學科領域完整。"
    ],
    "weaknesses": [
        "國際知名度較東京、大阪等頂尖大學低。",
        "地理位置不如名古屋、東京等大城市便利。"
    ],
    "tags": [
        "國立",
        "三重",
        "醫學",
        "工學",
        "生物資源",
        "教育"
    ],
    "qsRankings": [
        {
            "subject": "醫學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "工學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "生物科學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "農林",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "教育",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "shiga",
    "name": "滋賀大學",
    "officialUrl": "https://www.shiga-u.ac.jp/english/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "經濟",
        "商管",
        "資料科學",
        "教育"
    ],
    "level": "45.0～57.5",
    "price": "付費",
    "priceDetail": "2027年度入學者授業料535,800日圓／年、入學料282,000日圓。",
    "target": "特別適合想讀經濟、商業與資料科學，並希望進入國立大學的學生。",
    "strengths": [
        "日本較早設立資料科學專門學部的大學之一。",
        "經濟學部歷史悠久。",
        "國立大學學費相對低。"
    ],
    "weaknesses": [
        "學科種類比大型綜合大學少。",
        "理工與醫學領域選擇有限。"
    ],
    "tags": [
        "國立",
        "經濟",
        "商管",
        "資料科學",
        "教育"
    ],
    "qsRankings": [
        {
            "subject": "經濟學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "商學與管理",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "資料科學與AI",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "教育",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "nagasaki",
    "name": "長崎大學",
    "officialUrl": "https://www.nagasaki-u.ac.jp/en/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "多文化",
        "教育",
        "經濟",
        "醫學",
        "牙醫",
        "藥學",
        "工學",
        "水產",
        "環境"
    ],
    "level": "42.5～65.0",
    "price": "付費",
    "priceDetail": "國立大學；2026年度學部授業料267,900日圓／學期，即年額535,800日圓。",
    "target": "適合想在九州就讀醫學、牙醫、藥學、海洋、水產、多文化或國際相關領域的學生。",
    "strengths": [
        "醫學、牙醫、藥學與健康科學領域完整。",
        "多文化社會學部具有國際特色。",
        "長崎具有特殊的國際交流與歷史背景。"
    ],
    "weaknesses": [
        "位於九州西部，距東京、大阪較遠。",
        "不同學部的國際學生入試差異較大。"
    ],
    "tags": [
        "國立",
        "九州",
        "醫學",
        "牙醫",
        "藥學",
        "多文化",
        "水產"
    ],
    "qsRankings": [
        {
            "subject": "醫學",
            "worldRank": "451-500",
            "japanRank": null
        },
        {
            "subject": "牙醫",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "公共衛生",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "感染症",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "藥學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "工程",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "化學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "環境科學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "社會科學",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "kagoshima",
    "name": "鹿兒島大學",
    "officialUrl": "https://www.kagoshima-u.ac.jp/english/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "法文",
        "教育",
        "理學",
        "工學",
        "農學",
        "水產",
        "獸醫",
        "醫學",
        "牙醫"
    ],
    "level": "40.0～62.5",
    "price": "付費",
    "priceDetail": "2026年度學部授業料535,800日圓／年、入學料282,000日圓；若在校期間調整學費，適用新額度。",
    "target": "適合希望在九州綜合型國立大學，尤其是農學、獸醫、水產、醫學與自然科學領域發展的學生。",
    "strengths": [
        "農林水產與獸醫相關特色明顯。",
        "九州南部地區的地方研究與產業連結強。",
        "醫學與自然科學領域完整。"
    ],
    "weaknesses": [
        "位於鹿兒島，離日本主要都市較遠。",
        "部分學科的國際招生資訊較分散，需要仔細確認。"
    ],
    "tags": [
        "國立",
        "九州",
        "農學",
        "獸醫",
        "水產",
        "醫學"
    ],
    "qsRankings": [
        {
            "subject": "農林／水產／獸醫",
            "worldRank": "401-475",
            "japanRank": null
        },
        {
            "subject": "醫學",
            "worldRank": "701-850",
            "japanRank": null
        },
        {
            "subject": "獸醫",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "農學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "水產",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "工程",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "理學",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "kwansei-gakuin",
    "name": "關西學院大學",
    "officialUrl": "https://www.kwansei.ac.jp/en/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "文學",
        "神學",
        "社會學",
        "法學",
        "經濟",
        "商學",
        "國際",
        "教育",
        "理工",
        "建築",
        "人文"
    ],
    "level": "50.0～67.5",
    "price": "付費",
    "priceDetail": "私立大學，各學部學費不同；官方部分英語課程2026入學者的授業料為1,028,000日圓／年，另有Enhancement Fee等費用。2027年度部分學費仍以學部公告為準。",
    "target": "適合希望在關西私立大學就讀，並偏好國際、商管、經濟、社會或人文領域的學生。",
    "strengths": [
        "關西地區知名私立綜合大學。",
        "英語授課與國際教育資源較豐富。",
        "商學、經濟、國際與社會科學選擇多。"
    ],
    "weaknesses": [
        "私立學費高於國立大學。",
        "QS 2026 細分學科排名沒有形成明顯優勢。"
    ],
    "tags": [
        "私立",
        "關西",
        "商學",
        "經濟",
        "國際",
        "社會",
        "文學"
    ],
    "qsRankings": [
        {
            "subject": "經濟學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "商學與管理",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "政治／國際關係",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "社會學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "法律",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "現代語言",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "教育",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "工程",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "aoyama-gakuin",
    "name": "青山學院大學",
    "officialUrl": "https://www.aoyama.ac.jp/en/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "文學",
        "教育",
        "心理",
        "經濟",
        "商學",
        "法學",
        "國際政治",
        "社會",
        "理工",
        "資訊"
    ],
    "level": "52.5～65.0",
    "price": "付費",
    "priceDetail": "私立大學。青山學院已公告2027年度學費制度調整：入學金由20萬降至8萬，設施設備費併入授業料，授業料年額提高3萬，並維持年度漸增制度。實際金額依學部而異。",
    "target": "適合想在東京就讀私立大學，並偏好人文社會、國際政治、商管、經濟或理工的學生。",
    "strengths": [
        "位於東京青山地區，都市資源非常豐富。",
        "人文、社會、國際與理工都有完整學部。",
        "自由度與國際化程度較高。"
    ],
    "weaknesses": [
        "私立學費高於國立。",
        "2026 QS 整體大學排名為1401+，細分學科並非其主要優勢。"
    ],
    "tags": [
        "私立",
        "東京",
        "MARCH",
        "國際",
        "經濟",
        "商學",
        "文學",
        "理工"
    ],
    "qsRankings": [
        {
            "subject": "經濟學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "商學與管理",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "法律",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "政治／國際關係",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "社會學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "心理學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "現代語言",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "工程",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "物理",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
  {
    "id": "meiji",
    "name": "明治大學",
    "officialUrl": "https://www.meiji.ac.jp/cip/english/",
    "category": [
        "日本留學"
    ],
    "subcategory": [
        "大學"
    ],
    "fields": [
        "法學",
        "商學",
        "政治",
        "經濟",
        "經營",
        "文學",
        "資訊",
        "理工",
        "農學",
        "數學",
        "國際日本"
    ],
    "level": "57.5～67.5",
    "price": "付費",
    "priceDetail": "私立大學，各學部差異大。2027年度入學者已公布學費表；法、商、政治經濟、經營、資訊溝通、文學、國際日本、理工、農學、總合數理等學部費用不同。",
    "target": "適合想在東京就讀 MARCH 頂尖私立之一，並希望在法學、商學、經濟、經營、文學、資訊或農學中選擇的學生。",
    "strengths": [
        "MARCH 代表性私立大學。",
        "法學、商學、政治經濟、經營與文學等領域完整。",
        "資訊、理工、農學與數理也有完整體系。"
    ],
    "weaknesses": [
        "私立學費高於國立。",
        "熱門學部一般入試競爭較高。",
        "QS 2026 細分學科中，真正有明確排名的學科數量不多。"
    ],
    "tags": [
        "私立",
        "東京",
        "MARCH",
        "法學",
        "商學",
        "經濟",
        "經營",
        "資訊",
        "農學"
    ],
    "qsRankings": [
        {
            "subject": "古典／古代史",
            "worldRank": "51-150",
            "japanRank": null
        },
        {
            "subject": "經濟學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "商學與管理",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "法律",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "政治／國際關係",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "資訊／計算機",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "數學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "工程",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "生物科學",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "農林",
            "worldRank": null,
            "japanRank": null
        },
        {
            "subject": "心理學",
            "worldRank": null,
            "japanRank": null
        }
    ]
},
];

// 頂層分類清單（之後加新分類，只要在這裡加一筆）
const CATEGORIES = [
  { key: "日語學習", label: "日語學習", icon: "📚" },
  { key: "日語相關檢定", label: "日語相關檢定", icon: "📜" },
  { key: "日本留學", label: "日本留學", icon: "🎓" },
  { key: "日文閱讀與影音", label: "日文閱讀與影音", icon: "📰" },
];
