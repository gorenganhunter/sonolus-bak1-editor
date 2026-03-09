<script setup lang="ts">
import { i18n } from '../../../../i18n'
import OptionalEaseField from '../../../../modals/form/OptionalEaseField.vue'
import PropertiesModal from '../../../../modals/form/PropertiesModal.vue'
import {
    defaultJudgeResizeEventProperties,
    setDefaultJudgeResizeEventProperties,
} from '../../../tools/events/judgeResize'
import { useProperties } from '../../../utils/properties'

const createModel = useProperties(
    () => defaultJudgeResizeEventProperties,
    setDefaultJudgeResizeEventProperties,
)

const ease = createModel('ease')
</script>

<template>
    <PropertiesModal :title="i18n.commands.judgeResizeEvent.modal.title">
        <OptionalEaseField v-model="ease" />
    </PropertiesModal>
</template>
