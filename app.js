/**
 * TikTok 主播粉絲社群資料庫 (TikTok Streamer Hub)
 * 專為 TikTok 直播主播設計之粉絲與家族社群資料管理系統
 */

// 官方開源示範資料 (Demo Data) - 趣味虛擬資料，無任何真人隱私資訊
const DEFAULT_CREW_DATA = [
    {
        id: "crew-001",
        name: "星星榜一",
        role: "榜一大哥",
        tiktokId: "@star_king",
        birthday: "8/21",
        zodiac: "獅子",
        anime: "航海王、鬼滅之刃",
        food: "無糖綠茶、生巧克力",
        notes: "每晚 PK 助攻大將，主播唱抒情歌時必刷嘉年華！遇到黑粉會霸氣護航。",
        avatar: ""
    },
    {
        id: "crew-002",
        name: "泡泡小檸檬",
        role: "管理員",
        tiktokId: "@lemon_pop",
        birthday: "4/2",
        zodiac: "牡羊",
        anime: "葬送的芙莉蓮、間諜家家酒",
        food: "草莓大福、鮮奶茶微糖微冰",
        notes: "公會元老級管理員，開播控場神手，負責幫忙紀錄直播精彩片刻與抽獎名單。",
        avatar: ""
    },
    {
        id: "crew-003",
        name: "大熊不熬夜",
        role: "守護神",
        tiktokId: "@bear_guard",
        birthday: "10/3",
        zodiac: "天秤",
        anime: "進擊的巨人、排球少年",
        food: "厚切牛排、黑咖啡",
        notes: "每天準時開播報到，常常提醒主播喝水休息，守護燈牌已連續點亮超過 300 天！",
        avatar: ""
    },
    {
        id: "crew-004",
        name: "甜心可樂",
        role: "鐵粉",
        tiktokId: "@sweet_cola",
        birthday: "6/9",
        zodiac: "雙子",
        anime: "咒術迴戰、鏈鋸人",
        food: "焦糖烤布丁、起司熔岩炸雞",
        notes: "彈幕氣氛帶動大師，只要他在彈幕就停不下來，笑點特別低。",
        avatar: ""
    },
    {
        id: "crew-005",
        name: "夜月神偷",
        role: "榜二大哥",
        tiktokId: "@night_phantom",
        birthday: "11/7",
        zodiac: "天蠍",
        anime: "死亡筆記本、Code Geass",
        food: "豚骨拉麵、炙燒三文魚握壽司",
        notes: "平時默默掛機，但關鍵 PK 戰役最後幾秒偷塔極準，喜歡給主播驚喜！",
        avatar: ""
    },
    {
        id: "crew-006",
        name: "抹茶糰子",
        role: "燈牌常駐",
        tiktokId: "@matcha_dango",
        birthday: "1/5",
        zodiac: "魔羯",
        anime: "夏目友人帳、千與千尋",
        food: "抹茶生乳捲、白玉紅豆湯",
        notes: "常在深夜心靈電台連麥，聲音溫柔好聽，粉絲群活躍核心小天使。",
        avatar: ""
    },
    {
        id: "crew-007",
        name: "暴走阿柴",
        role: "連麥嘉賓",
        tiktokId: "@chai_streamer",
        birthday: "7/25",
        zodiac: "獅子",
        anime: "一拳超人、火影忍者",
        food: "麻辣火鍋、芒果冰沙",
        notes: "友誼主播兼搞笑擔當，PK 輸了會跳花手或做怪表情，互動效果直接拉滿！",
        avatar: ""
    },
    {
        id: "crew-008",
        name: "神祕飛行員",
        role: "家族成員",
        tiktokId: "@sky_pilot",
        birthday: "",
        zodiac: "",
        anime: "星際牛仔",
        food: "",
        notes: "偶爾飛進直播間刷一波火箭就下線的低調神秘大佬，生日與喜好尚在探聽中...",
        avatar: ""
    }
];

// 本地存儲鍵名
const STORAGE_KEY = 'tiktok_streamer_crew_data';
const THEME_KEY = 'tiktok_streamer_theme';

// 當前資料狀態
let familyData = [];
let currentFilter = 'all';
let selectedRole = '';
let selectedZodiac = '';
let selectedMonth = '';
let currentTheme = localStorage.getItem(THEME_KEY) || 'dark';
let activeMemberForDetail = null;
let pendingDeleteId = null;

