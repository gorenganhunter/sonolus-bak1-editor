<script setup lang="ts">
import { defaultResizeEventProperties, setDefaultResizeEventProperties } from '.'
import { i18n } from '../../../../i18n'
import OptionalEaseField from '../../../../modals/form/OptionalEaseField.vue'
import BaseSidebar from '../../../sidebars/BaseSidebar.vue'
import { useProperties } from '../../../utils/properties'

const createModel = useProperties(
    () => defaultResizeEventProperties,
    setDefaultResizeEventProperties,
)

const ease = createModel('ease')
</script>

<template>
    <BaseSidebar :title="i18n.tools.events.sidebars.resizeEvent.title">
        <OptionalEaseField v-model="ease" />
    </BaseSidebar>
</template>
