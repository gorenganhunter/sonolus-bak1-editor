<script setup lang="ts">
import { i18n } from '../../../i18n'
import OptionalColorField from '../../../modals/form/OptionalColorField.vue'
import PropertiesModal from '../../../modals/form/PropertiesModal.vue'
import { defaultDragNoteProperties, setDefaultDragNoteProperties } from '../../tools/dragNote'
import { useProperties } from '../../utils/properties'

const createModel = useProperties(() => defaultDragNoteProperties, setDefaultDragNoteProperties)

const color = createModel('color')
</script>

<template>
    <PropertiesModal :title="i18n.commands.dragNote.modal.title">
        <!--OptionalColorField v-model="color" /-->
    </PropertiesModal>
</template>