// DOM 元素快取
const cardsContainer = document.getElementById('cardsContainer');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('themeToggle');
const cardTemplate = document.getElementById('card-template');

// 選擇器 DOM
const roleSelector = document.querySelector('.role-selector');
const roleSelect = document.getElementById('roleSelect');
const zodiacSelector = document.querySelector('.zodiac-selector');
const zodiacSelect = document.getElementById('zodiacSelect');
const monthSelector = document.querySelector('.month-selector');
const monthSelect = document.getElementById('monthSelect');
const filterResults = document.getElementById('filterResults');
const resultCount = document.getElementById('resultCount');
const resetFilterBtn = document.getElementById('resetFilterBtn');

// 彈窗系列 DOM
const personModal = document.getElementById('personModal');
const editorModal = document.getElementById('editorModal');
const confirmModal = document.getElementById('confirmModal');
const dataManageModal = document.getElementById('dataManageModal');
const birthdayModal = document.getElementById('birthdayModal');
const birthdayAlert = document.getElementById('birthdayAlert');
const birthdayMessage = document.getElementById('birthdayMessage');
const birthdayModalMessage = document.getElementById('birthdayModalMessage');
const birthdayPeopleContainer = document.getElementById('birthdayPeopleContainer');
const showBirthdaysBtn = document.getElementById('showBirthdaysBtn');

// 表單 DOM
const personForm = document.getElementById('personForm');
const editorTitle = document.getElementById('editorTitle');
const personIdInput = document.getElementById('personId');
const personNameInput = document.getElementById('personName');
const personRoleInput = document.getElementById('personRole');
const personTiktokIdInput = document.getElementById('personTiktokId');
const personBirthdayInput = document.getElementById('personBirthday');
const personZodiacInput = document.getElementById('personZodiac');
const personAvatarUrlInput = document.getElementById('personAvatarUrl');
const avatarFileInput = document.getElementById('avatarFileInput');
const personAnimeInput = document.getElementById('personAnime');
const personFoodInput = document.getElementById('personFood');
const personNotesInput = document.getElementById('personNotes');

// 匯出匯入 DOM
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importInput = document.getElementById('importInput');
const dataManageBtn = document.getElementById('dataManageBtn');

/**
 * 根據生日（月/日）判定十二星座
 */
function determineZodiacSign(month, day) {
    if (!month || !day) return "";
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    if (isNaN(m) || isNaN(d)) return "";

    if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return "水瓶";
    if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) return "雙魚";
    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return "牡羊";
    if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return "金牛";
    if ((m === 5 && d >= 21) || (m === 6 && d <= 21)) return "雙子";
    if ((m === 6 && d >= 22) || (m === 7 && d <= 22)) return "巨蟹";
    if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return "獅子";
    if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return "處女";
    if ((m === 9 && d >= 23) || (m === 10 && d <= 23)) return "天秤";
    if ((m === 10 && d >= 24) || (m === 11 && d <= 22)) return "天蠍";
    if ((m === 11 && d >= 23) || (m === 12 && d <= 21)) return "射手";
    if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return "魔羯";
    return "";
}

/**
 * 解析生日中的月與日
 */
function parseBirthday(birthdayStr) {
    if (!birthdayStr) return { month: null, day: null };
    const parts = birthdayStr.split('/');
    if (parts.length === 2) {
        const month = parseInt(parts[0], 10);
        const day = parseInt(parts[1], 10);
        return {
            month: isNaN(month) ? null : month,
            day: isNaN(day) ? null : day
        };
    }
    return { month: null, day: null };
}

/**
 * 格式化與補齊人員資料結構
 */
function normalizePerson(person, index) {
    const { month, day } = parseBirthday(person.birthday);
    const zodiac = person.zodiac || (month && day ? determineZodiacSign(month, day) : "");
    return {
        id: person.id || `crew_${Date.now()}_${index}`,
        name: (person.name || "未命名").trim(),
        role: (person.role || "家族成員").trim(),
        tiktokId: (person.tiktokId || "").trim(),
        birthday: (person.birthday || "").trim(),
        birthMonth: month,
        birthDay: day,
        zodiac: zodiac,
        anime: (person.anime || "").trim(),
        food: (person.food || "").trim(),
        notes: (person.notes || "").trim(),
        avatar: (person.avatar || "").trim()
    };
}

/**
 * 從 LocalStorage 載入資料
 */
