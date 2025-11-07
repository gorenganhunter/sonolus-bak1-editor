<script setup lang="ts">
import { isEditableEntity } from '.'
import { i18n } from '../../../i18n'
import MultiBeatField from '../../../modals/form/MultiBeatField.vue'
import MultiBpmField from '../../../modals/form/MultiBpmField.vue'
import MultiEaseField from '../../../modals/form/MultiEaseField.vue'
import MultiLaneField from '../../../modals/form/MultiLaneField.vue'
import MultiSizeField from '../../../modals/form/MultiSizeField.vue'
import MultiDurationField from '../../../modals/form/MultiDurationField.vue'
import MultiValueField from '../../../modals/form/MultiValueField.vue'
import MultiResizeValueField from '../../../modals/form/MultiResizeValueField.vue'
import MultiTransparentValueField from '../../../modals/form/MultiTransparentValueField.vue'
import MultiTimeScaleField from '../../../modals/form/MultiTimeScaleField.vue'
import { useSelectedEntitiesProperties } from '../../utils/properties'
import BaseSidebar from '../BaseSidebar.vue'

const { entities, types, createModel } = useSelectedEntitiesProperties(isEditableEntity)

const beat = createModel('beat')
const value = createModel('value')
const ease = createModel('ease')
const lane = createModel('lane')
const size = createModel('size')
const duration = createModel('duration')
</script>

<template>
    <BaseSidebar :title="i18n.sidebar.default.title">
        <div v-if="!entities.length">{{ i18n.sidebar.default.none }}</div>
        <template v-else>
            <MultiBpmField v-if="types.bpm" v-model="value" />
            <MultiTimeScaleField v-if="types.timeScale" v-model="value" />
            <MultiResizeValueField v-if="types.resizeEventJoint" v-model="value" />
            <MultiTransparentValueField v-if="types.transparentEventJoint" v-model="value" />
            <MultiValueField v-if="types.rotateEventJoint || types.moveXEventJoint || types.moveYEventJoint" v-model="value" />
            <MultiEaseField
                v-if="types.rotateEventJoint || types.resizeEventJoint || types.transparentEventJoint || types.moveXEventJoint || types.moveYEventJoint"
                v-model="ease"
            />
            <MultiLaneField
                v-if="entities.length === 1 && (types.tapNote || types.holdNote || types.flickNote || types.dragNote)"
                v-model="lane"
            />
            <MultiSizeField
                v-if="entities.length === 1 && (types.tapNote || types.holdNote || types.flickNote || types.dragNote)"
                v-model="size"
            />
            <MultiDurationField
                v-if="entities.length === 1 && types.holdNote"
                v-model="lane"
            />
            <MultiBeatField v-if="entities.length === 1" v-model="beat" />
        </template>
    </BaseSidebar>
</template>
