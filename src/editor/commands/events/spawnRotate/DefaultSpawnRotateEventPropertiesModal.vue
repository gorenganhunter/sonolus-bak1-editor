<script setup lang="ts">
import { i18n } from '../../../../i18n'
import OptionalEaseField from '../../../../modals/form/OptionalEaseField.vue'
import PropertiesModal from '../../../../modals/form/PropertiesModal.vue'
import {
    defaultSpawnRotateEventProperties,
    setDefaultSpawnRotateEventProperties,
} from '../../../tools/events/spawnRotate'
import { useProperties } from '../../../utils/properties'

const createModel = useProperties(
    () => defaultSpawnRotateEventProperties,
    setDefaultSpawnRotateEventProperties,
)

const ease = createModel('ease')
</script>

<template>
    <PropertiesModal :title="i18n.commands.spawnRotateEvent.modal.title">
        <OptionalEaseField v-model="ease" />
    </PropertiesModal>
</template>
