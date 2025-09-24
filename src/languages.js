// 语言配置文件
const translations = {
    'zh-CN': {
        // 头部
        'app_title': '极简打卡',
        'add_goal_btn': '+ 添加目标',

        // 主内容区
        'empty_title': '还没有创建任何目标',
        'empty_desc': '点击上方按钮开始你的第一个目标吧！',
        'empty_icon': '📝',

        // 底部导航
        'nav_features': '功能',
        'nav_settings': '设置',

        // 添加目标模态框
        'create_goal_title': '创建新目标',
        'goal_name_label': '目标名称',
        'goal_name_placeholder': '例如：喝水',
        'target_count_label': '每日目标次数',
        'start_date_label': '开始日期',
        'end_date_label': '结束日期（可选）',
        'cancel_btn': '取消',
        'create_goal_btn': '创建目标',

        // 功能菜单
        'features_title': '功能',
        'records_menu': '打卡记录',
        'manage_goals_menu': '目标管理',

        // 设置模态框
        'settings_title': '设置',
        'theme_label': '主题',
        'theme_auto': '自动检测',
        'theme_light': '浅色模式',
        'theme_dark': '深色模式',
        'language_label': '语言',
        'about_software': '关于软件',
        'view_details': '查看详情',
        'about_software_title': '关于软件',
        'software_version': '软件版本',
        'author': '作者',
        'declaration': '声明',
        'declaration_text': '该软件为Darling_ATRI开发，永久免费开源，请勿倒卖',
        'download_address': '下载地址',
        'download_link_text': '点我去官网',
        'close_btn': '关闭',
        'data_management': '数据管理',
        'export_data': '导出数据',
        'import_data': '导入数据',
        'export_success': '数据导出成功！',
        'import_success': '数据导入成功！',
        'export_failed': '数据导出失败，请重试',
        'import_failed': '数据导入失败，请重试',
        'invalid_data_format': '数据格式错误，请检查文件',
        'import_confirm': '导入数据将覆盖现有数据，是否继续？',

        // 日历视图
        'calendar_title': '目标日历',

        // 打卡记录
        'records_title': '打卡记录',

        // 目标管理
        'manage_goals_title': '目标管理',
        'edit_goal_btn': '编辑',
        'delete_goal_btn': '删除',

        // 编辑目标
        'edit_goal_title': '编辑目标',
        'save_changes_btn': '保存修改',

        // 删除确认
        'delete_confirm_title': '确认删除',
        'delete_confirm_question': '确定要删除这个目标吗？',
        'delete_warning_text': '注意：删除后该目标的所有打卡记录也会被删除，此操作不可恢复。',
        'confirm_delete_btn': '确认删除',

        // 删除确认
        'delete_confirm_title': '确认删除',
        'delete_confirm_text': '确定要删除这个目标吗？此操作不可恢复。',
        'confirm_delete_btn': '确认删除',

        // 分享功能
        'share_goal': '分享目标',
        'share_btn': '分享',
        'save_image_btn': '保存图片',
        'share_image_title': '我的目标进度',
        'days_remaining_text': '距离目标结束还有{days}天',
        'days_persisted_text': '已坚持{days}天',
        'save_success': '保存成功',

        // 目标卡片
        'daily_progress': '今日进度',
        'completed': '已完成',
        'click_to_check': '点击进入打卡',
        'days_remaining': '剩余天数',
        'goal_ended': '目标已结束',
        'to_date': '至',
        'daily_count': '每日{count}次',

        // 打卡操作
        'check_in_success': '打卡成功！',
        'check_in_failed': '打卡失败，请重试',
        'check_in_btn': '打卡',
        'check_in_calendar': '打卡日历',
        'goal_completed_message': '恭喜！${goal.name} 今日目标已完成！',

        // 成功消息
        'create_success': '创建成功',
        'update_success': '修改成功',
        'deleted': '已删除',

        // 错误消息
        'error_loading_data': '数据加载失败，请刷新页面重试',
        'error_saving_data': '数据保存失败',
        'error_invalid_dates': '开始日期不能晚于结束日期',
        'error_goal_exists': '该目标已存在',
        'complete_info_error': '请填写完整信息',
        'target_count_error': '目标次数必须在1-100之间',
        'date_error': '结束日期不能早于开始日期',

        // 成功消息
        'goal_created': '目标创建成功！',
        'goal_updated': '目标更新成功！',
        'goal_deleted': '目标删除成功！',

        // 星期
        'monday': '周一',
        'tuesday': '周二',
        'wednesday': '周三',
        'thursday': '周四',
        'friday': '周五',
        'saturday': '周六',
        'sunday': '周日',

        // 日期格式
        'date_format': '{year}年{month}月{day}日 {weekday}',
        'time_locale': 'zh-CN',
        'february': '二月',
        'march': '三月',
        'april': '四月',
        'may': '五月',
        'june': '六月',
        'july': '七月',
        'august': '八月',
        'september': '九月',
        'october': '十月',
        'november': '十一月',
        'december': '十二月'
    },

    'zh-TW': {
        // 头部
        'app_title': '極簡打卡',
        'add_goal_btn': '+ 添加目標',

        // 主内容区
        'empty_title': '還沒有創建任何目標',
        'empty_desc': '點擊上方按鈕開始你的第一個目標吧！',
        'empty_icon': '📝',

        // 底部导航
        'nav_features': '功能',
        'nav_settings': '設置',

        // 添加目标模态框
        'create_goal_title': '創建新目標',
        'goal_name_label': '目標名稱',
        'goal_name_placeholder': '例如：喝水',
        'target_count_label': '每日目標次數',
        'start_date_label': '開始日期',
        'end_date_label': '結束日期（可選）',
        'cancel_btn': '取消',
        'create_goal_btn': '創建目標',

        // 功能菜单
        'features_title': '功能',
        'records_menu': '打卡記錄',
        'manage_goals_menu': '目標管理',

        // 设置模态框
        'settings_title': '設置',
        'theme_label': '主題',
        'theme_auto': '自動檢測',
        'theme_light': '淺色模式',
        'theme_dark': '深色模式',
        'language_label': '語言',
        'about_software': '關於軟件',
        'view_details': '查看詳情',
        'about_software_title': '關於軟件',
        'software_version': '軟件版本',
        'author': '作者',
        'declaration': '聲明',
        'declaration_text': '該軟體為Darling_ATRI開發，永久免費開源，請勿倒賣',
        'download_address': '下載地址',
        'download_link_text': '點我去官網',
        'close_btn': '關閉',
        'data_management': '數據管理',
        'export_data': '導出數據',
        'import_data': '導入數據',
        'export_success': '數據導出成功！',
        'import_success': '數據導入成功！',
        'export_failed': '數據導出失敗，請重試',
        'import_failed': '數據導入失敗，請重試',
        'invalid_data_format': '數據格式錯誤，請檢查文件',
        'import_confirm': '導入數據將覆蓋現有數據，是否繼續？',

        // 日历视图
        'calendar_title': '目標日曆',

        // 打卡记录
        'records_title': '打卡記錄',

        // 目标管理
        'manage_goals_title': '目標管理',
        'edit_goal_btn': '編輯',
        'delete_goal_btn': '刪除',

        // 编辑目标
        'edit_goal_title': '編輯目標',
        'save_changes_btn': '保存修改',

        // 刪除確認
        'delete_confirm_title': '確認刪除',
        'delete_confirm_text': '確定要刪除這個目標嗎？此操作不可恢復。',
        'confirm_delete_btn': '確認刪除',

        // 分享功能
        'share_goal': '分享目標',
        'share_btn': '分享',
        'save_image_btn': '保存圖片',
        'share_image_title': '我的目標進度',
        'days_remaining_text': '距離目標結束還有{days}天',
        'days_persisted_text': '已堅持{days}天',
        'save_success': '保存成功',

        // 目标卡片
        'daily_progress': '今日進度',
        'completed': '已完成',
        'click_to_check': '點擊進入打卡',
        'days_remaining': '剩餘天數',
        'goal_ended': '目標已結束',
        'to_date': '至',
        'daily_count': '每日{count}次',

        // 打卡操作
        'check_in_success': '打卡成功！',
        'check_in_failed': '打卡失敗，請重試',
        'check_in_btn': '打卡',
        'check_in_calendar': '打卡日曆',
        'goal_completed_message': '恭喜！${goal.name} 今日目標已完成！',

        // 成功消息
        'create_success': '創建成功',
        'update_success': '修改成功',
        'deleted': '已刪除',

        // 错误消息
        'error_loading_data': '數據加載失敗，請刷新頁面重試',
        'error_saving_data': '數據保存失敗',
        'error_invalid_dates': '開始日期不能晚於結束日期',
        'error_goal_exists': '該目標已存在',
        'complete_info_error': '請填寫完整信息',
        'target_count_error': '目標次數必須在1-100之間',
        'date_error': '結束日期不能早於開始日期',

        // 成功消息
        'goal_created': '目標創建成功！',
        'goal_updated': '目標更新成功！',
        'goal_deleted': '目標刪除成功！',

        // 星期
        'monday': '週一',
        'tuesday': '週二',
        'wednesday': '週三',
        'thursday': '週四',
        'friday': '週五',
        'saturday': '週六',
        'sunday': '週日',

        // 日期格式
        'date_format': '{year}年{month}月{day}日 {weekday}',
        'time_locale': 'zh-TW',
        'february': '二月',
        'march': '三月',
        'april': '四月',
        'may': '五月',
        'june': '六月',
        'july': '七月',
        'august': '八月',
        'september': '九月',
        'october': '十月',
        'november': '十一月',
        'december': '十二月'
    },

    'en': {
        // Header
        'app_title': 'SimpleList',
        'add_goal_btn': '+ Add Goal',

        // Main content
        'empty_title': 'No goals created yet',
        'empty_desc': 'Click the button above to start your first goal!',
        'empty_icon': '📝',

        // Bottom navigation
        'nav_features': 'Features',
        'nav_settings': 'Settings',

        // Add goal modal
        'create_goal_title': 'Create New Goal',
        'goal_name_label': 'Goal Name',
        'goal_name_placeholder': 'e.g., Drink Water',
        'target_count_label': 'Daily Target Count',
        'start_date_label': 'Start Date',
        'end_date_label': 'End Date (Optional)',
        'cancel_btn': 'Cancel',
        'create_goal_btn': 'Create Goal',

        // Features menu
        'features_title': 'Features',
        'records_menu': 'Check-in Records',
        'manage_goals_menu': 'Manage Goals',

        // Settings modal
        'settings_title': 'Settings',
        'theme_label': 'Theme',
        'theme_auto': 'Auto Detect',
        'theme_light': 'Light Mode',
        'theme_dark': 'Dark Mode',
        'language_label': 'Language',
        'about_software': 'About Software',
        'view_details': 'View Details',
        'about_software_title': 'About Software',
        'software_version': 'Software Version',
        'author': 'Author',
        'declaration': 'Declaration',
        'declaration_text': 'This software is developed by Darling_ATRI, permanently free and open source, please do not resell',
        'download_address': 'Download Address',
        'download_link_text': 'Visit Official Website',
        'close_btn': 'Close',
        'data_management': 'Data Management',
        'export_data': 'Export Data',
        'import_data': 'Import Data',
        'export_success': 'Data exported successfully!',
        'import_success': 'Data imported successfully!',
        'export_failed': 'Data export failed, please try again',
        'import_failed': 'Data import failed, please try again',
        'invalid_data_format': 'Invalid data format, please check the file',
        'import_confirm': 'Importing data will overwrite existing data. Continue?',

        // Calendar view
        'calendar_title': 'Goal Calendar',

        // Records
        'records_title': 'Check-in Records',

        // Goal management
        'manage_goals_title': 'Manage Goals',
        'edit_goal_btn': 'Edit',
        'delete_goal_btn': 'Delete',

        // Edit goal
        'edit_goal_title': 'Edit Goal',
        'save_changes_btn': 'Save Changes',

        // Delete confirmation
        'delete_confirm_title': 'Confirm Delete',
        'delete_confirm_text': 'Are you sure you want to delete this goal? This action cannot be undone.',
        'confirm_delete_btn': 'Confirm Delete',

        // 分享功能
        'share_goal': 'Share Goal',
        'share_btn': 'Share',
        'save_image_btn': 'Save Image',
        'share_image_title': 'My Goal Progress',
        'days_remaining_text': '{days} days remaining until goal ends',
        'days_persisted_text': 'Persisted for {days} days',
        'save_success': 'Save successful',

        // Goal cards
        'daily_progress': 'Today\'s Progress',
        'completed': 'Completed',
        'click_to_check': 'Click to check in',
        'days_remaining': 'Days Remaining',
        'goal_ended': 'Goal Ended',
        'to_date': 'to',
        'daily_count': 'Daily {count} times',

        // Check-in operations
        'check_in_success': 'Check-in successful!',
        'check_in_failed': 'Check-in failed, please try again',
        'check_in_btn': 'Check In',
        'check_in_calendar': 'Check-in Calendar',
        'goal_completed_message': 'Congratulations! ${goal.name} daily goal completed!',

        // Success messages
        'create_success': 'Created successfully',
        'update_success': 'Updated successfully',
        'deleted': 'Deleted',

        // Error messages
        'error_loading_data': 'Failed to load data, please refresh and try again',
        'error_saving_data': 'Failed to save data',
        'error_invalid_dates': 'Start date cannot be later than end date',
        'error_goal_exists': 'This goal already exists',
        'complete_info_error': 'Please fill in complete information',
        'target_count_error': 'Target count must be between 1-100',
        'date_error': 'End date cannot be earlier than start date',

        // Success messages
        'goal_created': 'Goal created successfully!',
        'goal_updated': 'Goal updated successfully!',
        'goal_deleted': 'Goal deleted successfully!',

        // Week days
        'monday': 'Monday',
        'tuesday': 'Tuesday',
        'wednesday': 'Wednesday',
        'thursday': 'Thursday',
        'friday': 'Friday',
        'saturday': 'Saturday',
        'sunday': 'Sunday',

        // Date format
        'date_format': '{year}/{month}/{day} {weekday}',
        'time_locale': 'en-US',
        'february': 'February',
        'march': 'March',
        'april': 'April',
        'may': 'May',
        'june': 'June',
        'july': 'July',
        'august': 'August',
        'september': 'September',
        'october': 'October',
        'november': 'November',
        'december': 'December'
    }
};

