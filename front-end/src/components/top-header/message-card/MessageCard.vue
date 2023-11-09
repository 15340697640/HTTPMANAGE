<template>
    <a-card
        :tab-list="tabListNoTitle"
        :active-tab-key="noTitleKey"
        @tabChange="key => onTabChange(key, 'noTitleKey')"
    >
        <a-list
            item-layout="horizontal"
            :data-source="data"
            v-if="noTitleKey === 'toDoList'"
        >
            <template #renderItem="{ item }">
                <a-list-item>
                    <a-list-item-meta description="Ant Design, a design language for background applications, is refined by Ant UED Team">
                        <template #title>
                            <a href="https://www.antdv.com/">{{ item.title }}</a>
                        </template>
                    </a-list-item-meta>
                    <a-button class="receive-button">接受</a-button>
                    <a-button class="reject-button">拒绝</a-button>
                </a-list-item>
            </template>
        </a-list>
    </a-card>
</template>
<script setup>
import { ref } from 'vue';
const tabListNoTitle = [
    {
        key: 'toDoList',
        tab: '待办事项',
    },
    {
        key: 'notification',
        tab: '通知',
    },
];
const key = ref('tab1');
const noTitleKey = ref('toDoList');
const onTabChange = (value, type) => {
    console.log(value, type);
    if (type === 'key') {
        key.value = value;
    } else if (type === 'noTitleKey') {
        noTitleKey.value = value;
    }
};
const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];
</script>
<style lang="scss" src="./MessageCard.scss" scoped></style>