function loadCrewData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                familyData = parsed.map((item, idx) => normalizePerson(item, idx));
                return;
            }
        }
    } catch (e) {
        console.warn('讀取 LocalStorage 失敗，將載入預設示範資料', e);
    }
    // 預設示範資料
    familyData = DEFAULT_CREW_DATA.map((item, idx) => normalizePerson(item, idx));
    saveCrewData();
}

/**
 * 將目前資料寫入 LocalStorage
 */
function saveCrewData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(familyData));
        updateManageDataCount();
    } catch (e) {
        console.error('儲存至 LocalStorage 失敗', e);
        showToast('儲存失敗，可能超出瀏覽器配額', 'error');
    }
}

/**
 * 產生頭像 URL
 */
function getAvatarUrl(person) {
    if (person.avatar && person.avatar.trim() !== '') {
        return person.avatar;
    }
    // 使用 DiceBear 穩定的可愛頭像 (以名字為種子)
    const seed = encodeURIComponent(person.name || 'streamer');
    return `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${seed}&radius=50&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

/**
 * 取得身分徽章專屬 CSS class
 */
function getRoleBadgeClass(role) {
    if (!role) return '';
    if (role.includes('榜一')) return 'role-badge-king';
    if (role.includes('榜二')) return 'role-badge-king';
    if (role.includes('管') || role.includes('房管')) return 'role-badge-mod';
    if (role.includes('守護')) return 'role-badge-guard';
    if (role.includes('鐵粉') || role.includes('燈牌')) return 'role-badge-fan';
    return '';
}

/**
 * 渲染卡片列表
 */
function renderCards() {
    cardsContainer.innerHTML = '';
    const query = searchInput.value.trim().toLowerCase();

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    // 篩選過濾
    const filtered = familyData.filter(person => {
        // 搜尋比對 (姓名, 身分, TikTok ID, 動漫, 食物, 筆記)
        const matchesSearch = !query ||
            person.name.toLowerCase().includes(query) ||
            person.role.toLowerCase().includes(query) ||
            person.tiktokId.toLowerCase().includes(query) ||
            person.anime.toLowerCase().includes(query) ||
            person.food.toLowerCase().includes(query) ||
            person.notes.toLowerCase().includes(query);

        if (!matchesSearch) return false;

        // 分類過濾
        if (currentFilter === 'today') {
            return person.birthMonth === currentMonth && person.birthDay === currentDay;
        } else if (currentFilter === 'role') {
            return !selectedRole || person.role === selectedRole;
        } else if (currentFilter === 'zodiac') {
            return !selectedZodiac ? !!person.zodiac : person.zodiac.includes(selectedZodiac);
        } else if (currentFilter === 'month') {
            return !selectedMonth ? !!person.birthMonth : person.birthMonth === parseInt(selectedMonth, 10);
        } else if (currentFilter === 'anime') {
            return !!person.anime;
        } else if (currentFilter === 'food') {
            return !!person.food;
        }
        return true;
    });

    // 排序：先比今天壽星，再比榜一大哥，再按名字
    filtered.sort((a, b) => {
        const aIsBirthday = a.birthMonth === currentMonth && a.birthDay === currentDay;
        const bIsBirthday = b.birthMonth === currentMonth && b.birthDay === currentDay;
        if (aIsBirthday && !bIsBirthday) return -1;
        if (!aIsBirthday && bIsBirthday) return 1;
        if (a.role.includes('榜一') && !b.role.includes('榜一')) return -1;
        if (!a.role.includes('榜一') && b.role.includes('榜一')) return 1;
        return a.name.localeCompare(b.name, 'zh-TW');
    });

    // 更新篩選結果列
    updateFilterResults(filtered.length, familyData.length);

    // 空狀態處理
    if (filtered.length === 0) {
        emptyState.style.display = 'block';
        return;
    } else {
        emptyState.style.display = 'none';
    }

    // 渲染卡片
    filtered.forEach((person, index) => {
        const card = createPersonCard(person, index, currentMonth, currentDay);
        cardsContainer.appendChild(card);
    });
}

/**
 * 創建單張卡片 DOM
 */
function createPersonCard(person, index, currentMonth, currentDay) {
    const cardClone = document.importNode(cardTemplate.content, true);
    const card = cardClone.querySelector('.card');

    // 設置交錯動畫
    card.style.animationDelay = `${Math.min(index * 0.04, 0.5)}s`;

    // 身分標籤
    const roleBadge = cardClone.querySelector('.card-role-badge');
    roleBadge.textContent = person.role || '家族成員';
    const badgeClass = getRoleBadgeClass(person.role);
    if (badgeClass) roleBadge.classList.add(badgeClass);

    // 頭像
    const avatarImg = cardClone.querySelector('.card-avatar img');
    avatarImg.src = getAvatarUrl(person);
    avatarImg.alt = `${person.name} 的頭像`;
    avatarImg.onerror = function() {
        this.onerror = null;
        this.src = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(person.name)}&radius=50`;
    };

    // 今日生日特殊框線
    if (person.birthMonth === currentMonth && person.birthDay === currentDay) {
        card.classList.add('birthday-today');
    }

    // 姓名 & TikTok ID
    cardClone.querySelector('.card-name').textContent = person.name;
    const tiktokIdEl = cardClone.querySelector('.card-tiktok-id');
    if (person.tiktokId) {
        tiktokIdEl.textContent = person.tiktokId;
    } else {
        tiktokIdEl.style.display = 'none';
    }

    // 生日與星座
    const zodiacText = cardClone.querySelector('.card-zodiac span');
    if (person.birthday && person.zodiac) {
        zodiacText.textContent = `${person.birthday} (${person.zodiac}座)`;
    } else if (person.birthday) {
        zodiacText.textContent = person.birthday;
    } else if (person.zodiac) {
        zodiacText.textContent = `${person.zodiac}座`;
    } else {
        zodiacText.textContent = '生日未知';
        cardClone.querySelector('.card-zodiac').classList.add('empty-value');
    }

    // 動漫話題
    const animeText = cardClone.querySelector('.card-anime span');
    if (person.anime) {
        animeText.textContent = person.anime;
    } else {
        animeText.textContent = '未填寫喜好動漫';
        cardClone.querySelector('.card-anime').classList.add('empty-value');
    }

    // 食物偏好
    const foodText = cardClone.querySelector('.card-food span');
    if (person.food) {
        foodText.textContent = person.food;
    } else {
        foodText.textContent = '未填寫偏好禮物';
        cardClone.querySelector('.card-food').classList.add('empty-value');
    }

    // 互動筆記摘要
    const notesText = cardClone.querySelector('.card-notes span');
    if (person.notes) {
        notesText.textContent = person.notes;
    } else {
        cardClone.querySelector('.card-notes').style.display = 'none';
    }

    // 快捷編輯按鈕 (阻止冒泡打開詳情)
    const editBtn = cardClone.querySelector('.edit-quick-btn');
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditorModal(person);
    });

    // 快捷刪除按鈕
    const deleteBtn = cardClone.querySelector('.delete-quick-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDeleteConfirm(person);
    });

    // 點擊卡片本體開啟詳細彈窗
    card.addEventListener('click', () => {
        showPersonDetailModal(person);
    });

    return card;
}

