<script setup lang="ts">
import { i18n } from '../../../i18n'
import OptionalStageField from '../../../modals/form/OptionalStageField.vue'
import OptionalEaseField from '../../../modals/form/OptionalEaseField.vue'
import OptionalLaneField from '../../../modals/form/OptionalLaneField.vue'
import OptionalSizeField from '../../../modals/form/OptionalSizeField.vue'
import OptionalNoteTypeField from '../../../modals/form/OptionalNoteTypeField.vue'
import OptionalIsFakeField from '../../../modals/form/OptionalIsFakeField.vue'
import PropertiesModal from '../../../modals/form/PropertiesModal.vue'
import { brushProperties, setBrushProperties } from '../../tools/brush'
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
    <PropertiesModal :title="i18n.commands.brush.modal.title">
        <OptionalStageField v-model="stage" />
        <OptionalNoteTypeField v-model="noteType" />
        <OptionalLaneField v-model="lane" />
        <OptionalSizeField v-model="size" />
        <OptionalIsFakeField v-model="isFake" />
        <OptionalEaseField v-model="ease" />
    </PropertiesModal>
</template>
