<template>
    <div class="bylh-layout">
        <div class="bylh-header">
            <slot name="header"></slot>
        </div>
        <div class="bylh-content">
            <slot name="content"></slot>
        </div>
        <div class="bylh-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<style scoped lang="scss">

.bylh-layout {
    height: 100%;
    display: flex;
    flex-direction: column;
    .bylh-header {
        flex: 0 1 auto;
    }
    .bylh-content {
        flex: 1 1 auto;
        overflow: auto;
    }
    .bylh-header {
        flex: 0 1 auto;
    }
}
</style>