/**
 * 更新篩選結果統計條
 */
function updateFilterResults(filteredCount, totalCount) {
    let desc = '全部成員';
    const hasSearch = !!searchInput.value.trim();

    if (currentFilter === 'today') desc = '今日生日壽星';
    else if (currentFilter === 'role') desc = selectedRole ? `身分【${selectedRole}】` : '有身分標籤之成員';
    else if (currentFilter === 'zodiac') desc = selectedZodiac ? `${selectedZodiac}座` : '有星座資料之成員';
    else if (currentFilter === 'month') desc = selectedMonth ? `${selectedMonth}月份生日` : '有生日月份之成員';
    else if (currentFilter === 'anime') desc = '有動漫話題紀錄';
    else if (currentFilter === 'food') desc = '有食物禮物喜好';

    if (hasSearch) {
        desc = `關鍵字「${searchInput.value.trim()}」· ` + desc;
    }

    resultCount.innerHTML = `顯示 <span class="count-highlight">${filteredCount}</span> 位成員（資料庫共 ${totalCount} 位）· 條件：${desc}`;

    if (currentFilter !== 'all' || hasSearch || selectedRole || selectedZodiac || selectedMonth) {
        resetFilterBtn.style.display = 'inline-block';
    } else {
        resetFilterBtn.style.display = 'none';
    }
}

/**
 * 顯示成員詳細資料彈窗 (Detail Modal)
 */