// 语言管理器类
class LanguageManager {
    constructor() {
        this.translations = translations;
        this.currentLanguage = this.getStoredLanguage() || this.getBrowserLanguage() || 'zh-CN';
    }

    // 获取浏览器语言
    getBrowserLanguage() {
        const lang = navigator.language || navigator.userLanguage;

        // 检查是否支持该语言
        if (this.translations[lang]) {
            return lang;
        }

        // 检查语言的基础版本（如 zh-TW -> zh-CN）
        const baseLang = lang.split('-')[0];
        if (baseLang === 'zh') {
            return lang.includes('TW') || lang.includes('HK') ? 'zh-TW' : 'zh-CN';
        }

        return null;
    }

    // 获取存储的语言设置
    getStoredLanguage() {
        try {
            return localStorage.getItem('simplelist_language');
        } catch (error) {
            console.warn('无法访问 localStorage:', error);
            return null;
        }
    }

    // 保存语言设置
    storeLanguage(language) {
        try {
            localStorage.setItem('simplelist_language', language);
        } catch (error) {
            console.warn('无法保存语言设置:', error);
        }
    }

    // 设置语言
    setLanguage(language) {
        if (this.translations[language]) {
            this.currentLanguage = language;
            this.storeLanguage(language);
            this.applyLanguage();
            return true;
        }
        return false;
    }

