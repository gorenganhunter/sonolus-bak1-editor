<script setup lang="ts">
import { i18n } from '../../../../i18n'
import OptionalEaseField from '../../../../modals/form/OptionalEaseField.vue'
import PropertiesModal from '../../../../modals/form/PropertiesModal.vue'
import {
    defaultJudgeRotateEventProperties,
    setDefaultJudgeRotateEventProperties,
} from '../../../tools/events/judgeRotate'
import { useProperties } from '../../../utils/properties'

const createModel = useProperties(
    () => defaultJudgeRotateEventProperties,
    setDefaultJudgeRotateEventProperties,
)

const ease = createModel('ease')
</script>

<template>
    <PropertiesModal :title="i18n.commands.judgeRotateEvent.modal.title">
        <OptionalEaseField v-model="ease" />
    </PropertiesModal>
</template>