function showPersonDetailModal(person) {
    activeMemberForDetail = person;

    document.getElementById('modalName').textContent = person.name;
    const modalAvatar = document.getElementById('modalAvatar');
    modalAvatar.src = getAvatarUrl(person);
    modalAvatar.onerror = function() {
        this.onerror = null;
        this.src = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(person.name)}&radius=50`;
    };

    const roleBadge = document.getElementById('modalRoleBadge');
    roleBadge.textContent = person.role || '家族成員';
    roleBadge.className = 'role-badge ' + getRoleBadgeClass(person.role);

    const tiktokIdEl = document.getElementById('modalTiktokId');
    if (person.tiktokId) {
        tiktokIdEl.textContent = person.tiktokId;
        tiktokIdEl.style.display = 'inline-block';
    } else {
        tiktokIdEl.style.display = 'none';
    }

    document.getElementById('modalBirthday').textContent = person.birthday || '未設定';
    document.getElementById('modalZodiac').textContent = person.zodiac ? `${person.zodiac}座` : '未設定';
    document.getElementById('modalAnime').textContent = person.anime || '未填寫喜好話題';
    document.getElementById('modalFood').textContent = person.food || '未填寫偏好禮物';

    const notesBox = document.getElementById('modalNotesBox');
    if (person.notes) {
        notesBox.style.display = 'block';
        document.getElementById('modalNotes').textContent = person.notes;
    } else {
        notesBox.style.display = 'none';
    }

    // 詳細視窗底部的操作按鈕
    document.getElementById('detailEditBtn').onclick = () => {
        closeModal(personModal);
        openEditorModal(person);
    };

    document.getElementById('detailDeleteBtn').onclick = () => {
        closeModal(personModal);
        openDeleteConfirm(person);
    };

    openModal(personModal);
}

/**
 * 打開編輯/新增彈窗 (Editor Modal)
 */
function openEditorModal(person = null) {
    personForm.reset();

    if (person) {
        editorTitle.textContent = `編輯成員 - ${person.name}`;
        personIdInput.value = person.id;
        personNameInput.value = person.name;
        personRoleInput.value = person.role;
        personTiktokIdInput.value = person.tiktokId || '';
        personBirthdayInput.value = person.birthday || '';
        personZodiacInput.value = person.zodiac || '';
        personAvatarUrlInput.value = person.avatar || '';
        personAnimeInput.value = person.anime || '';
        personFoodInput.value = person.food || '';
        personNotesInput.value = person.notes || '';
    } else {
        editorTitle.textContent = '新增社群成員';
        personIdInput.value = '';
        personRoleInput.value = '鐵粉';
    }

    openModal(editorModal);
    personNameInput.focus();
}

/**
 * 處理表單提交 (新增 / 更新)
 */
function handleFormSubmit(e) {
    e.preventDefault();

    const name = personNameInput.value.trim();
    if (!name) {
        showToast('請輸入成員姓名或暱稱', 'error');
        return;
    }

    const id = personIdInput.value.trim();
    const role = personRoleInput.value.trim() || '家族成員';
    const tiktokId = personTiktokIdInput.value.trim();
    const birthday = personBirthdayInput.value.trim();
    let zodiac = personZodiacInput.value;
    const avatar = personAvatarUrlInput.value.trim();
    const anime = personAnimeInput.value.trim();
    const food = personFoodInput.value.trim();
    const notes = personNotesInput.value.trim();

    // 生日與星座自動推算補正
    const { month, day } = parseBirthday(birthday);
    if (!zodiac && month && day) {
        zodiac = determineZodiacSign(month, day);
    }

    if (id) {
        // 更新現有成員
        const index = familyData.findIndex(item => item.id === id);
        if (index !== -1) {
            familyData[index] = {
                ...familyData[index],
                name,
                role,
                tiktokId,
                birthday,
                birthMonth: month,
                birthDay: day,
                zodiac,
                avatar,
                anime,
                food,
                notes
            };
            saveCrewData();
            renderCards();
            closeModal(editorModal);
            showToast(`已成功更新【${name}】的資料！`, 'success');
        }
    } else {
        // 新增成員
        const newMember = {
            id: `crew_${Date.now()}`,
            name,
            role,
            tiktokId,
            birthday,
            birthMonth: month,
            birthDay: day,
            zodiac,
            avatar,
            anime,
            food,
            notes
        };
        familyData.unshift(newMember);
        saveCrewData();
        renderCards();
        closeModal(editorModal);
        showToast(`已成功新增成員【${name}】！`, 'success');
    }
}

/**
 * 開啟刪除確認彈窗
 */
function openDeleteConfirm(person) {
    pendingDeleteId = person.id;
    document.getElementById('confirmMessage').innerHTML = `確定要刪除成員 <strong>【${person.name}】</strong> 嗎？<br>刪除後該筆資料將從本機移除。`;
    openModal(confirmModal);
}

/**
 * 執行確認刪除
 */
function executeDelete() {
    if (!pendingDeleteId) return;
    const target = familyData.find(item => item.id === pendingDeleteId);
    familyData = familyData.filter(item => item.id !== pendingDeleteId);
    saveCrewData();
    renderCards();
    closeModal(confirmModal);
    pendingDeleteId = null;
    showToast(`已刪除成員【${target ? target.name : ''}】`, 'success');
}

/**
 * 處理本地圖片上傳轉為 Base64
 */
function handleAvatarFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showToast('請選擇圖片檔案 (JPG, PNG, GIF, WebP)', 'error');
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        showToast('圖片大小建議在 2MB 以內，避免耗盡瀏覽器儲存空間', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        personAvatarUrlInput.value = event.target.result;
        showToast('圖片已載入為頭像！', 'success');
    };
    reader.readAsDataURL(file);
}

/**
 * 匯出資料為 JSON 檔案
 */
function exportDataAsJson() {
    try {
        const cleanData = familyData.map(item => ({
            name: item.name,
            role: item.role,
            tiktokId: item.tiktokId,
            birthday: item.birthday,
            zodiac: item.zodiac,
            anime: item.anime,
            food: item.food,
            notes: item.notes,
            avatar: item.avatar
        }));

        const jsonStr = JSON.stringify(cleanData, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const dateStr = new Date().toISOString().split('T')[0];
        a.href = url;
        a.download = `tiktok-streamer-crew-${dateStr}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('成功匯出 JSON 備份檔！', 'success');
    } catch (e) {
        console.error('匯出失敗', e);
        showToast('匯出檔案失敗', 'error');
    }
}

