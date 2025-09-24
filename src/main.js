// 极简打卡 - SimpleList 主JavaScript文件

class SimpleList {
    constructor() {
        // 初始化数据
        this.goals = JSON.parse(localStorage.getItem('simplelist_goals')) || [];
        this.records = JSON.parse(localStorage.getItem('simplelist_records')) || [];
        this.settings = JSON.parse(localStorage.getItem('simplelist_settings')) || {
            theme: 'auto', // 默认为自动检测模式
            language: 'zh-CN' // 默认简体中文
        };

        // 当前编辑的目标ID
        this.currentEditingGoal = null;

        // 当前删除的目标ID
        this.currentDeletingGoal = null;

        // Toast定时器引用
        this.toastTimeout = null;

        // 初始化日历相关数据
        this.currentCalendarDate = new Date();
        this.currentCalendarGoal = null;

        // 初始化打卡记录相关数据
        this.currentSelectedDate = new Date();
        this.weekStartDate = new Date();

        // 初始化界面
        this.init();

        // 绑定事件监听器
        this.bindEvents();
    }

    // 绑定事件监听器
    bindEvents() {
        // 编辑目标表单事件
        document.getElementById('editGoalForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEditedGoal();
        });

        document.getElementById('closeEditModal').addEventListener('click', () => {
            this.hideModal('editGoalModal');
            this.currentEditingGoal = null;
        });

        document.getElementById('cancelEditBtn').addEventListener('click', () => {
            this.hideModal('editGoalModal');
            this.currentEditingGoal = null;
        });

        // 删除确认对话框事件
        document.getElementById('closeDeleteConfirmModal').addEventListener('click', () => {
            this.hideModal('deleteConfirmModal');
            this.currentDeletingGoal = null;
        });

