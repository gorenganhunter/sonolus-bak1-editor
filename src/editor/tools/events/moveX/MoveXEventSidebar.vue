<script setup lang="ts">
import { defaultMoveXEventProperties, setDefaultMoveXEventProperties } from '.'
import { i18n } from '../../../../i18n'
import OptionalEaseField from '../../../../modals/form/OptionalEaseField.vue'
import BaseSidebar from '../../../sidebars/BaseSidebar.vue'
import { useProperties } from '../../../utils/properties'

const createModel = useProperties(
    () => defaultMoveXEventProperties,
    setDefaultMoveXEventProperties,
)

const ease = createModel('ease')
</script>

<template>
    <BaseSidebar :title="i18n.tools.events.sidebars.moveXEvent.title">
        <OptionalEaseField v-model="ease" />
    </BaseSidebar>
</template>
