<script setup lang="ts">
import { i18n } from '../../../../i18n'
import OptionalEaseField from '../../../../modals/form/OptionalEaseField.vue'
import PropertiesModal from '../../../../modals/form/PropertiesModal.vue'
import {
    defaultResizeEventProperties,
    setDefaultResizeEventProperties,
} from '../../../tools/events/resize'
import { useProperties } from '../../../utils/properties'

const createModel = useProperties(
    () => defaultResizeEventProperties,
    setDefaultResizeEventProperties,
)

const ease = createModel('ease')
</script>

<template>
    <PropertiesModal :title="i18n.commands.resizeEvent.modal.title">
        <OptionalEaseField v-model="ease" />
    </PropertiesModal>
</template>