        document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
            this.hideModal('deleteConfirmModal');
            this.currentDeletingGoal = null;
        });

        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            this.confirmDeleteGoal();
        });
    }

    // 初始化应用
    init() {
        this.loadData();
        this.setupEventListeners();
        this.initTheme(); // 使用自动主题检测
        this.renderGoals();
        this.setDefaultDates();

        // 初始化语言
        if (window.languageManager) {
            // 如果设置中有语言配置，使用它
            if (this.settings.language) {
                window.languageManager.setLanguage(this.settings.language);
            } else {
                // 否则使用浏览器语言
                window.languageManager.applyLanguage();
                this.settings.language = window.languageManager.getCurrentLanguage();
                this.saveData();
            }

            // 设置语言选择器的值
            const languageSelect = document.getElementById('languageSelect');
            if (languageSelect) {
                languageSelect.value = this.settings.language;
            }
        }

        // 初始化字符计数器
        this.initCharacterCounters();

        // 初始化侧滑手势
        this.initSwipeGestures();
    }

    // 从localStorage加载数据
    loadData() {
        try {
            const goalsData = localStorage.getItem('simplelist-goals');
            const recordsData = localStorage.getItem('simplelist-records');
            const settingsData = localStorage.getItem('simplelist-settings');

            if (goalsData) {
                this.goals = JSON.parse(goalsData);
            }

            if (recordsData) {
                this.records = JSON.parse(recordsData);
            }

            if (settingsData) {
                this.settings = JSON.parse(settingsData);
            }
        } catch (error) {
            console.error('加载数据失败:', error);
            this.showToast('数据加载失败，请刷新页面重试', 'error');
        }
    }

    // 保存数据到localStorage
    saveData() {
        try {
            localStorage.setItem('simplelist-goals', JSON.stringify(this.goals));
            localStorage.setItem('simplelist-records', JSON.stringify(this.records));
            localStorage.setItem('simplelist-settings', JSON.stringify(this.settings));
        } catch (error) {
            console.error('保存数据失败:', error);
            this.showToast('数据保存失败', 'error');
        }
    }

    // 格式化日期为 yyyy/mm/dd
    formatDateToYYYYMMDD(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    }

    // 将日期转换为ISO格式（用于input元素的value）
    formatDateToISO(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // 设置默认日期
    setDefaultDates() {
        const today = new Date();
        const todayISO = this.formatDateToISO(today);
        document.getElementById('startDate').value = todayISO;

        // 设置日期输入框的显示格式（通过placeholder）
        const startDateInput = document.getElementById('startDate');
        const endDateInput = document.getElementById('endDate');

        // 设置placeholder显示格式
        const formattedToday = this.formatDateToYYYYMMDD(today);
        startDateInput.placeholder = formattedToday;
        if (endDateInput) {
            endDateInput.placeholder = formattedToday;
        }
    }

    // 设置事件监听器
    setupEventListeners() {
        // 监听语言切换事件，重新渲染日期列表
        window.addEventListener('languageChanged', () => {
            // 如果打卡记录模态框是打开的，重新渲染日期列表
            const recordsModal = document.getElementById('recordsModal');
            if (recordsModal && recordsModal.classList.contains('active')) {
                this.renderWeekDateList();
            }
        });

        // 添加目标按钮
        document.getElementById('addGoalBtn').addEventListener('click', () => {
            this.showModal('addGoalModal');
        });

        // 模态框关闭按钮
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.hideModal(modal.id);
            });
        });

        // 取消按钮
        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.hideModal('addGoalModal');
        });

        // 目标表单提交
        document.getElementById('goalForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createGoal();
        });

        // 底部导航
        document.getElementById('featuresBtn').addEventListener('click', () => {
            this.showModal('featuresModal');
        });

        document.getElementById('settingsBtn').addEventListener('click', () => {
            this.showModal('settingsModal');
        });

        // 功能菜单
        document.getElementById('recordsBtn').addEventListener('click', () => {
            this.hideModal('featuresModal');
            this.showRecords();
        });

        document.getElementById('manageGoalsBtn').addEventListener('click', () => {
            this.hideModal('featuresModal');
            this.showManageGoals();
        });

        // 设置
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.settings.language = e.target.value;
            this.saveData();
            if (window.languageManager) {
                window.languageManager.setLanguage(e.target.value);
                // 重新渲染所有界面以应用新语言
                this.renderGoals();
                this.renderManageGoals();
            }
        });

        document.getElementById('themeSelect').addEventListener('change', (e) => {
            this.settings.theme = e.target.value;
            this.saveData();

            if (e.target.value === 'auto') {
                // 如果选择自动检测，根据当前系统主题设置
                const systemTheme = this.detectSystemTheme();
                document.documentElement.setAttribute('data-theme', systemTheme);
            } else {
                this.applyTheme();
            }
        });

        // 数据导出按钮事件
        document.getElementById('exportDataBtn').addEventListener('click', () => {
            this.exportData();
        });

        // 数据导入按钮事件
        document.getElementById('importDataBtn').addEventListener('click', () => {
            document.getElementById('importFileInput').click();
        });

        // 文件选择事件
        document.getElementById('importFileInput').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.importData(file);
                // 清空文件输入，允许重复导入同一个文件
                e.target.value = '';
            }
        });

        // 关于软件按钮事件
        document.getElementById('aboutSoftwareBtn').addEventListener('click', () => {
            this.showModal('aboutSoftwareModal');
        });

        document.getElementById('closeAboutSoftwareModal').addEventListener('click', () => {
            this.hideModal('aboutSoftwareModal');
        });

        // 分享模态框事件
        document.getElementById('closeShareGoalModal').addEventListener('click', () => {
            this.hideModal('shareGoalModal');
        });

        document.getElementById('cancelShareBtn').addEventListener('click', () => {
            this.hideModal('shareGoalModal');
        });

        document.getElementById('saveShareImageBtn').addEventListener('click', () => {
            this.saveShareImage();
        });

        // 移除模态框外部点击关闭功能，只保留关闭按钮和ESC键
        // 键盘事件（保留ESC键关闭功能）
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    this.hideModal(activeModal.id);
                }
            }
        });
    }

    // 显示模态框
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // 隐藏模态框
    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // 创建目标
    createGoal() {
        const name = document.getElementById('goalName').value.trim();
        const targetCount = parseInt(document.getElementById('targetCount').value);
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        if (!name || !targetCount || !startDate) {
            const completeInfoText = window.languageManager ? window.languageManager.getText('complete_info_error') : '请填写完整信息';
            this.showToast(completeInfoText, 'error');
            return;
        }

        // 检查目标名称是否已存在（不区分大小写）
        const existingGoal = this.goals.find(goal =>
            goal.name.toLowerCase() === name.toLowerCase() && goal.isActive
        );

        if (existingGoal) {
            const goalExistsText = window.languageManager ? window.languageManager.getText('error_goal_exists') : '该目标已存在';
            this.showToast(goalExistsText, 'error');
            return;
        }

        const goal = {
            id: Date.now().toString(),
            name,
            targetCount,
            startDate,
            endDate,
            createdAt: new Date().toISOString(),
            isActive: true
        };

        this.goals.push(goal);
        this.saveData();
        this.renderGoals();
        this.hideModal('addGoalModal');
        const createSuccessText = window.languageManager ? window.languageManager.getText('create_success') : '创建成功';
        this.showToast(`${createSuccessText}！`);

        // 重置表单
        document.getElementById('goalForm').reset();
        this.setDefaultDates();
    }

    // 渲染目标列表
    renderGoals() {
        const container = document.getElementById('goalsContainer');
        const emptyState = document.getElementById('emptyState');

        if (this.goals.length === 0) {
            container.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        const activeGoals = this.goals.filter(goal => goal.isActive);

        container.innerHTML = activeGoals.map(goal => {
            const todayRecord = this.getTodayRecord(goal.id);
            const progress = todayRecord ? todayRecord.count : 0;
            const isCompleted = progress >= goal.targetCount;
            const percentage = Math.min((progress / goal.targetCount) * 100, 100);

            const goalStatusText = isCompleted ?
                (window.languageManager ? window.languageManager.getText('completed') : '已完成') :
                (window.languageManager ? window.languageManager.getText('daily_progress') : '今日进度');

            const checkInBtnText = isCompleted ?
                (window.languageManager ? window.languageManager.getText('completed') : '已完成') :
                '+ ' + (window.languageManager ? window.languageManager.getText('check_in_btn') : '打卡');

            return `
                <div class="goal-card ${isCompleted ? 'completed' : ''}" data-goal-id="${goal.id}">
                    <div class="goal-header">
                        <div class="goal-name">${goal.name}</div>
                        <div class="goal-status ${isCompleted ? 'completed' : 'in-progress'}">
                            ${goalStatusText}
                        </div>
                    </div>
                    <div class="progress-section">
                        <div class="progress-info">
                            <span class="progress-text">${goalStatusText}</span>
                            <span class="progress-text">${progress}/${goal.targetCount}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                    <button class="check-in-btn" ${isCompleted ? 'disabled' : ''} 
                            data-action="checkin" data-goal-id="${goal.id}"
                            onmousedown="this.classList.add('pulse')"
                            onmouseup="this.classList.remove('pulse')"
                            onmouseleave="this.classList.remove('pulse')">
                        ${checkInBtnText}
                    </button>
                </div>
            `;
        }).join('');

        // 为按钮添加事件监听器
        container.querySelectorAll('.goal-actions button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const goalId = button.dataset.goalId;
                const action = button.dataset.action;

                if (action === 'edit') {
                    this.showEditGoalForm(goalId);
                } else if (action === 'delete') {
                    this.showDeleteGoalConfirm(goalId);
                }
            });
        });

        // 为打卡按钮添加事件监听器
        container.querySelectorAll('.check-in-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const goalId = button.dataset.goalId;
                this.checkIn(goalId);
            });
        });

        // 添加卡片点击事件（显示日历）- 排除按钮点击
        container.querySelectorAll('.goal-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // 如果点击的是按钮或按钮内部，不触发日历
                if (e.target.closest('.check-in-btn')) {
                    return;
                }

                const goalId = card.dataset.goalId;
                this.showCalendar(goalId);
            });
        });
    }

    // 打卡
    checkIn(goalId) {
        const goal = this.goals.find(g => g.id === goalId);
        if (!goal) return;

        const today = this.getDateString(new Date());
        let record = this.records.find(r => r.goalId === goalId && r.date === today);

        if (record) {
            record.count++;
            record.updatedAt = new Date().toISOString();
        } else {
            record = {
                id: Date.now().toString(),
                goalId,
                date: today,
                count: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            this.records.push(record);
        }

        this.saveData();
        this.renderGoals();

        const progress = record.count;
        const isCompleted = progress >= goal.targetCount;

        if (isCompleted) {
            let message;
            if (window.languageManager) {
                message = window.languageManager.getText('goal_completed_message');
                // 替换占位符
                message = message.replace('${goal.name}', goal.name);
            } else {
                message = `恭喜！${goal.name} 今日目标已完成！`;
            }
            this.showToast(`🎉 ${message}`);
        } else {
            const checkInText = window.languageManager ? window.languageManager.getText('check_in_btn') : '打卡';
            const successText = window.languageManager ? window.languageManager.getText('check_in_success') : '打卡成功';
            this.showToast(`${goal.name} ${successText}！${progress}/${goal.targetCount}`);
        }
    }

    // 获取今日记录
    getTodayRecord(goalId) {
        const today = this.getDateString(new Date());
        return this.records.find(r => r.goalId === goalId && r.date === today);
    }

    // 获取指定日期的记录
    getRecordByDate(goalId, date) {
        return this.records.find(r => r.goalId === goalId && r.date === date);
    }

    // 获取一周日期列表（周一到周日）
    getWeekDates() {
        const today = new Date();
        const currentDay = today.getDay(); // 0 = 周日, 1 = 周一, ..., 6 = 周六

        // 计算本周一的日期
        const monday = new Date(today);
        const diff = currentDay === 0 ? -6 : currentDay - 1; // 如果今天是周日，则减去6天到上周一
        monday.setDate(today.getDate() - diff);

        // 生成一周日期
        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            weekDates.push(date);
        }

        return weekDates;
    }

    // 获取指定日期的所有打卡记录
    getRecordsByDate(date) {
        const dateStr = this.getDateString(date);
        return this.records.filter(r => r.date === dateStr);
    }

    // 获取指定日期是否有打卡记录
    hasRecordsOnDate(date) {
        const dateStr = this.getDateString(date);
        return this.records.some(r => r.date === dateStr);
    }

    // 获取指定日期的打卡完成状态
    getDateCompletionStatus(date) {
        const dateStr = this.getDateString(date);
        const dayRecords = this.records.filter(r => r.date === dateStr);

        if (dayRecords.length === 0) {
            return 'none';
        }

        const allCompleted = dayRecords.every(record => {
            const goal = this.goals.find(g => g.id === record.goalId);
            return goal && record.count >= goal.targetCount;
        });

        return allCompleted ? 'completed' : 'partial';
    }

    // 打卡
    checkIn(goalId) {
        const goal = this.goals.find(g => g.id === goalId);
        if (!goal) return;

        // 使用本地日期字符串，避免时区问题
        const today = new Date();
        const todayStr = this.getDateString(today);

        let record = this.records.find(r => r.goalId === goalId && r.date === todayStr);

        if (record) {
            record.count++;
            record.updatedAt = new Date().toISOString();
        } else {
            record = {
                id: Date.now().toString(),
                goalId,
                date: todayStr,
                count: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            this.records.push(record);
        }

        this.saveData();
        this.renderGoals();

        const progress = record.count;
        const isCompleted = progress >= goal.targetCount;

        if (isCompleted) {
            let message;
            if (window.languageManager) {
                message = window.languageManager.getText('goal_completed_message');
                // 替换占位符
                message = message.replace('${goal.name}', goal.name);
            } else {
                message = `恭喜！${goal.name} 今日目标已完成！`;
            }
            this.showToast(`🎉 ${message}`);
        } else {
            const checkInText = window.languageManager ? window.languageManager.getText('check_in_btn') : '打卡';
            const successText = window.languageManager ? window.languageManager.getText('check_in_success') : '打卡成功';
            this.showToast(`${goal.name} ${successText}！${progress}/${goal.targetCount}`);
        }
    }

    // 显示日历
    showCalendar(goalId) {
        const goal = this.goals.find(g => g.id === goalId);
        if (!goal) return;

        this.currentCalendarGoal = goal;
        this.currentCalendarDate = new Date();

        const calendarTitle = window.languageManager ? window.languageManager.getText('check_in_calendar') : '打卡日历';
        document.getElementById('calendarTitle').textContent = `${goal.name} - ${calendarTitle}`;
        this.renderCalendar();
        this.showModal('calendarModal');

        // 日历导航
        document.getElementById('closeCalendarModal').onclick = () => {
            this.hideModal('calendarModal');
        };
    }

    // 渲染日历
    renderCalendar() {
            const container = document.getElementById('calendarContainer');
            const year = this.currentCalendarDate.getFullYear();
            const month = this.currentCalendarDate.getMonth();

            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startDate = new Date(firstDay);
            startDate.setDate(startDate.getDate() - firstDay.getDay());

            let html = `
            <div class="calendar-header">
                <button class="calendar-nav" onclick="app.changeCalendarMonth(-1)">‹</button>
                <h3>${year}年${month + 1}月</h3>
                <button class="calendar-nav" onclick="app.changeCalendarMonth(1)">›</button>
            </div>
            <div class="calendar-grid">
                ${['日', '一', '二', '三', '四', '五', '六'].map(day => 
                    `<div class="calendar-weekday">${day}</div>`
                ).join('')}
        `;

        // 只显示当前月份的天数
        const currentDate = new Date(startDate);
        
        // 显示完整的周行，但只标记当前月份的日期
        for (let week = 0; week < 6; week++) {
            for (let day = 0; day < 7; day++) {
                const dateStr = this.getDateString(currentDate);
                const isToday = this.isToday(currentDate);
                const isCurrentMonth = currentDate.getMonth() === month;
                
                let status = '';
                let statusText = '';
                
                // 只在当前月份显示打卡状态
                if (isCurrentMonth) {
                    const record = this.getRecordByDate(this.currentCalendarGoal.id, dateStr);
                    if (record && record.count > 0) {
                        if (record.count >= this.currentCalendarGoal.targetCount) {
                            status = 'completed';
                            statusText = '✅';
                        } else {
                            status = 'has-record';
                            statusText = '⭕';
                        }
                    }
                }

                const lunarDate = this.getLunarDate(currentDate);
                
                // 非当前月份的日期显示为空白
                if (!isCurrentMonth) {
                    html += `
                        <div class="calendar-day other-month" data-date="${dateStr}">
                            <div class="calendar-day-number"></div>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="calendar-day ${status} ${isToday ? 'today' : ''}"
                             data-date="${dateStr}">
                            <div class="calendar-day-number">${currentDate.getDate()}</div>
                            ${statusText ? `<div class="calendar-day-status">${statusText}</div>` : ''}
                            <div class="calendar-lunar">${lunarDate}</div>
                        </div>
                    `;
                }

                currentDate.setDate(currentDate.getDate() + 1);
            }
        }

        html += '</div>';
        container.innerHTML = html;
    }

    // 切换日历月份
    changeCalendarMonth(direction) {
        this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() + direction);
        this.renderCalendar();
    }

    // 显示打卡记录
    showRecords() {
        // 自动定位到当天
        this.currentSelectedDate = new Date();
        this.renderWeekDateList();
        this.renderRecords();
        this.showModal('recordsModal');
        
        document.getElementById('closeRecordsModal').onclick = () => {
            this.hideModal('recordsModal');
        };
    }

    // 渲染一周日期列表
    renderWeekDateList() {
        const weekDates = this.getWeekDates();
        const today = new Date();
        const container = document.getElementById('weekDateList');
        
        // 获取本地化的星期名称
        const dayNames = [
            window.languageManager ? window.languageManager.getText('monday') : '周一',
            window.languageManager ? window.languageManager.getText('tuesday') : '周二',
            window.languageManager ? window.languageManager.getText('wednesday') : '周三',
            window.languageManager ? window.languageManager.getText('thursday') : '周四',
            window.languageManager ? window.languageManager.getText('friday') : '周五',
            window.languageManager ? window.languageManager.getText('saturday') : '周六',
            window.languageManager ? window.languageManager.getText('sunday') : '周日'
        ];
        
        let html = '';
        weekDates.forEach((date, index) => {
            const isToday = this.isSameDate(date, today);
            const completionStatus = this.getDateCompletionStatus(date);
            const hasRecords = this.hasRecordsOnDate(date);
            
            let statusText = '';
            let statusClass = '';
            
            if (hasRecords) {
                if (completionStatus === 'completed') {
                    statusText = '✅';
                    statusClass = 'completed';
                } else {
                    statusText = '⭕';
                    statusClass = 'partial';
                }
            } else {
                statusText = '';
                statusClass = 'none';
            }
            
            const isSelected = this.isSameDate(date, this.currentSelectedDate);
            
            html += `
                <div class="week-date-item ${isToday ? 'today' : ''} ${isSelected ? 'active' : ''}" 
                     data-date="${this.getDateString(date)}"
                     onclick="app.selectWeekDate('${this.getDateString(date)}')">
                    <div class="week-date-day">${dayNames[index]}</div>
                    <div class="week-date-date">${date.getDate()}</div>
                    <div class="week-date-status">${statusText}</div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }

    // 选择一周中的日期
    selectWeekDate(dateStr) {
        this.currentSelectedDate = new Date(dateStr);
        this.renderWeekDateList(); // 重新渲染日期列表以更新选中状态
        this.renderRecords(); // 重新渲染对应日期的记录
    }

    // 判断两个日期是否为同一天
    isSameDate(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    // 渲染打卡记录
    renderRecords() {
        const container = document.getElementById('recordsContainer');
        
        // 获取当前选中日期的记录
        const selectedDateStr = this.getDateString(this.currentSelectedDate);
        const dayRecords = this.getRecordsByDate(this.currentSelectedDate);
        
        if (dayRecords.length === 0 && this.records.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>暂无打卡记录</p></div>';
            return;
        }
        
        if (dayRecords.length === 0) {
            const formattedDate = this.formatDate(this.currentSelectedDate);
            container.innerHTML = `<div class="empty-state"><p>${formattedDate} 暂无打卡记录</p></div>`;
            return;
        }

        let html = '';
        
        // 显示选中日期的记录
        const dateObj = this.currentSelectedDate;
        const dateStr = this.formatDate(dateObj);

        html += `
            <div class="record-date-group">
                <h4 style="margin-bottom: 12px; color: var(--text-secondary);">${dateStr}</h4>
        `;

        dayRecords.forEach(record => {
            const goal = this.goals.find(g => g.id === record.goalId);
            if (goal) {
                const isCompleted = record.count >= goal.targetCount;
                html += `
                    <div class="record-item">
                        <div class="record-info">
                            <div class="record-goal-name">${goal.name}</div>
                            <div class="record-date">${this.formatTime(record.updatedAt)}</div>
                        </div>
                        <div class="record-progress">
                            <span style="color: ${isCompleted ? 'var(--primary-color)' : 'var(--text-secondary)'};">
                                ${record.count}/${goal.targetCount}
                            </span>
                        </div>
                    </div>
                `;
            }
        });

        html += '</div>';

        container.innerHTML = html;
    }

    // 显示目标管理
    showManageGoals() {
        this.renderManageGoals();
        this.showModal('manageGoalsModal');
        
        document.getElementById('closeManageGoalsModal').onclick = () => {
            this.hideModal('manageGoalsModal');
        };
    }

    // 渲染目标管理
    renderManageGoals() {
        const container = document.getElementById('manageGoalsContainer');
        
        if (this.goals.length === 0) {
            const emptyText = window.languageManager ? window.languageManager.getText('empty_title') : '暂无目标';
            container.innerHTML = `<div class="empty-state"><p>${emptyText}</p></div>`;
            return;
        }

        container.innerHTML = this.goals.map(goal => {
            const todayRecord = this.getTodayRecord(goal.id);
            const progress = todayRecord ? todayRecord.count : 0;
            const isCompleted = progress >= goal.targetCount;
            
            // 格式化日期显示
            const formattedStartDate = this.formatDateToYYYYMMDD(goal.startDate);
            const formattedEndDate = goal.endDate ? this.formatDateToYYYYMMDD(goal.endDate) : null;
            
            // 获取多语言文本
            const toDateText = window.languageManager ? window.languageManager.getText('to_date') : '至';
            const dailyCountText = window.languageManager ? 
                window.languageManager.getText('daily_count').replace('{count}', goal.targetCount) : 
                `每日${goal.targetCount}次`;
            
            const editBtnText = window.languageManager ? window.languageManager.getText('edit_goal_btn') : '编辑';
            const deleteBtnText = window.languageManager ? window.languageManager.getText('delete_goal_btn') : '删除';
            const shareBtnText = window.languageManager ? window.languageManager.getText('share_btn') : '分享';
            
            return `
                <div class="manage-goal-item">
                    <div class="manage-goal-info">
                        <div class="manage-goal-header">
                            <div class="manage-goal-name">${goal.name}</div>
                            <div class="manage-goal-progress">
                                <div class="progress-text" style="color: ${isCompleted ? 'var(--primary-color)' : 'var(--text-secondary)'};">
                                    ${progress}/${goal.targetCount}
                                </div>
                            </div>
                        </div>
                        <div class="manage-goal-date">
                            ${formattedStartDate} ${formattedEndDate ? toDateText + ' ' + formattedEndDate : ''} | 
                            ${dailyCountText}
                        </div>
                        <div class="manage-goal-actions">
                            <button class="btn-small btn-share" onclick="app.shareGoal('${goal.id}')" title="${shareBtnText}">${shareBtnText}</button>
                            <button class="btn-small btn-edit" onclick="app.showEditGoalForm('${goal.id}')" title="${editBtnText}">${editBtnText}</button>
                            <button class="btn-small btn-delete" onclick="app.showDeleteGoalConfirm('${goal.id}')" title="${deleteBtnText}">${deleteBtnText}</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 删除目标
    // 显示删除目标确认对话框（自定义模态框）
    showDeleteGoalConfirm(goalId) {
        const goal = this.goals.find(g => g.id === goalId);
        if (!goal) return;
    
        // 保存要删除的目标ID
        this.currentDeletingGoal = goalId;
        
        // 显示目标名称
        document.getElementById('deleteGoalName').textContent = goal.name;
        
        // 显示删除确认模态框
        this.showModal('deleteConfirmModal');
    }

    // 确认删除目标
    confirmDeleteGoal() {
        const goalId = this.currentDeletingGoal;
        if (!goalId) return;
    
        const goal = this.goals.find(g => g.id === goalId);
        if (!goal) return;
    
        // 删除目标和相关记录
        this.goals = this.goals.filter(g => g.id !== goalId);
        this.records = this.records.filter(r => r.goalId !== goalId);
        
        // 保存数据
        this.saveData();
        
        // 刷新界面
        this.renderGoals();
        this.renderManageGoals();
        
        // 隐藏确认对话框
        this.hideModal('deleteConfirmModal');
        
        // 清空当前删除状态
        this.currentDeletingGoal = null;
        
        const deletedText = window.languageManager ? window.languageManager.getText('deleted') : '已删除';
            this.showToast(`目标"${goal.name}"${deletedText}`);
    }

    // 显示编辑目标表单
    showEditGoalForm(goalId) {
        const goal = this.goals.find(g => g.id === goalId);
        if (!goal) return;

        // 保存当前编辑的目标ID
        this.currentEditingGoal = goalId;

        // 填充表单数据
        document.getElementById('editGoalName').value = goal.name;
        document.getElementById('editTargetCount').value = goal.targetCount;
        document.getElementById('editStartDate').value = goal.startDate;
        document.getElementById('editEndDate').value = goal.endDate || '';

        // 设置日期输入框的placeholder显示格式
        const editStartDateInput = document.getElementById('editStartDate');
        const editEndDateInput = document.getElementById('editEndDate');
        
        if (goal.startDate) {
            const formattedStartDate = this.formatDateToYYYYMMDD(goal.startDate);
            editStartDateInput.placeholder = formattedStartDate;
        }
        if (goal.endDate) {
            const formattedEndDate = this.formatDateToYYYYMMDD(goal.endDate);
            editEndDateInput.placeholder = formattedEndDate;
        }

        // 显示编辑模态框
        this.showModal('editGoalModal');
    }

    // 保存编辑的目标
    saveEditedGoal() {
        const goalId = this.currentEditingGoal;
        const goal = this.goals.find(g => g.id === goalId);
        if (!goal) return;

        // 获取表单数据
        const name = document.getElementById('editGoalName').value.trim();
        const targetCount = parseInt(document.getElementById('editTargetCount').value);
        const startDate = document.getElementById('editStartDate').value;
        const endDate = document.getElementById('editEndDate').value;

        // 验证数据
        if (!name || !targetCount || !startDate) {
            const completeInfoText = window.languageManager ? window.languageManager.getText('complete_info_error') : '请填写完整信息';
            this.showToast(completeInfoText, 'error');
            return;
        }

        if (targetCount < 1 || targetCount > 100) {
            const targetCountErrorText = window.languageManager ? window.languageManager.getText('target_count_error') : '目标次数必须在1-100之间';
            this.showToast(targetCountErrorText, 'error');
            return;
        }

        if (endDate && new Date(startDate) > new Date(endDate)) {
            const dateErrorText = window.languageManager ? window.languageManager.getText('date_error') : '结束日期不能早于开始日期';
            this.showToast(dateErrorText, 'error');
            return;
        }

        // 检查目标名称是否已存在（不区分大小写），排除当前编辑的目标
        const existingGoal = this.goals.find(g => 
            g.id !== goalId && g.name.toLowerCase() === name.toLowerCase() && g.isActive
        );
        
        if (existingGoal) {
            const goalExistsText = window.languageManager ? window.languageManager.getText('error_goal_exists') : '该目标已存在';
            this.showToast(goalExistsText, 'error');
            return;
        }

        // 更新目标数据
        goal.name = name;
        goal.targetCount = targetCount;
        goal.startDate = startDate;
        goal.endDate = endDate;

        // 保存数据
        this.saveData();
        
        // 刷新界面
        this.renderGoals();
        this.hideModal('editGoalModal');
        
        // 清空当前编辑状态
        this.currentEditingGoal = null;
        
        const updateSuccessText = window.languageManager ? window.languageManager.getText('update_success') : '修改成功';
            this.showToast(`${updateSuccessText}！`);
    }

    // 删除目标
    deleteGoal(goalId) {
        const goal = this.goals.find(g => g.id === goalId);
        if (!goal) return;

        this.goals = this.goals.filter(g => g.id !== goalId);
        this.records = this.records.filter(r => r.goalId !== goalId);
        this.saveData();
        this.renderGoals();
        this.renderManageGoals();
        const deletedText = window.languageManager ? window.languageManager.getText('deleted') : '已删除';
            this.showToast(`目标"${goal.name}"${deletedText}`);
    }

    // 应用设置
    applySettings() {
        this.applyTheme();
        // 语言功能已删除
        
        // 设置表单值
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            themeSelect.value = this.settings.theme;
        }
    }

    // 检测系统深色模式
    detectSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    // 初始化主题（带自动检测）
    initTheme() {
        // 如果用户没有手动设置过主题，或者设置为自动检测
        if (!this.settings.theme || this.settings.theme === 'auto') {
            const systemTheme = this.detectSystemTheme();
            this.settings.theme = 'auto'; // 设置为自动检测
            this.saveData();
            // 应用检测到的系统主题
            document.documentElement.setAttribute('data-theme', systemTheme);
        } else {
            this.applyTheme();
        }
        
        // 设置主题选择器的值
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            themeSelect.value = this.settings.theme;
        }
        
        // 监听系统主题变化
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // 只有在用户设置为自动检测时才自动切换
                if (this.settings.theme === 'auto') {
                    const newTheme = e.matches ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', newTheme);
                }
            });
        }
    }

    // 应用主题
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.settings.theme);
    }



    // 初始化侧滑手势
    initSwipeGestures() {
        let startX = 0;
        let startY = 0;
        let startTime = 0;
        const minSwipeDistance = 50; // 最小滑动距离
        const maxSwipeTime = 300; // 最大滑动时间（毫秒）
        const maxVerticalDistance = 50; // 最大垂直偏移距离

        // 为模态框添加触摸事件监听
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            startTime = Date.now();
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            // 如果有活动的模态框，防止默认滚动行为
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                const diffX = startX - currentX;
                const diffY = startY - currentY;
                
                // 如果是水平滑动且距离足够，防止垂直滚动
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
                    e.preventDefault();
                }
            }
        }, { passive: false });

        document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const endTime = Date.now();
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            const timeDiff = endTime - startTime;
            
            // 检查是否是有效的侧滑手势
            if (Math.abs(diffX) > minSwipeDistance && 
                Math.abs(diffY) < maxVerticalDistance && 
                timeDiff < maxSwipeTime) {
                
                // 从右向左滑动（关闭模态框）
                if (diffX > 0) {
                    const activeModal = document.querySelector('.modal.active');
                    if (activeModal) {
                        // 检查滑动是否发生在模态框内容区域
                        const modalContent = activeModal.querySelector('.modal-content');
                        if (modalContent) {
                            const rect = modalContent.getBoundingClientRect();
                            const touchEndX = endX;
                            const touchEndY = endY;
                            
                            // 确保触摸点在模态框内容区域内
                            if (touchEndX >= rect.left && touchEndX <= rect.right &&
                                touchEndY >= rect.top && touchEndY <= rect.bottom) {
                                
                                // 添加关闭动画效果
                                modalContent.style.transform = 'translateX(-100%)';
                                modalContent.style.opacity = '0';
                                
                                setTimeout(() => {
                                    this.hideModal(activeModal.id);
                                    // 重置样式
                                    modalContent.style.transform = '';
                                    modalContent.style.opacity = '';
                                }, 200);
                            }
                        }
                    }
                }
            }
        }, { passive: true });
    }

    // 初始化字符计数器
    initCharacterCounters() {
        // 为创建目标表单的输入框添加字符计数
        const goalNameInput = document.getElementById('goalName');
        const goalNameCounter = document.getElementById('goalNameCounter');
        
        if (goalNameInput && goalNameCounter) {
            this.setupCharacterCounter(goalNameInput, goalNameCounter, 10);
        }
        
        // 为编辑目标表单的输入框添加字符计数
        const editGoalNameInput = document.getElementById('editGoalName');
        const editGoalNameCounter = document.getElementById('editGoalNameCounter');
        
        if (editGoalNameInput && editGoalNameCounter) {
            this.setupCharacterCounter(editGoalNameInput, editGoalNameCounter, 10);
        }
    }

    // 数据导出功能
    exportData() {
        try {
            // 收集所有数据
            const exportData = {
                version: '1.0',
                exportDate: new Date().toISOString(),
                goals: this.goals,
                records: this.records,
                settings: this.settings,
                language: this.settings.language || 'zh-CN'
            };

            // 创建JSON文件
            const jsonData = JSON.stringify(exportData, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            
            // 创建下载链接
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `simplelist_backup_${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.showToast(window.languageManager ? window.languageManager.getText('export_success') : '数据导出成功！', 'success');
        } catch (error) {
            console.error('数据导出失败:', error);
            this.showToast(window.languageManager ? window.languageManager.getText('export_failed') : '数据导出失败，请重试', 'error');
        }
    }

    // 数据导入功能
    importData(file) {
        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importData = JSON.parse(e.target.result);
                    
                    // 验证数据格式
                    if (!importData.goals || !importData.records || !importData.settings) {
                        throw new Error('数据格式不正确');
                    }

                    // 确认导入
                    const confirmText = window.languageManager ? window.languageManager.getText('import_confirm') : '导入数据将覆盖现有数据，是否继续？';
                    if (confirm(confirmText)) {
                        // 更新数据
                        this.goals = importData.goals;
                        this.records = importData.records;
                        this.settings = importData.settings;

                        // 保存到localStorage
                        this.saveData();

                        // 重新初始化应用
                        this.init();

                        this.showToast(window.languageManager ? window.languageManager.getText('import_success') : '数据导入成功！', 'success');
                    }
                } catch (error) {
                    console.error('数据解析失败:', error);
                    this.showToast(window.languageManager ? window.languageManager.getText('invalid_data_format') : '数据格式错误，请检查文件', 'error');
                }
            };
            reader.readAsText(file);
        } catch (error) {
            console.error('文件读取失败:', error);
            this.showToast(window.languageManager ? window.languageManager.getText('import_failed') : '文件读取失败，请重试', 'error');
        }
    }
    
    // 设置字符计数器
    setupCharacterCounter(input, counter, maxLength) {
        const updateCounter = () => {
            const currentLength = input.value.length;
            counter.textContent = `${currentLength}/${maxLength}`;
            
            // 当接近限制时改变颜色
            if (currentLength >= maxLength * 0.9) {
                counter.classList.add('warning');
            } else {
                counter.classList.remove('warning');
            }
        };
        
        // 初始化计数器
        updateCounter();
        
        // 监听输入事件
        input.addEventListener('input', updateCounter);
        input.addEventListener('keyup', updateCounter);
        
        // 当模态框显示时更新计数器
        const updateCounterWhenModalShown = () => {
            setTimeout(updateCounter, 100); // 延迟一下确保值已设置
        };
        
        // 为相关的模态框添加显示事件监听
        if (input.id === 'goalName') {
            const addGoalModal = document.getElementById('addGoalModal');
            if (addGoalModal) {
                // 监听模态框显示事件
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                            if (addGoalModal.classList.contains('active')) {
                                updateCounterWhenModalShown();
                            }
                        }
                    });
                });
                observer.observe(addGoalModal, { attributes: true });
            }
        } else if (input.id === 'editGoalName') {
            const editGoalModal = document.getElementById('editGoalModal');
            if (editGoalModal) {
                // 监听模态框显示事件
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                            if (editGoalModal.classList.contains('active')) {
                                updateCounterWhenModalShown();
                            }
                        }
                    });
                });
                observer.observe(editGoalModal, { attributes: true });
            }
        }
    }
    
    // 显示提示消息
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');

        // 清除之前的定时器
        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
        }

        // 设置新的定时器
        this.toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 工具函数：格式化日期为本地日期字符串
    getDateString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // 工具函数：格式化显示日期
    formatDate(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        // 获取星期几的文本
        let weekdays;
        if (window.languageManager) {
            weekdays = [
                window.languageManager.getText('sunday'),
                window.languageManager.getText('monday'),
                window.languageManager.getText('tuesday'),
                window.languageManager.getText('wednesday'),
                window.languageManager.getText('thursday'),
                window.languageManager.getText('friday'),
                window.languageManager.getText('saturday')
            ];
        } else {
            weekdays = ['日', '一', '二', '三', '四', '五', '六'];
        }
        
        const weekday = weekdays[date.getDay()];
        
        if (window.languageManager) {
            const dateFormat = window.languageManager.getText('date_format');
            return dateFormat.replace('{year}', year).replace('{month}', month).replace('{day}', day).replace('{weekday}', weekday);
        }
        
        return `${year}年${month}月${day}日 星期${weekday}`;
    }

    // 工具函数：格式化时间
    formatTime(dateString) {
        const date = new Date(dateString);
        
        if (window.languageManager) {
            const locale = window.languageManager.getText('time_locale');
            return date.toLocaleTimeString(locale, { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }
        
        return date.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    // 工具函数：判断是否为今天
    isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }

    // 工具函数：获取农历日期（简化版）
    getLunarDate(date) {
        // 这里应该使用农历转换算法，为了简化返回空字符串
        // 实际项目中可以使用 lunar-javascript 等库
        return '';
    }

    // 分享目标功能
    shareGoal(goalId) {
        const goal = this.goals.find(g => g.id === goalId);
        if (!goal) return;

        this.currentSharingGoal = goal;
        
        // 生成分享图片
        this.generateShareImage(goal);
        
        // 显示分享模态框
        this.showModal('shareGoalModal');
    }

    // 生成分享图片
    generateShareImage(goal) {
        const canvas = document.getElementById('shareCanvas');
        const ctx = canvas.getContext('2d');
        
        // 设置画布尺寸
        canvas.width = 400;
        canvas.height = 500;
        
        // 获取当前主题颜色
        const isDarkMode = this.settings.theme === 'dark';
        const bgColor = '#FAFAFA'; // 统一背景颜色为 #FAFAFA
        const textColor = isDarkMode ? '#333333' : '#333333'; // 深色模式下也使用深色文字以确保对比度
        const secondaryTextColor = isDarkMode ? '#666666' : '#666666';
        const primaryColor = '#4CAF50';
        const secondaryColor = '#2196F3';
        
        // 清空画布 - 使用新的背景颜色
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 添加边框
        ctx.strokeStyle = isDarkMode ? '#e0e0e0' : '#e0e0e0';
        ctx.lineWidth = 2;
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
        
        // 重新计算垂直居中位置 - 向下调整
        const totalContentHeight = 320; // 增加内容总高度
        const startY = (canvas.height - totalContentHeight) / 2 + 20; // 向下移动20像素
        const padding = 30;
        let y = startY;
        
        // 标题
        ctx.fillStyle = textColor;
        ctx.font = 'bold 24px Arial, sans-serif';
        ctx.textAlign = 'center';
        const titleText = window.languageManager ? window.languageManager.getText('share_image_title') : '我的目标进度';
        ctx.fillText(titleText, canvas.width / 2, y);
        y += 50;
        
        // 当前日期
        const today = new Date();
        const dateText = this.formatDate(today);
        ctx.fillStyle = secondaryTextColor;
        ctx.font = '16px Arial, sans-serif';
        ctx.fillText(dateText, canvas.width / 2, y);
        y += 40;
        
        // 目标名称
        ctx.fillStyle = primaryColor;
        ctx.font = 'bold 20px Arial, sans-serif';
        ctx.fillText(goal.name, canvas.width / 2, y);
        y += 40;
        
        // 计算总打卡次数（所有日期的记录总和）
        const allRecords = this.records.filter(r => r.goalId === goal.id);
        const totalProgress = allRecords.reduce((sum, record) => sum + record.count, 0);
        const progressText = window.languageManager ? 
            window.languageManager.getText('daily_progress') + ` ${totalProgress}/${goal.targetCount}` :
            `今日进度 ${totalProgress}/${goal.targetCount}`;
        
        ctx.fillStyle = textColor;
        ctx.font = '18px Arial, sans-serif';
        ctx.fillText(progressText, canvas.width / 2, y);
        y += 40;
        
        // 进度条
        const progressBarWidth = 200;
        const progressBarHeight = 20;
        const progressBarX = (canvas.width - progressBarWidth) / 2;
        
        // 进度条背景
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(progressBarX, y, progressBarWidth, progressBarHeight);
        
        // 进度百分比
        const progressPercent = Math.min(totalProgress / goal.targetCount, 1);
        ctx.fillStyle = primaryColor;
        ctx.fillRect(progressBarX, y, progressBarWidth * progressPercent, progressBarHeight);
        
        // 进度百分比
        ctx.fillStyle = textColor;
        ctx.font = '12px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.round(progressPercent * 100)}%`, canvas.width / 2, y + 14);
        y += 60;
        
        // 时间相关信息
        ctx.textAlign = 'center';
        ctx.fillStyle = secondaryTextColor;
        ctx.font = '16px Arial, sans-serif';
        
        if (goal.endDate) {
            // 有结束日期的情况
            const startDate = new Date(goal.startDate);
            const endDate = new Date(goal.endDate);
            const dateRangeText = `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()}-${endDate.getFullYear()}.${endDate.getMonth() + 1}.${endDate.getDate()}`;
            ctx.fillText(dateRangeText, canvas.width / 2, y);
            y += 25;
            
            // 计算剩余天数
            const today = new Date();
            const remainingDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
            const remainingText = window.languageManager ?
                window.languageManager.getText('days_remaining_text').replace('{days}', remainingDays) :
                `距离目标结束还有${remainingDays}天`;
            ctx.fillText(remainingText, canvas.width / 2, y);
        } else {
            // 无结束日期的情况
            const startDate = new Date(goal.startDate);
            const today = new Date();
            const persistedDays = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
            const persistedText = window.languageManager ?
                window.languageManager.getText('days_persisted_text').replace('{days}', persistedDays) :
                `已坚持${persistedDays}天`;
            ctx.fillText(persistedText, canvas.width / 2, y);
        }
        
        // 在底部添加"极简打卡"文字（绿色）和"SimpleList"小号文字
        ctx.fillStyle = primaryColor; // 使用绿色
        ctx.font = '15px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('极简打卡', canvas.width / 2, canvas.height - 30); // 向下移动15像素
        
        // 添加"SimpleList"小号文字
        ctx.fillStyle = secondaryTextColor;
        ctx.font = '10px Arial, sans-serif';
        ctx.fillText('SimpleList', canvas.width / 2, canvas.height - 15); // 相应向下移动15像素
        
        // 添加装饰元素
        this.addShareDecorations(ctx, canvas, isDarkMode);
    }

    // 添加分享图片的装饰元素
    addShareDecorations(ctx, canvas, isDarkMode) {
        const primaryColor = '#4CAF50';
        const secondaryColor = '#2196F3';
        
        // 添加一些装饰圆圈
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = primaryColor;
        ctx.beginPath();
        ctx.arc(50, 100, 30, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = secondaryColor;
        ctx.beginPath();
        ctx.arc(canvas.width - 50, canvas.height - 100, 25, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = 1;
        
        // 添加底部装饰线
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(50, canvas.height - 50);
        ctx.lineTo(canvas.width - 50, canvas.height - 50);
        ctx.stroke();
    }

    // 保存分享图片
    saveShareImage() {
        const canvas = document.getElementById('shareCanvas');
        const goal = this.currentSharingGoal;
        
        if (!canvas || !goal) return;
        
        // 将canvas转换为blob
        canvas.toBlob((blob) => {
            if (blob) {
                // 创建下载链接
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `simplelist_goal_${goal.name}_${new Date().toISOString().slice(0, 10)}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                // 显示成功消息
                const saveSuccessText = window.languageManager ? window.languageManager.getText('save_success') : '保存成功';
                this.showToast(saveSuccessText, 'success');
                
                // 关闭分享模态框
                this.hideModal('shareGoalModal');
            }
        }, 'image/png');
    }
}

// 初始化应用
const app = new SimpleList();

// 导出供全局使用
window.app = app;