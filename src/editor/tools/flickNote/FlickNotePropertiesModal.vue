<script setup lang="ts">
import { i18n } from '../../../i18n'
import MultiBeatField from '../../../modals/form/MultiBeatField.vue'
import MultiSizeField from '../../../modals/form/MultiSizeField.vue'
import MultiLaneField from '../../../modals/form/MultiLaneField.vue'
import PropertiesModal from '../../../modals/form/PropertiesModal.vue'
import { useSelectedEntitiesProperties } from '../../utils/properties'

const { createModel } = useSelectedEntitiesProperties((entity) => entity.type === 'flickNote')

const size = createModel('size')
const lane = createModel('lane')
const beat = createModel('beat')
</script>

<template>
    <PropertiesModal :title="i18n.tools.flickNote.modal.title">
        <MultiLaneField v-model="lane" />
        <MultiSizeField v-model="size" />
        <MultiBeatField v-model="beat" />
    </PropertiesModal>
</template>
