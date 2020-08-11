<template>
    <div class="layout">
        <div class="header">
            <slot name="header"></slot>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<style scoped lang="scss">
.layout {
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
        flex: 0 1 auto;
    }
    .content {
        flex: 1 1 auto;
        overflow: auto;
    }
    .header {
        flex: 0 1 auto;
    }
}
</style>