<script setup lang="ts">
import { brushProperties, setBrushProperties } from '.'
import { i18n } from '../../../i18n'
import OptionalNoteTypeField from '../../../modals/form/OptionalNoteTypeField.vue'
import OptionalLaneField from '../../../modals/form/OptionalLaneField.vue'
import OptionalSizeField from '../../../modals/form/OptionalSizeField.vue'
import OptionalEaseField from '../../../modals/form/OptionalEaseField.vue'
import OptionalStageField from '../../../modals/form/OptionalStageField.vue'
import OptionalIsFakeField from '../../../modals/form/OptionalIsFakeField.vue'
import BaseSidebar from '../../sidebars/BaseSidebar.vue'
import { useProperties } from '../../utils/properties'

const createModel = useProperties(() => brushProperties, setBrushProperties)

const stage = createModel('stage')
const noteType = createModel('noteType')
const lane = createModel('lane')
const size = createModel('size')
const isFake = createModel('isFake')
const ease = createModel('ease')
</script>

<template>
    <BaseSidebar :title="i18n.tools.brush.sidebar.title">
        <OptionalStageField v-model="stage" />
        <OptionalNoteTypeField v-model="noteType" />
        <OptionalLaneField v-model="lane" />
        <OptionalSizeField v-model="size" />
        <OptionalIsFakeField v-model="isFake" />
        <OptionalEaseField v-model="ease" />
    </BaseSidebar>
</template>
