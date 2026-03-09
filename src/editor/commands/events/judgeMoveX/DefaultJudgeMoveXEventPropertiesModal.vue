<script setup lang="ts">
import { i18n } from '../../../../i18n'
import OptionalEaseField from '../../../../modals/form/OptionalEaseField.vue'
import PropertiesModal from '../../../../modals/form/PropertiesModal.vue'
import {
    defaultJudgeMoveXEventProperties,
    setDefaultJudgeMoveXEventProperties,
} from '../../../tools/events/judgeMoveX'
import { useProperties } from '../../../utils/properties'

const createModel = useProperties(
    () => defaultJudgeMoveXEventProperties,
    setDefaultJudgeMoveXEventProperties,
)

const ease = createModel('ease')
</script>

<template>
    <PropertiesModal :title="i18n.commands.judgeMoveXEvent.modal.title">
        <OptionalEaseField v-model="ease" />
    </PropertiesModal>
</template>
