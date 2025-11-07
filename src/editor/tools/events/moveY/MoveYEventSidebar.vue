<script setup lang="ts">
import { defaultMoveYEventProperties, setDefaultMoveYEventProperties } from '.'
import { i18n } from '../../../../i18n'
import OptionalEaseField from '../../../../modals/form/OptionalEaseField.vue'
import BaseSidebar from '../../../sidebars/BaseSidebar.vue'
import { useProperties } from '../../../utils/properties'

const createModel = useProperties(
    () => defaultMoveYEventProperties,
    setDefaultMoveYEventProperties,
)

const ease = createModel('ease')
</script>

<template>
    <BaseSidebar :title="i18n.tools.events.sidebars.moveYEvent.title">
        <OptionalEaseField v-model="ease" />
    </BaseSidebar>
</template>
