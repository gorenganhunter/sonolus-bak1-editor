<script setup lang="ts">
import { i18n } from '../../../i18n'
import MultiBeatField from '../../../modals/form/MultiBeatField.vue'
import MultiDurationField from '../../../modals/form/MultiDurationField.vue'
import MultiSizeField from '../../../modals/form/MultiSizeField.vue'
import MultiLaneField from '../../../modals/form/MultiLaneField.vue'
import PropertiesModal from '../../../modals/form/PropertiesModal.vue'
import { useSelectedEntitiesProperties } from '../../utils/properties'

const { createModel } = useSelectedEntitiesProperties((entity) => entity.type === 'holdNote')

const size = createModel('size')
const lane = createModel('lane')
const beat = createModel('beat')
const duration = createModel('duration')
</script>

<template>
    <PropertiesModal :title="i18n.tools.holdNote.modal.title">
        <MultiLaneField v-model="lane" />
        <MultiSizeField v-model="size" />
        <MultiBeatField v-model="beat" />
        <MultiDurationField v-model="duration" />
    </PropertiesModal>
</template>
