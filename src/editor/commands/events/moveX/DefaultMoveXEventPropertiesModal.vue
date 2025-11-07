<script setup lang="ts">
import { i18n } from '../../../../i18n'
import OptionalEaseField from '../../../../modals/form/OptionalEaseField.vue'
import PropertiesModal from '../../../../modals/form/PropertiesModal.vue'
import {
    defaultMoveXEventProperties,
    setDefaultMoveXEventProperties,
} from '../../../tools/events/moveX'
import { useProperties } from '../../../utils/properties'

const createModel = useProperties(
    () => defaultMoveXEventProperties,
    setDefaultMoveXEventProperties,
)

const ease = createModel('ease')
</script>

<template>
    <PropertiesModal :title="i18n.commands.moveXEvent.modal.title">
        <OptionalEaseField v-model="ease" />
    </PropertiesModal>
</template>