/**
 * 匯入 JSON 備份檔案
 */
function handleFileImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const imported = JSON.parse(event.target.result);
            if (!Array.isArray(imported)) {
                throw new Error('匯入的 JSON 必須是成員物件陣列');
            }

            const formatted = imported.map((item, idx) => normalizePerson(item, idx));
            const shouldMerge = confirm(`成功解析 ${formatted.length} 筆資料！\n\n點選【確定】與現有資料合併新增\n點選【取消】直接覆蓋取代現有資料`);

            if (shouldMerge) {
                // 合併模式 (以姓名查重)
                const existingNames = new Set(familyData.map(i => i.name));
                let addCount = 0;
                formatted.forEach(item => {
                    if (!existingNames.has(item.name)) {
                        familyData.push(item);
                        addCount++;
                    }
                });
                showToast(`已合併新增 ${addCount} 位新成員！`, 'success');
            } else {
                familyData = formatted;
                showToast(`已成功覆蓋匯入 ${formatted.length} 位成員！`, 'success');
            }

            saveCrewData();
            renderCards();
            closeModal(dataManageModal);
        } catch (err) {
            console.error('匯入失敗', err);
            showToast('JSON 格式不符或損壞，無法解析！', 'error');
        }
        importInput.value = '';
    };
    reader.readAsText(file);
}

/**
 * 重設為官方範例資料
 */
function resetToSampleData() {
    if (confirm('確定要載入官方示範資料嗎？此操作將覆蓋現有資料（請先備份現有資料）。')) {
        familyData = DEFAULT_CREW_DATA.map((item, idx) => normalizePerson(item, idx));
        saveCrewData();
        renderCards();
        closeModal(dataManageModal);
        showToast('已成功載入官方示範資料！', 'success');
    }
}

/**
 * 清空所有資料
 */
function clearAllData() {
    if (confirm('⚠️ 警告：確定要清空所有成員資料嗎？此操作無法復原，請確保您已完成備份！')) {
        familyData = [];
        saveCrewData();
        renderCards();
        closeModal(dataManageModal);
        showToast('已清空所有成員資料', 'success');
    }
}

/**
 * 更新資料庫管理彈窗內的筆數統計
 */
function updateManageDataCount() {
    const countEl = document.getElementById('manageDataCount');
    if (countEl) {
        countEl.textContent = familyData.length;
    }
}

/**
 * 檢查今日是否有壽星，並展示提醒與狂歡效果
 */
