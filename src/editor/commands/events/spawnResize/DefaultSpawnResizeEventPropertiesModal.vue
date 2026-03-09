<script setup lang="ts">
import { i18n } from '../../../../i18n'
import OptionalEaseField from '../../../../modals/form/OptionalEaseField.vue'
import PropertiesModal from '../../../../modals/form/PropertiesModal.vue'
import {
    defaultSpawnResizeEventProperties,
    setDefaultSpawnResizeEventProperties,
} from '../../../tools/events/spawnResize'
import { useProperties } from '../../../utils/properties'

const createModel = useProperties(
    () => defaultSpawnResizeEventProperties,
    setDefaultSpawnResizeEventProperties,
)

const ease = createModel('ease')
</script>

<template>
    <PropertiesModal :title="i18n.commands.spawnResizeEvent.modal.title">
        <OptionalEaseField v-model="ease" />
    </PropertiesModal>
</template>
