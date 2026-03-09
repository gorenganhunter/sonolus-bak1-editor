<script setup lang="ts">
import { defaultJudgeMoveXEventProperties, setDefaultJudgeMoveXEventProperties } from '.'
import { i18n } from '../../../../i18n'
import OptionalEaseField from '../../../../modals/form/OptionalEaseField.vue'
import BaseSidebar from '../../../sidebars/BaseSidebar.vue'
import { useProperties } from '../../../utils/properties'

const createModel = useProperties(
    () => defaultJudgeMoveXEventProperties,
    setDefaultJudgeMoveXEventProperties,
)

const ease = createModel('ease')
</script>

<template>
    <BaseSidebar :title="i18n.tools.events.sidebars.judgeMoveXEvent.title">
        <OptionalEaseField v-model="ease" />
    </BaseSidebar>
</template>