function checkTodayBirthdays() {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    const birthdayPeople = familyData.filter(person =>
        person.birthMonth === currentMonth && person.birthDay === currentDay
    );

    if (birthdayPeople.length > 0) {
        const names = birthdayPeople.map(p => p.name);
        let msg = '';
        if (names.length === 1) {
            msg = `今天是主播鐵粉【${names[0]}】的生日！快在直播間送上專屬祝福吧！`;
        } else {
            msg = `今天有 ${names.length} 位壽星生日：${names.join('、')}！開播狂歡囉！`;
        }

        birthdayMessage.textContent = msg;
        birthdayModalMessage.textContent = msg;
        birthdayAlert.classList.add('active');
        showBirthdaysBtn.classList.add('active');

        // 動態生成狂歡彈窗內的小卡
        birthdayPeopleContainer.innerHTML = '';
        birthdayPeople.forEach(person => {
            const card = document.createElement('div');
            card.className = 'birthday-person-card';
            card.innerHTML = `
                <img class="birthday-person-avatar" src="${getAvatarUrl(person)}" alt="${person.name}">
                <div>
                    <h4 style="font-size:1.1rem; font-weight:700; margin-bottom:0.25rem;">${person.name} <span class="role-badge ${getRoleBadgeClass(person.role)}">${person.role}</span></h4>
                    <p style="font-size:0.85rem; opacity:0.9;"><i class="fas fa-gift" style="color:#ffd166;"></i> 喜好偏好：${person.food || person.anime || '直播熱情陪伴'}</p>
                </div>
            `;
            birthdayPeopleContainer.appendChild(card);
        });

        // 啟動五彩紙屑
        createConfetti();

        // 初次進入若有壽星，延遲 1 秒自動跳出賀禮彈窗
        setTimeout(() => {
            openBirthdayCelebration();
        }, 1000);
    } else {
        birthdayAlert.classList.remove('active');
        showBirthdaysBtn.classList.remove('active');
    }
}

/**
 * 產生五彩紙屑 Confetti 動畫
 */
