import { ref, Ref, onMounted } from 'vue'

export function useAutofocus() {
    const focusEl: Ref<null | HTMLInputElement> = ref(null)

    onMounted(() => {
        setTimeout(() => {
            if (focusEl.value) {
                focusEl.value.focus()
            }
        }, 0)
    })

    return focusEl
}