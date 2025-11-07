<script setup lang="ts">
import { i18n } from '../../../../i18n'
import OptionalEaseField from '../../../../modals/form/OptionalEaseField.vue'
import PropertiesModal from '../../../../modals/form/PropertiesModal.vue'
import {
    defaultMoveYEventProperties,
    setDefaultMoveYEventProperties,
} from '../../../tools/events/moveY'
import { useProperties } from '../../../utils/properties'

const createModel = useProperties(
    () => defaultMoveYEventProperties,
    setDefaultMoveYEventProperties,
)

const ease = createModel('ease')
</script>

<template>
    <PropertiesModal :title="i18n.commands.moveYEvent.modal.title">
        <OptionalEaseField v-model="ease" />
    </PropertiesModal>
</template>