function createConfetti() {
    const container = document.querySelector('.confetti-container');
    if (!container) return;
    container.innerHTML = '';
    const colors = ['#ffd166', '#fe2c55', '#25f4ee', '#7928ca', '#ffffff', '#06d6a0'];
    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.width = `${Math.random() * 8 + 6}px`;
        confetti.style.height = `${Math.random() * 8 + 6}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = `${Math.random() * 2.5 + 2}s`;
        confetti.style.animationDelay = `${Math.random() * 1.5}s`;
        container.appendChild(confetti);
    }
}

function openBirthdayCelebration() {
    openModal(birthdayModal);
    createConfetti();
}

/**
 * 彈窗通用開關方法（以 active 類別驅動 CSS 雙向過渡，退場自然流暢，絕無閃退）
 */
function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.style.display = ''; // 清除 inline display 避免干擾 CSS
    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    modalEl.setAttribute('aria-hidden', 'true');
    
    // 檢查頁面是否還有其他啟用的彈窗，若無才恢復滾動
    setTimeout(() => {
        const anyActive = document.querySelector('.modal.active, .birthday-modal.active');
        if (!anyActive) {
            document.body.style.overflow = '';
        }
    }, 280);
}

/**
 * Toast 輕提示展示
 */
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    let icon = 'fas fa-info-circle';
    if (type === 'success') icon = 'fas fa-check-circle';
    if (type === 'error') icon = 'fas fa-exclamation-circle';

    toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

/**
 * 主題設置切換 (Dark / Light)
 */
function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem(THEME_KEY, theme);

    if (theme === 'dark') {
        document.body.classList.remove('bg-light', 'text-dark');
        document.body.classList.add('bg-dark', 'text-light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('bg-dark', 'text-light');
        document.body.classList.add('bg-light', 'text-dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

/**
 * 防抖函數
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * 設定各類事件監聽
 */
function setupEventListeners() {
    // 搜尋即時輸入
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim()) {
            clearSearchBtn.style.display = 'block';
        } else {
            clearSearchBtn.style.display = 'none';
        }
        debounceRender();
    });

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        renderCards();
    });

    const debounceRender = debounce(() => renderCards(), 250);

    // 篩選標籤點擊
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;

            // 控制各個下拉選單的顯示
            roleSelector.classList.toggle('active', currentFilter === 'role');
            zodiacSelector.classList.toggle('active', currentFilter === 'zodiac');
            monthSelector.classList.toggle('active', currentFilter === 'month');

            renderCards();
        });
    });

    // 身分下拉選擇
    roleSelect.addEventListener('change', () => {
        selectedRole = roleSelect.value;
        renderCards();
    });

    // 星座下拉選擇
    zodiacSelect.addEventListener('change', () => {
        selectedZodiac = zodiacSelect.value;
        renderCards();
    });

    // 月份下拉選擇
    monthSelect.addEventListener('change', () => {
        selectedMonth = monthSelect.value;
        renderCards();
    });

    // 重設篩選按鈕
    resetFilterBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        currentFilter = 'all';
        selectedRole = '';
        selectedZodiac = '';
        selectedMonth = '';
        roleSelect.value = '';
        zodiacSelect.value = '';
        monthSelect.value = '';
        filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === 'all'));
        roleSelector.classList.remove('active');
        zodiacSelector.classList.remove('active');
        monthSelector.classList.remove('active');
        renderCards();
    });

    // 表單生日輸入時自動推算星座
    personBirthdayInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        const { month, day } = parseBirthday(val);
        if (month && day) {
            const detectedZodiac = determineZodiacSign(month, day);
            if (detectedZodiac) {
                personZodiacInput.value = detectedZodiac;
            }
        }
    });

    // 表單提交 (新增 / 編輯)
    personForm.addEventListener('submit', handleFormSubmit);

    // 新增成員按鈕
    document.getElementById('addPersonBtn').addEventListener('click', () => openEditorModal(null));
    document.getElementById('emptyAddBtn').addEventListener('click', () => openEditorModal(null));

    // 關閉編輯彈窗
    document.getElementById('closeEditorBtn').addEventListener('click', () => closeModal(editorModal));
    document.getElementById('cancelEditorBtn').addEventListener('click', () => closeModal(editorModal));

    // 關閉詳情彈窗
    document.getElementById('closeDetailBtn').addEventListener('click', () => closeModal(personModal));

    // 刪除確認操作
    document.getElementById('okConfirmBtn').addEventListener('click', executeDelete);
    document.getElementById('cancelConfirmBtn').addEventListener('click', () => closeModal(confirmModal));

    // 本機頭像上傳
    avatarFileInput.addEventListener('change', handleAvatarFileUpload);

    // 匯出 / 匯入按鈕
    exportBtn.addEventListener('click', exportDataAsJson);
    importBtn.addEventListener('click', () => importInput.click());
    importInput.addEventListener('change', handleFileImport);

    // 資料管理彈窗
    dataManageBtn.addEventListener('click', () => {
        updateManageDataCount();
        openModal(dataManageModal);
    });
    document.getElementById('closeDataManageBtn').addEventListener('click', () => closeModal(dataManageModal));
    document.getElementById('modalExportBtn').addEventListener('click', exportDataAsJson);
    document.getElementById('modalImportBtn').addEventListener('click', () => importInput.click());
    document.getElementById('resetSampleBtn').addEventListener('click', resetToSampleData);
    document.getElementById('clearAllBtn').addEventListener('click', clearAllData);

    // 生日彈窗
    document.getElementById('openBirthdayCelebration').addEventListener('click', openBirthdayCelebration);
    document.getElementById('showBirthdaysBtn').addEventListener('click', openBirthdayCelebration);
    document.getElementById('closeBirthdayModal').addEventListener('click', () => closeModal(birthdayModal));
    document.getElementById('closeBirthdayAlert').addEventListener('click', () => birthdayAlert.classList.remove('active'));

    // 主題切換
    themeToggle.addEventListener('click', () => {
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // 點擊背景關閉彈窗
    window.addEventListener('click', (event) => {
        if (event.target === personModal) closeModal(personModal);
        if (event.target === editorModal) closeModal(editorModal);
        if (event.target === confirmModal) closeModal(confirmModal);
        if (event.target === dataManageModal) closeModal(dataManageModal);
        if (event.target === birthdayModal) closeModal(birthdayModal);
    });

    // ESC 鍵關閉所有彈窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(personModal);
            closeModal(editorModal);
            closeModal(confirmModal);
            closeModal(dataManageModal);
            closeModal(birthdayModal);
        }
    });
}

// 頁面載入初始化
document.addEventListener('DOMContentLoaded', () => {
    setTheme(currentTheme);
    loadCrewData();
    setupEventListeners();

    // 檢查是否有由缺漏頁面傳遞過來的搜尋條件
    const searchTarget = localStorage.getItem('searchPerson');
    if (searchTarget) {
        searchInput.value = searchTarget;
        clearSearchBtn.style.display = 'block';
        localStorage.removeItem('searchPerson');
    }

    renderCards();
    checkTodayBirthdays();
});
