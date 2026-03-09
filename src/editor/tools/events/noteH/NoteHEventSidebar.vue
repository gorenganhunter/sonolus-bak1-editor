<script setup lang="ts">
import { defaultNoteHEventProperties, setDefaultNoteHEventProperties } from '.'
import { i18n } from '../../../../i18n'
import OptionalEaseField from '../../../../modals/form/OptionalEaseField.vue'
import BaseSidebar from '../../../sidebars/BaseSidebar.vue'
import { useProperties } from '../../../utils/properties'

const createModel = useProperties(
    () => defaultNoteHEventProperties,
    setDefaultNoteHEventProperties,
)

const ease = createModel('ease')
</script>

<template>
    <BaseSidebar :title="i18n.tools.events.sidebars.noteHEvent.title">
        <OptionalEaseField v-model="ease" />
    </BaseSidebar>
</template>
