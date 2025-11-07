<script setup lang="ts">
import { defaultFlickNoteProperties, setDefaultFlickNoteProperties } from '.'
import { i18n } from '../../../i18n'
import OptionalColorField from '../../../modals/form/OptionalColorField.vue'
import BaseSidebar from '../../sidebars/BaseSidebar.vue'
import { useProperties } from '../../utils/properties'

const createModel = useProperties(() => defaultFlickNoteProperties, setDefaultFlickNoteProperties)

const color = createModel('color')
</script>

<template>
    <BaseSidebar :title="i18n.tools.flickNote.sidebar.title">
    </BaseSidebar>
</template>
