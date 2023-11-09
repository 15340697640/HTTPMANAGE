<template>
    <div class="top-header-box">
        <!-- Notification -->
        <div
            class="notification-box"
            @click="openCardHandle"
        >
            <a-badge :count="count">
                <a-popover
                    title="通知"
                    trigger="hover"
                    :open="hovered"
                    @openChange="handleHoverChange"
                    :overlayInnerStyle="{ padding: '0', textAlign: 'center' }"
                >
                    <a-popover
                        color="#c6ddb2"
                        trigger="click"
                        :open="clicked"
                        @openChange="handleClickChange"
                    >
                        <template #content>
                            <div>
                                <MessageCard />
                            </div>
                        </template>
                        <MessageOutlined
                            class="message-icon"
                            :style="{ fontSize: '35px', color: '#fff' }"
                        />
                    </a-popover>
                </a-popover>
            </a-badge>
        </div>

        <!-- User -->
        <div class="user-box">
            <a-dropdown :arrow="{ pointAtCenter: true }">
                <a
                    class="ant-dropdown-link"
                    @click.prevent
                >
                    <img
                        src="@/assets/logo.png"
                        alt="Avtar"
                    />
                </a>
                <template #overlay>
                    <a-menu :items="items"> </a-menu>
                </template>
            </a-dropdown>
        </div>
    </div>
</template>
<script setup>
// Component
import { MessageOutlined, SettingOutlined, LogoutOutlined, WindowsFilled } from '@ant-design/icons-vue';
import MessageCard from '@/components/top-header/message-card/MessageCard.vue';

// Dependencies
import { ref, reactive, h, onMounted } from 'vue';

const count = ref(5);
const openCard = ref(false);
const getItem = (label, key, icon) => {
    return { label, key, icon };
};
const items = reactive([getItem('账号设置', '/apiHUb', () => h(SettingOutlined)), getItem('退出登录', '/collectionProject', () => h(LogoutOutlined))]);
</script>

<style lang="scss" src="./TopHeader.scss" scoped></style>
