<script setup lang="ts">
import { i18n } from '../../../../i18n'
import OptionalEaseField from '../../../../modals/form/OptionalEaseField.vue'
import PropertiesModal from '../../../../modals/form/PropertiesModal.vue'
import {
    defaultSpawnMoveXEventProperties,
    setDefaultSpawnMoveXEventProperties,
} from '../../../tools/events/spawnMoveX'
import { useProperties } from '../../../utils/properties'

const createModel = useProperties(
    () => defaultSpawnMoveXEventProperties,
    setDefaultSpawnMoveXEventProperties,
)

const ease = createModel('ease')
</script>

<template>
    <PropertiesModal :title="i18n.commands.spawnMoveXEvent.modal.title">
        <OptionalEaseField v-model="ease" />
    </PropertiesModal>
</template>
