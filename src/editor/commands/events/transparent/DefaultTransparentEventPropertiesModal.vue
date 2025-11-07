<script setup lang="ts">
import { i18n } from '../../../../i18n'
import OptionalEaseField from '../../../../modals/form/OptionalEaseField.vue'
import PropertiesModal from '../../../../modals/form/PropertiesModal.vue'
import {
    defaultTransparentEventProperties,
    setDefaultTransparentEventProperties,
} from '../../../tools/events/transparent'
import { useProperties } from '../../../utils/properties'

const createModel = useProperties(
    () => defaultTransparentEventProperties,
    setDefaultTransparentEventProperties,
)

const ease = createModel('ease')
</script>

<template>
    <PropertiesModal :title="i18n.commands.transparentEvent.modal.title">
        <OptionalEaseField v-model="ease" />
    </PropertiesModal>
</template>
