import {createGlobalState} from "@vueuse/core";

export const useAdminState = createGlobalState(() => {
        const collapsed = ref(false);
        const toggleCollapsed = () => {
            collapsed.value = !collapsed.value;
        };
        return {
            collapsed,
            toggleCollapsed
        }
    }
);

export const useAdminTabsState = createGlobalState(() => {
        const tags = ref([])        // 标签栏的所有标签
        const activeTag = ref('')   // 当前激活的标签 path
        const reloading = ref(true)
        // 获取当前激活的标签的索引
        const activeIndex = computed(() => tags.value.findIndex(tag => tag.path === activeTag.value))

        /**
         * 更新 keepAlive 路由, 让其重新渲染
         * @param {string} name route name
         */
        function updateAliveKey(name) {
            this.aliveKeys[name] = (+new Date())
        }

        /**
         * 设置当前激活的标签
         * @param {string} path 标签对应的路由路径
         */
        async function setActiveTag(path) {
            await nextTick() // 将回调延迟到下次 DOM 更新循环之后执行
            activeTag.value = path
        }

        /**
         * 设置当前显示的所有标签
         * @param {string[]} tags 数组
         */
        function setTags(tags) {
            tags.value = tags
        }

        /**
         * 添加标签 (不添加白名单中 和 已存在的)
         * @param {{ name, path, title, icon }} tag 标签对象
         */
        function addTag(tag = {}) {
            const index = tags.value.findIndex(item => item.path === tag.path)
            if (index !== -1) {
                tags.value.splice(index, 1, tag)
            } else {
                setTags([...tags.value, tag])
            }
            this.setActiveTag(tag.path)
        }

        /**
         * 移除标签 , 如果只有一个标签, 无法移除
         * @param {string} path 标签对应的路由路径
         */
        function removeTag(path) {
            // 如果关闭的是当前标签
            if (path === activeTag.value) {
                if (this.activeIndex === 0) { // 如果是第一个标签, 则选中第二个标签
                    router.push(tags.value[1].path)
                } else { // 否则选中左边的标签
                    router.push(tags.value[this.activeIndex - 1].path)
                }
            }
            setTags(tags.value.filter(tag => tag.path !== path))
        }

        /**
         * 关闭其他标签
         * @param {string} path
         */
        function removeOther(path = activeTag.value) {
            setTags(tags.value.filter(tag => tag.path === path))
            // 如果点击的不是当前标签, 会将当前标签关闭, 那么跳转到第一个标签
            if (path !== activeTag.value) {
                router.push(tags.value[0].path) // 关闭其他后只剩一个标签
            }
        }

        /**
         * 关闭左侧标签
         * @param {string} path
         */
        function removeLeft(path) {
            const curIndex = tags.value.findIndex(item => item.path === path)
            // 过滤出右边的标签
            const filterTags = tags.value.filter((item, index) => index >= curIndex)
            setTags(filterTags)
            // 如果当前浏览的标签被关闭, 打开一个新标签
            if (!filterTags.find(item => item.path === activeTag.value)) {
                router.push(filterTags[filterTags.length - 1].path)
            }
        }

        /**
         * 关闭左侧标签
         * @param {string} path
         */
        function removeRight(path) {
            const curIndex = tags.value.findIndex(item => item.path === path)
            // 过滤出左边的标签
            const filterTags = tags.value.filter((item, index) => index <= curIndex)
            this.setTags(filterTags)
            // 如果当前浏览的标签被关闭, 打开一个新标签
            if (!filterTags.find(item => item.path === activeTag.value)) {
                router.push(filterTags[filterTags.length - 1].path)
            }
        }

        /**
         * 重置标签
         */
        function resetTags() {
            $reset()
        }

        /**
         * 刷新页面
         * @description 效果并非按 F5 刷新整个网页, 而是模拟刷新 (nextTick + 滚动到顶部)
         */
        async function reloadTag() {
            window.$loadingBar.start()

            // 配合 v-if="reloadFlag" 实现白屏效果
            this.reloadFlag = false
            await nextTick() // 将回调延迟到下次 DOM 更新循环之后执行
            this.reloadFlag = true

            // 滚动到顶部, 模拟刷新
            setTimeout(() => {
                document.documentElement.scrollTo({left: 0, top: 0})
                window.$loadingBar.finish()
            }, 100)
        }

        return {
            tags,
            activeTag,
            activeIndex,
            reloading,
            updateAliveKey,
            setActiveTag,
            setTags,
            addTag,
            removeTag,
            removeOther,
            removeLeft,
            removeRight,
            resetTags,
            reloadTag
        }
    }
)