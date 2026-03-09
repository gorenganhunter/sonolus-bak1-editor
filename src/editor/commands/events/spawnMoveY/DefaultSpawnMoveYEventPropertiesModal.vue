<script setup lang="ts">
import { i18n } from '../../../../i18n'
import OptionalEaseField from '../../../../modals/form/OptionalEaseField.vue'
import PropertiesModal from '../../../../modals/form/PropertiesModal.vue'
import {
    defaultSpawnMoveYEventProperties,
    setDefaultSpawnMoveYEventProperties,
} from '../../../tools/events/spawnMoveY'
import { useProperties } from '../../../utils/properties'

const createModel = useProperties(
    () => defaultSpawnMoveYEventProperties,
    setDefaultSpawnMoveYEventProperties,
)

const ease = createModel('ease')
</script>

<template>
    <PropertiesModal :title="i18n.commands.spawnMoveYEvent.modal.title">
        <OptionalEaseField v-model="ease" />
    </PropertiesModal>
</template>