    // 获取当前语言
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // 获取翻译文本
    getText(key, fallback = null) {
        const translation = this.translations[this.currentLanguage];
        if (translation && translation[key]) {
            return translation[key];
        }

        // 如果当前语言没有该文本，尝试使用简体中文作为备选
        if (this.currentLanguage !== 'zh-CN' && this.translations['zh-CN'] && this.translations['zh-CN'][key]) {
            return this.translations['zh-CN'][key];
        }

        return fallback || key;
    }

    // 应用语言到页面
    applyLanguage() {
        // 翻译所有带有 data-i18n 属性的元素
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const text = this.getText(key);

            if (element.tagName === 'INPUT' && element.type !== 'button' && element.type !== 'submit') {
                element.placeholder = text;
            } else if (element.tagName === 'BUTTON' && (element.type === 'button' || element.type === 'submit')) {
                element.textContent = text;
            } else {
                element.textContent = text;
            }
        });

        // 翻译带有 data-i18n-placeholder 属性的元素
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.getText(key);
        });

        // 更新语言选择器的值
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = this.currentLanguage;
        }

        // 更新 HTML lang 属性
        document.documentElement.lang = this.currentLanguage;

        // 触发自定义事件，让其他组件知道语言已更改
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage }
        }));
    }

    // 获取支持的语言列表
    getSupportedLanguages() {
        return [
            { code: 'zh-CN', name: '简体中文' },
            { code: 'zh-TW', name: '繁體中文' },
            { code: 'en', name: 'English' }
        ];
    }
}

// 创建全局语言管理器实例
window.languageManager = new LanguageManager();